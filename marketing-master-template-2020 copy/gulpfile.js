const hemlfn = require("heml");
const fs = require("fs");
const rename = require("gulp-rename");
const browserSync = require("browser-sync").create();
const handlebarsfn = require("gulp-compile-handlebars");
const gulp = require("gulp");
const chalk = require("chalk");
const styleInject = require("gulp-style-inject");
const htmlmin = require("gulp-htmlmin");
const size = require("gulp-size");
const replace = require("gulp-string-replace");
const remove = require("gulp-email-remove-unused-css");
const util = require("handlebars-utils");

handlebarsfn.Handlebars.registerHelper("date", require("helper-date"));

function CSS() {
  return gulp.src("temp/*.html").pipe(styleInject()).pipe(gulp.dest("./temp"));
}

function heml(cb) {
  var options = {
    validate: "soft", // validation levels - 'strict'|'soft'|'none'
    cheerio: {}, // config passed to cheerio parser
    juice: {},
    beautify: {}, // config passed to js-beautify html method
    elements: [
      // any custom elements you want to use
    ],
  };

  hemlfn(fs.readFileSync("temp/temp.html", "utf8"), options).then(
    ({ html, metadata, errors }) => {
      console.log(chalk.blue("------------------"));
      console.log(chalk.green(`HEML Size: ${metadata.size}`));
      console.log(chalk.blue("------------------"));
      for (const errorItem in errors) {
        if (errors.hasOwnProperty(errorItem)) {
          const errorInfo = errors[errorItem];
          console.log(
            chalk.bold.yellowBright("* " + errorItem + ": ") +
              chalk.red(errorInfo)
          );
        }
      }
      fs.writeFile("dist/index.html", html, (err) => {
        // throws an error, you could also catch it here
        if (err) throw err;
      });
      cb();
    }
  );
}

function handlebars(cb) {
  var templateData = JSON.parse(fs.readFileSync("src/data/data.json")),
    options = {
      ignorePartials: true,
      batch: ["./src/partials"],
      helpers: {
        "raw-helper": function (options) {
          return options.fn();
        },
        each: function (context, options) {
          var ret = "";

          for (var i = 0, j = context.length; i < j; i++) {
            ret = ret + options.fn(context[i]);
          }

          return ret;
        },
        or: function (/* any, any, ..., options */) {
          var len = arguments.length - 1;
          var options = arguments[len];
          var val = false;

          for (var i = 0; i < len; i++) {
            if (arguments[i]) {
              val = true;
              break;
            }
          }
          return util.value(val, this, options);
        },
        and: function () {
          var len = arguments.length - 1;
          var options = arguments[len];
          var val = true;

          for (var i = 0; i < len; i++) {
            if (!arguments[i]) {
              val = false;
              break;
            }
          }

          return util.value(val, this, options);
        },
        eq: function (a, b, options) {
          if (arguments.length === 2) {
            options = b;
            b = options.hash.compare;
          }
          return util.value(a === b, this, options);
        },
        isnt: function (a, b, options) {
          if (arguments.length === 2) {
            options = b;
            b = options.hash.compare;
          }
          return util.value(a != b, this, options);
        },
      },
    };

  return gulp
    .src("src/pages/email.html")
    .pipe(handlebarsfn(templateData, options))
    .pipe(rename("temp.html"))
    .pipe(gulp.dest("temp/"));
}

function server(cb) {
  browserSync.init({
    server: `dist/`,
  });
  cb();
}

function reload(cb) {
  browserSync.reload();
  cb();
}

function watch() {
  var options = {};
  gulp.watch("src/**/*.*", options, gulp.series(handlebars, CSS, heml, reload));
}

function minify() {
  return gulp
    .src("dist/index.html")
    .pipe(
      htmlmin({
        collapseWhitespace: true,
      })
    )
    .pipe(gulp.dest("dist/"));
}

function removeCSS() {
  return gulp
    .src("dist/index.html")
    .pipe(
      remove({
        whitelist: [
          ".ExternalClass",
          ".ReadMsgBody",
          ".yshortcuts",
          ".Mso*",
          ".maxwidth-apple-mail-fix",
          "#outlook",
          ".module-*",
        ],
      })
    )
    .pipe(gulp.dest("dist/"));
}

function removeCSSns() {
  return gulp
    .src("temp/temp.html")
    .pipe(
      remove({
        whitelist: [
          ".ExternalClass",
          ".ReadMsgBody",
          ".yshortcuts",
          ".Mso*",
          ".maxwidth-apple-mail-fix",
          "#outlook",
          ".module-*",
        ],
      })
    )
    .pipe(gulp.dest("temp/"));
}

function fileSize() {
  console.log("Size after build:");
  return gulp.src("dist/index.html").pipe(size()).pipe(gulp.dest("dist/"));
}

function rawOnEmail() {
  return gulp
    .src(["src/pages/email.html"])
    .pipe(replace("<!-- raw-helper -->", "<!-- {{{{raw-helper}}}} -->"))
    .pipe(replace("<!-- /raw-helper -->", "<!-- {{{{/raw-helper}}}} -->"))
    .pipe(replace("<!--raw-helper-->", "<!-- {{{{raw-helper}}}} -->"))
    .pipe(replace("<!--/raw-helper-->", "<!-- {{{{/raw-helper}}}} -->"))
    .pipe(gulp.dest("src/pages/"));
}

function rawRenderTemplatePartials() {
  return gulp
    .src(["src/data/data.json"])
    .pipe(replace('"rndr_template": false', '"rndr_template": true'))
    .pipe(gulp.dest("src/data/"));
}

function rawOnPartials() {
  return gulp
    .src(["src/partials/*.html"])
    .pipe(replace("<!-- raw-helper -->", "<!-- {{{{raw-helper}}}} -->"))
    .pipe(replace("<!-- /raw-helper -->", "<!-- {{{{/raw-helper}}}} -->"))
    .pipe(replace("<!--raw-helper-->", "<!-- {{{{raw-helper}}}} -->"))
    .pipe(replace("<!--/raw-helper-->", "<!-- {{{{/raw-helper}}}} -->"))
    .pipe(gulp.dest("src/partials/"));
}

function rawOffEmail() {
  return gulp
    .src(["src/pages/email.html"])
    .pipe(replace("<!-- {{{{raw-helper}}}} -->", "<!-- raw-helper -->"))
    .pipe(replace("<!-- {{{{/raw-helper}}}} -->", "<!-- /raw-helper -->"))
    .pipe(replace("<!--{{{{raw-helper}}}}-->", "<!--raw-helper-->"))
    .pipe(replace("<!--{{{{/raw-helper}}}}-->", "<!--/raw-helper-->"))
    .pipe(gulp.dest("src/pages/"));
}
function rawOffPartials() {
  return gulp
    .src(["src/partials/*.html"])
    .pipe(replace("<!-- {{{{raw-helper}}}} -->", "<!-- raw-helper -->"))
    .pipe(replace("<!-- {{{{/raw-helper}}}} -->", "<!-- /raw-helper -->"))
    .pipe(replace("<!--{{{{raw-helper}}}}-->", "<!--raw-helper-->"))
    .pipe(replace("<!--{{{{/raw-helper}}}}-->", "<!--/raw-helper-->"))
    .pipe(gulp.dest("src/partials/"));
}

function rawRenderDesignPartials() {
  return gulp
    .src(["src/data/data.json"])
    .pipe(replace('"rndr_template": true', '"rndr_template": false'))
    .pipe(gulp.dest("src/data/"));
}

function fixInlineAll() {
  return gulp
    .src(["dist/index.html"])
    .pipe(replace(/\* {/, "h1, h2, h3, p, span, a {"))
    .pipe(gulp.dest("dist/"));
}

function fixInlineAllns() {
  return gulp
    .src(["temp/temp.html"])
    .pipe(replace(/\* {/, "h1, h2, h3, p, span, a {"))
    .pipe(gulp.dest("temp/"));
}

exports.template = gulp.series(
  rawOnEmail,
  rawOnPartials,
  rawRenderTemplatePartials
);

exports.design = gulp.series(
  rawOffEmail,
  rawOffPartials,
  rawRenderDesignPartials
);

exports.build = gulp.series(
  handlebars,
  CSS,
  heml,
  minify,
  removeCSS,
  fixInlineAll,
  fileSize
);

exports.nsBuild = gulp.series(
  handlebars,
  CSS,
  removeCSSns,
  fixInlineAllns,
  fileSize
);

exports.prodFin = gulp.series(minify, removeCSS, fixInlineAll, fileSize);

exports.oldBuild = gulp.series(handlebars, CSS, heml, minify, fileSize);

exports.develop = gulp.series(handlebars, CSS, heml, server, watch);
