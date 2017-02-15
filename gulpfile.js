"use strict";

var gulp = require('gulp');
var sass = require('gulp-sass');
var cleanCSS = require('gulp-clean-css');
var rename = require("gulp-rename");

gulp.task('sass', function() {
    return gulp.src('src/scss/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        // .pipe(cleanCSS({keepSpecialComments : 0})) // minify and remove comments
        .pipe(gulp.dest('src/css'));
});

gulp.task('sass:watch', function() {
   gulp.watch('src/scss/**/*.scss', ['sass']); // ['sass'] watches the 'sass' task
});

gulp.task('deployCSS', function() { // deploy to dist
    return gulp.src('src/css/main.css')
        .pipe(rename('carverous.css'))
        .pipe(gulp.dest('dist/css/'));
});