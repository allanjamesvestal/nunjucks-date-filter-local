/* eslint-disable strict */

'use strict';

/* eslint-enable strict */

import runSequence from 'run-sequence';
import S from 'string';
// const runSequence = require('run-sequence');
// const S = require('string');


// const gulp = require('./gulp')([
//   'browserify',
//   'scss-for-examples',
//   'server',
//   'templates-for-examples',
//   'watchify',
// ]);
import gulpConstructor from './gulp';

// import gulpFn from './gulp';

const gulp = gulpConstructor([
  'browserify',
  'scss-for-examples',
  'server',
  'templates-for-examples',
  'watchify',
]);


gulp.task('default', [
  'scss-for-examples',
  'templates-for-examples',
  'watchify',
  'server',
], () => {});


gulp.task('build', [
  'templates-for-examples',
  'browserify',
]);
