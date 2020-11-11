# gulp-static-bindings
Replaces one-way dynamic bindings with string literals to static string literals

# gulp-static-bindings

[![NPM version](https://img.shields.io/npm/v/gulp-static-bindings.svg?style=flat-square)](https://www.npmjs.com/package/gulp-static-bindings)

## Install

```
$ npm install -S gulp-static-bindings
```

## Purpose?
  * https://angular.io/guide/property-binding#binding-to-a-property
    for removing excessive dynamic bindings for string literals
    
## How to use

```js
gulp.task('string-static-literals', function() {
  // Stuff here
  return gulp.src('./src/**/*.html',{ base: "." })
    .pipe(removeDynamicBindings())
    .pipe(gulp.dest('.'));
});
```
