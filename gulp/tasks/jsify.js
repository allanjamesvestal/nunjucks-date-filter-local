/* eslint-disable strict */

'use strict';

/* eslint-enable strict */

// const babelify = require('babelify');
// const browserify = require('browserify');
// const buffer = require('vinyl-buffer');
// const es = require('event-stream');
// const gulp = require('gulp');
// const gutil = require('gulp-util');
// const insert = require('gulp-insert');
// const source = require('vinyl-source-stream');
// const sourcemaps = require('gulp-sourcemaps');
// const uglify = require('gulp-uglify');
// const watchify = require('watchify');

import babelify from 'babelify';
import browserify from 'browserify';
import buffer from 'vinyl-buffer';
import es from 'event-stream';
import gulp from 'gulp';
import gutil from 'gulp-util';
import insert from 'gulp-insert';
import source from 'vinyl-source-stream';
import sourcemaps from 'gulp-sourcemaps';
import uglify from 'gulp-uglify';
import watchify from 'watchify';


export default (watch) => {
  const wrapper = watch ? watchify : b => b;

  return () => {
    const files = [
      'index.js',
      // 'demo.js',
    ];

    const tasks = files.map((entry) => {
      const props = {
        entries: `./src/js/${entry}`,
        extensions: ['.js'],
        cache: {},
        packageCache: {},
        debug: true,
      };

      const bundler = wrapper(browserify(props).transform(babelify, {
        presets: ['es2015'],
      }));

      function bundle() {
        return bundler.bundle()
          .on('error', gutil.log.bind(gutil, 'Browserify Error'))
          .pipe(source(entry))
          .pipe(buffer())
          .pipe(sourcemaps.init({ loadMaps: true }))
          .pipe(uglify({ mangle: false, compress: true }).on('error', gutil.log))
          .pipe(sourcemaps.write('./'))
          .pipe(gulp.dest('./dist/js/'));
      }

      bundler.on('log', gutil.log);
      bundler.on('update', bundle);

      return bundle();
    });
    return es.merge.apply(null, tasks);
  };
};
