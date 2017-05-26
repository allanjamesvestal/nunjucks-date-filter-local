// const gulp = require('gulp');
// const moment = require('moment');
// const nunjucksRender = require('gulp-nunjucks-render');
// const debug = require('gulp-debug');
import gulp from 'gulp';
import moment from 'moment';
import nunjucksRender from 'gulp-nunjucks-render';
import debug from 'gulp-debug';
import * as dateFilter from './../../src/js';

const dateObj = moment('2014-06-01T12:00:00Z');

const manageEnvironment = (environment) => {
  environment.addFilter('slug', function(str) {
    return str && str.replace(/\s/g, '-', str).toLowerCase();
  });
  environment.addGlobal('globalTitle', 'My global title');

  // eslint-disable-next-line global-require
  // const aaa = require('./../../dist/js/demo');
  // const dateFilter = require('../../dist/js/fuckit')(1, 2);
  // console.log(dateFilter);
  // console.log(dateFilter.install);
  dateFilter.install(environment, 'date');
};

export default () => {
  const sampleMeta = {
    rawDate: dateObj.toISOString(),
  };

  // const nunjucksEnv = nunjucksRender.nunjucks.configure(
  //   ['src/templates/'],
  //   { watch: false }  // eslint-disable-line comma-dangle
  // );

  return gulp.src('./src/templates/**/*.html')
    .pipe(nunjucksRender({
      path: ['./src/templates/'],
      data: sampleMeta,
      envOptions: {
        watch: false,
      },
      manageEnv: manageEnvironment,
    }))
    .pipe(gulp.dest('./examples'));
};
