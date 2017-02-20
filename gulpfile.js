"use strict";

// Variables

var gulp = require('gulp');
var sass = require('gulp-sass');
var cleanCSS = require('gulp-clean-css');  // To minify and optionally remove comments
var rename = require("gulp-rename");
var flatten = require("gulp-flatten"); // To place all the output files in the same directory


// Tasks

gulp.task('sass', function() {
    return gulp.src('src/scss/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(flatten())
        // .pipe(cleanCSS({keepSpecialComments : 0}))
        .pipe(gulp.dest('./src/css/'));
});
gulp.task('sass:watch', function() {
   gulp.watch('src/scss/**/*.scss', ['sass']); // The ['sass'] re-runs the 'sass' task
});

gulp.task('deployCSS', function() { // Deploy to the dist directory
    return gulp.src('src/css/carverous.css')
        .pipe(gulp.dest('dist/css/'));
});