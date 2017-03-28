/*!
 * Carverous Gulpfile
 * https://github.com/cefjoeii/carverous
 * Copyright (c) 2017 CEF
 * Licensed under MIT (https://github.com/cefjoeii/carverous/blob/master/LICENSE)
 */

// Gulp is a toolkit for automating painful or time-consuming tasks in your
// development workflow, so you can stop messing around and build something.

'use strict';

// Variables
var fs = require('fs'); // To re-read the file and parse it each time that the task is executed
var pkg = JSON.parse(fs.readFileSync('./package.json')); // Couldn't find alternative to Grunt's readJSON at the monment.
var gulp = require('gulp');
var gulpSequence = require('gulp-sequence'); // To run the tasks sequentially instead of asynchronously
var insert =  require('gulp-insert');
var rename = require("gulp-rename");
var flatten = require("gulp-flatten"); // To place all the output files in the same single directory
var sass = require('gulp-sass');
var postCSS = require('gulp-postcss');
var autoPrefixer = require('autoprefixer'); // PostCSS plugin to add vendor prefixes using values from http://caniuse.com/
var cleanCSS = require('gulp-clean-css');  // To minify and optionally remove comments in CSS
var concatJS = require('gulp-concat'); // To bundle all js files into a single file
var uglifyJS = require('gulp-uglify'); // To minfy JS files

// Prepend author's banner on top of the main css and js files | ES6 Accepts this code baby!
var banner = `/*!
 * Carverous ${pkg.version} (${pkg.homepage})
 * Copyright (c) ${new Date().getFullYear()} ${pkg.author}
 * Licensed under ${pkg.license} (${pkg.licensepage})
 */\n\n`;



// Tasks

function handleError(err) {
    console.log(err.toString());
    this.emit('end');
}

// Transpile Sass to CSS
gulp.task('sass', function() {
    return gulp.src('./src/scss/**/*.scss')
        .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError)) // Useful for debugging our Sass source code
        .pipe(flatten())
        .pipe(gulp.dest('./src/css/'))
        .on('error', handleError);
});

// Add Vendor Prefixes
gulp.task('autoprefix', function() {
    return gulp.src([
        './src/css/*.css',
        '!./src/css/*.min.css' // Except .min.css files
        ])
        .pipe(postCSS([ autoPrefixer() ]))
        .pipe(insert.prepend(banner))
        .pipe(gulp.dest('./src/css/'))
        .on('error', handleError);
});

// Minify the prepended and autoPrefix-ed versions of css
gulp.task('minifycss', function () {
    return gulp.src([
        './src/css/*.css',
        '!./src/css/*.min.css' // Except .min.css files of course | It would be problematic
    ])
        .pipe(cleanCSS({keepSpecialComments : 1}))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('./src/css/'))
        .on('error', handleError);
});

// Bundle js files into a single file
gulp.task('bundlejs', function () {
    return gulp.src([
        './src/js/*.js',
        '!./src/js/' + pkg.name + '.js', // Don't insert yourself to yourself!
        '!./src/js/*.min.js', // Don't add the minified versions to the unminified bundle!
        '!./src/js/live.js' // This auto browser refresh script is for development only
    ])
        .pipe(concatJS(pkg.name + '.js'))
        .pipe(insert.prepend(banner))
        .pipe(gulp.dest('./src/js/'))
        .on('error', handleError);
});

// Minify the prepended bundled js files
gulp.task('minifyjs', function () {
    return gulp.src([
        './src/js/' + pkg.name + '.js',
        '!./src/js/*.min.js'
        ])
        .pipe(uglifyJS())
        .pipe(insert.prepend(banner))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('./src/js/'))
        .on('error', handleError);
});

// Deploy - copy files to the dist directory
gulp.task('deploy', function() {
    return gulp.src([
        './src/css/**/*.css',
        './src/js/**/' + pkg.name + '.js',
        './src/js/**/' + pkg.name + '.min.js'
        ], {base: './src/'})
        .pipe(gulp.dest('./dist/'))
        .on('error', handleError);
});

// Take control of all the tasks while we build awesome things!
gulp.task('watch', function(w) {

    gulp.watch([
        './src/scss/**/*.scss'
        ],
        function(event) {
            gulpSequence('sass', 'autoprefix', 'minifycss', 'deploy') (function(err) {
                if (err) console.log(err)
            })
        }
    );

    gulp.watch([
            './src/js/**/*.js',
            '!./src/js/' + pkg.name + '.js', // Ignore this to prevent re-running the task
            '!./src/js/' + pkg.name + '.min.js', // Ignore this to prevent re-running the task
            '!./src/js/live.js'
        ],
        function(event) {
            gulpSequence('bundlejs', 'minifyjs', 'deploy') (function(err) {
                if (err) console.log(err)
            })
        }
    );
});

// So we don't have to explicitly type 'watch' after the 'gulp' command
gulp.task('default', ['watch']);