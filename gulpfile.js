/*!
 * Carverous's Gulpfile
 * https://github.com/carverous/carverous-framework
 * Copyright (c) 2017 Ceferino C. Jose II
 * Licensed under MIT (https://github.com/carverous/carverous-framework/blob/master/LICENSE)
 */

// Gulp is a toolkit for automating painful or time-consuming tasks in your
// development workflow, so you can stop messing around and build something.

// Variables
const gulp = require('gulp');
const sequence = require('gulp-sequence'); // To run the tasks sequentially instead of asynchronously
const insert = require('gulp-insert');
const rename = require('gulp-rename');
const flatten = require('gulp-flatten'); // To place all the output files in the same single directory
const sasslint = require('gulp-sass-lint'); // To ensure our Sass/SCSS code is clean and consistent
const sass = require('gulp-sass');
const postCSS = require('gulp-postcss');
const autoprefixer = require('autoprefixer'); // A PostCSS plugin to add vendor prefixes using values from caniuse.com
const cleanCSS = require('gulp-clean-css');  // To minify and optionally remove comments in CSS
const eslint = require('gulp-eslint'); // To ensure our JS code is clean and consistent
const concatJS = require('gulp-concat'); // To bundle all js files into a single file
const babelJS = require('gulp-babel'); // To transpile ES6 to ES5
const uglifyJS = require('gulp-uglify'); // To minify JS files

let fs = require('fs'); // To re-read the file and parse it each time the task is executed
let pkg = JSON.parse(fs.readFileSync('./package.json')); // My alternative to Grunt's readJSON.

// Prepend author's banner on top of the main css and js files
// ES6 interpolation baby!
let banner = `/*!
 * Carverous ${pkg.version} (${pkg.homepage})
 * Copyright (c) ${new Date().getFullYear()} ${pkg.author}
 * Licensed under ${pkg.license} (${pkg.licensepage})
 */\n\n`;

function handleError(err) {
  console.log(err.toString());
  this.emit('end');
}

// Transpile Sass/SCSS to CSS
gulp.task('scss', function() {
  return gulp.src('src/scss/**/*.s+(a|c)ss')
    .pipe(sasslint({
      options: {
        'configFile': 'sass-lint.yml'
      }
    }))
    .pipe(sasslint.format())
    .pipe(sasslint.failOnError())
    .pipe(sass({outputStyle: 'expanded'})
    .on('error', sass.logError))
    .pipe(flatten())
    .pipe(gulp.dest('dist/css/'));
});

// Add Vendor Prefixes
gulp.task('css:autoprefix', function() {
  return gulp.src([
    'dist/css/**/*.css',
    '!dist/css/**/*.min.css', // Except .min.css files
    '!dist/css/**/font-awesome*'
  ])
    .pipe(postCSS([autoprefixer({browsers: ['last 2 versions']})]))
    .on('error', handleError)
    .pipe(insert.prepend(banner))
    .pipe(gulp.dest('dist/css/'));
});

// Minify the prepended and autoprefix-ed versions of css
gulp.task('css:minify', function() {
  return gulp.src([
    'dist/css/**/*.css',
    '!dist/css/**/*.min.css' // Don't minify the minified files!
  ])
    .pipe(cleanCSS({keepSpecialComments: 1}))
    .on('error', handleError)
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('dist/css/'));
});

// Bundle js files into a single file
gulp.task('es:bundle', function() {
  return gulp.src([
    'src/es/**/*.js',
    '!node_modules/**'
  ])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(concatJS(pkg.name + '.js'))
    .pipe(babelJS())
    .on('error', handleError)
    .pipe(insert.prepend(banner))
    .pipe(gulp.dest('dist/js/'));
});

// Minify the prepended bundled js file
gulp.task('js:minify', function() {
  return gulp.src('dist/js/' + pkg.name + '.js')
    .pipe(uglifyJS({q:1}))
    .on('error', handleError)
    .pipe(insert.prepend(banner))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('dist/js/'));
});

// Minify both CSS & JS sequentially
gulp.task('minify', sequence(['css:minify', 'js:minify']));

// Take control of the build tasks while we create awesome things!
gulp.task('watch', function(w) {

  gulp.watch(
    ['src/scss/**/*.s+(a|c)ss'],
    {cwd: './'},
    function(event) {
      sequence('scss', 'css:autoprefix')(function(err) {
        if (err) console.log(err)
      });
    }
  );

  gulp.watch(
    ['src/es/**/*.js',],
    {cwd: './'},
    function(event) {
      sequence('es:bundle')(function(err) {
        if (err) console.log(err);
      });
    }
  );

});

gulp.task('default', ['watch']);
