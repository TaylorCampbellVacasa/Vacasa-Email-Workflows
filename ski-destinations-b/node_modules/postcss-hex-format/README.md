# postcss-hex-format

This plugin will format hexadecimal colors.

### Installation

```sh
npm install postcss-hex-format--save
```

### Usage

```js
const config = {
  length: "long",
  case: "upper"
};

postcss([ require('postcss-hex-format')(config) ])
// do your processing here 🎉
```

Or use it in some other [PostCSS way](https://github.com/postcss/postcss#usage).


### Options

#### `length`
**Possible values:** `short` or `long`.
**Default:** `long`

Use this option to define weither hex colors should be lengthened or shortened if possible.


#### `case`
**Possible values:** `upper` or `lower`.
**Default:** `upper`

Use this option to define wheither hex colors should be uppercase or lowercase.



### Example

If you configure it to use the long form and uppercase as shown in the usage and process the following:

```css
a {
  color: #abc;
}
```

You will get this result:

```css
a {
  color: #AABBCC;
}
```


### Related
* [colornames to hex](https://github.com/avigoldman/postcss-colornames-to-hex)
* [rgb() and rgba() colors to hex](https://www.npmjs.com/package/postcss-rgba-hex)
