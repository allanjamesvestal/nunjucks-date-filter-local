/* eslint-disable strict */

'use strict';

/* eslint-enable strict */

// const browserSync = require('browser-sync').create();
// const gulp = require('gulp');
// const runSequence = require('run-sequence');
// const watch = require('gulp-watch');
import browserSync from 'browser-sync';
import gulp from 'gulp';
import runSequence from 'run-sequence';
import watch from 'gulp-watch';

browserSync.create();

export default () => {
  browserSync.init({
    files: ['./examples/**/*'],
    server: {
      baseDir: './examples/',
    },
    ghostMode: false,
  });

  watch('./src/scss/**/*.scss', () => {
    runSequence('scss-for-examples');
  });

  watch('./src/templates/**/*.html', () => {
    runSequence('templates-for-examples');
  });
};
