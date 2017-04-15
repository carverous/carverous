/*!
 * Carverous's Gulpfile
 * https://github.com/cefjoeii/carverous
 * Copyright (c) 2017 Ceferino Jose II
 * Licensed under MIT (https://github.com/cefjoeii/carverous/blob/master/LICENSE)
 */

// Gulp is a toolkit for automating painful or time-consuming tasks in your
// development workflow, so you can stop messing around and build something.

// Variables
const gulp = require('gulp');
const sequence = require('gulp-sequence'); // To run the tasks sequentially instead of asynchronously
const insert = require('gulp-insert');
const rename = require("gulp-rename");
const flatten = require("gulp-flatten"); // To place all the output files in the same single directory
const sass = require('gulp-sass');
const postCSS = require('gulp-postcss');
const autoPrefixer = require('autoprefixer'); // PostCSS plugin to add vendor prefixes using values from http://caniuse.com/
const cleanCSS = require('gulp-clean-css');  // To minify and optionally remove comments in CSS
const concatJS = require('gulp-concat'); // To bundle all js files into a single file
const uglifyJS = require('gulp-uglify'); // To minify JS files

let fs = require('fs'); // To re-read the file and parse it each time that the task is executed
let pkg = JSON.parse(fs.readFileSync('./package.json')); // Couldn't find alternative to Grunt's readJSON at the moment.

// Prepend author's banner on top of the main css and js files
// ES6 interpolation baby!
let banner = `/*!
 * Carverous ${pkg.version} (${pkg.homepage})
 * Copyright (c) ${new Date().getFullYear()} ${pkg.author}
 * Licensed under ${pkg.license} (${pkg.licensepage})
 */\n\n`;

function handleError(err) {
  console.log(err.toString());
  // this.emit('end');
}

// Transpile Sass/SCSS to CSS
gulp.task('scss', function () {
  return gulp.src('src/scss/**/*.scss')
    .pipe(sass({outputStyle: 'expanded'})
      .on('error', sass.logError))
    .pipe(flatten())
    .pipe(gulp.dest('build/css/'));
});

// Add Vendor Prefixes
gulp.task('css:autoprefix', function () {
  return gulp.src([
    'build/css/*.css',
    '!build/css/*.min.css', // Except .min.css files
    '!build/css/font-awesome*'
  ])
    .pipe(postCSS([autoPrefixer()]))
    .on('error', handleError)
    .pipe(insert.prepend(banner))
    .pipe(gulp.dest('build/css/'));
});

// Minify the prepended and autoprefix-ed versions of css
gulp.task('css:minify', function () {
  return gulp.src([
    'build/css/*.css',
    '!build/css/*.min.css' // Don't minify the minified files!
  ])
    .pipe(cleanCSS({keepSpecialComments: 1}))
    .on('error', handleError)
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('build/css/'));
});

// Bundle js files into a single file
gulp.task('es:bundle', function () {
  return gulp.src([
    'src/es/*.js',
    // '!src/es/' + pkg.name + '.js', // Don't insert yourself to yourself!
    // '!src/es/*.min.js', // Don't even add the minified versions to the unminified bundle!
    // '!src/es/live.js' // This auto browser refresh script is for development only
  ])
    .pipe(concatJS(pkg.name + '.js'))
    .on('error', handleError)
    .pipe(insert.prepend(banner))
    .pipe(gulp.dest('build/js/'));
});

// Minify the prepended bundled js files
gulp.task('js:minify', function () {
  return gulp.src([
    'build/js/' + pkg.name + '.js',
    '!build/js/*.min.js' // Don't minify the minified files!
  ])
    .pipe(uglifyJS())
    .on('error', handleError)
    .pipe(insert.prepend(banner))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('build/js/'));
});

// Take control of all the tasks while we build awesome things!
gulp.task('watch', function (w) {

  gulp.watch([
      'src/scss/**/*.scss'
    ],
    {cwd: './'},
    function (event) {
      sequence('scss', 'css:autoprefix')(function (err) {
        if (err) console.log(err)
      })
    }
  );

  gulp.watch([
      'src/es/**/*.js',
      // '!src/es/' + pkg.name + '.js', // Ignore this to prevent re-running the task
      // '!src/es/' + pkg.name + '.min.js', // Ignore this to prevent re-running the task
      // '!src/es/live.js'
    ],
    {cwd: './'},
    function (event) {
      sequence('js:bundle')(function (err) {
        if (err) console.log(err)
      })
    }
  );
});

// So we don't have to explicitly type 'watch' after the 'gulp' command
gulp.task('default', ['watch']);
