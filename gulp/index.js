/* eslint-disable strict */

'use strict';

/* eslint-enable strict */

import gulp from 'gulp';
// const gulp = require('gulp');

import browserify from './tasks/browserify';
import jsify from './tasks/jsify';
import scss from './tasks/scss-for-examples';
import server from './tasks/server';
import templates from './tasks/templates-for-examples';
import watchify from './tasks/watchify';

export default (tasks) => {
  // tasks.forEach((name) => {
  //   import taskModule from `./tasks/${name}`
  //   gulp.task(name, taskModule); // eslint-disable-line global-require
  // });

  gulp.task('browserify', browserify);
  gulp.task('jsify', jsify);
  gulp.task('scss-for-examples', scss);
  gulp.task('server', server);
  gulp.task('templates-for-examples', templates);
  gulp.task('watchify', watchify);

  return gulp;
};
