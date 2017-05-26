/* eslint-disable strict */

'use strict';

/* eslint-enable strict */

// const gulp = require('gulp');
// const sass = require('gulp-sass');
// const sourcemaps = require('gulp-sourcemaps');
import gulp from 'gulp';
import sass from 'gulp-sass';
import sourcemaps from 'gulp-sourcemaps';


export default () =>
    gulp.src(['./src/scss/**/*.scss', './src/scss/**/*.css'])
      // eslint-disable-next-line no-param-reassign
      .pipe(sourcemaps.init())
      .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
      .pipe(sourcemaps.write())
      .pipe(gulp.dest('./examples/css'));
