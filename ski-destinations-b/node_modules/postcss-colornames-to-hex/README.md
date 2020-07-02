# postcss-colornames-to-hex

This plugin will convert CSS color names like `blue` or `black` to their hexadecimal equivalent.

### Installation

```sh
npm install postcss-colornames-to-hex --save
```

### Usage

```js
postcss([ require('postcss-colornames-to-hex') ])
// do your processing here 🎉
```

Or use it in some other [PostCSS way](https://github.com/postcss/postcss#usage).


### Example

You put this in....

```css
a {
  color: blue;
}
```

and you get this out...

```css
a {
  color: #0000FF;
}
```
