// Gulp is a toolkit for automating painful or time-consuming tasks in your
// development workflow, so you can stop messing around and build something.

"use strict";

// Variables
var gulp = require('gulp');
var sass = require('gulp-sass');
var cleanCSS = require('gulp-clean-css');  // To minify and optionally remove comments
var rename = require("gulp-rename");
var flatten = require("gulp-flatten"); // To place all the output files in the same directory
var postCSS = require('gulp-postcss');
var autoPrefixer = require('autoprefixer'); // PostCSS plugin to add vendor prefixes using values from http://caniuse.com/


// Tasks
gulp.task('sass', function() {
    return gulp.src('./src/scss/**/*.scss')
        .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError)) // Show on the console if there's an error while transpiling
        .pipe(flatten())
        // .pipe(cleanCSS({keepSpecialComments : 0}))
        .pipe(gulp.dest('./src/css/'));
});

gulp.task('autoPrefix', function() {
    return gulp.src('./src/css/carverous.css')
        .pipe(postCSS([ autoPrefixer() ]))
        .pipe(gulp.dest('./src/css/'));
});

gulp.task('deploy', function() { // Deploy to the dist directory
    return gulp.src([
        './src/css/**/*.css',
        './src/js/**/*.js'
    ], {base: './src/'})
        .pipe(gulp.dest('dist/'));
});

gulp.task('watch', function() {
    gulp.watch('./src/scss/**/*.scss', ['sass']);
    gulp.watch('./src/css/**/carverous.css', ['autoPrefix']);
    gulp.watch(
        ['./src/css/**/*.css', './src/js/**/*.js'],
        {base: './src/'} //,
        // ['deploy']
    );
});