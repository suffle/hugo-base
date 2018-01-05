# Hugo Base

This is a base package to use for static webpages with hugo

## Included

Hugo 0.31.1

Gulp workflow 

Webpack

## PostCSS

The CSS is compiled with PostCSS, mainly CssNext. The features of CssNext are extended by PreCSS-Modules (Mixins, Advanced Variables, Property Lokkup and Extend) and MQPacker. In Production mode the CSS Files are minified and optimized with CssNano excluding autoprefixer (already used by CssNext) and also unused css is removed. If you want to keep css selectors e.g. if they are added by Javascript, wrap them in
 ```css
/* uncss:ignore start */ /* uncss:ignore end*/ 
```

If you want to remove or add any feature for CssNano or PreCss look at the corresponding config files.

Docs:
* [SourceMaps](https://github.com/gulp-sourcemaps/gulp-sourcemaps)
* [cssnext](http://cssnext.io/)
* [precss](https://github.com/jonathantneal/precss)
* [cssnano](http://cssnano.co/guides/)
* [mqpacker](https://github.com/hail2u/node-css-mqpacker)

## Webpack + Babel

The JS is bundled by webpack and runs through babel to make use of the newest ECMAScript Version. In standard it creates a footer and a header file, you can add more entry points, if you want to use different JS files. Also you can add other plugins / loaders for Dev / Prod only.

## Critical and html minification
In production context the html will first be scanned for critical css that will be inlined. Afterwards the html will be minified. For complete configuration see [html-minifier docs](https://github.com/kangax/html-minifier) and [critical docs](https://github.com/addyosmani/critical)