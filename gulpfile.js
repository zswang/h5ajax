/*jshint globalstrict: true*/
/*global require*/

'use strict';

var gulp = require('gulp');
var util = require('util');
var jdists = require('gulp-jdists');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var examplejs = require('gulp-examplejs');

gulp.task('example', function() {
  return gulp.src([
      'src/**/*.js'
    ])
    .pipe(examplejs({
      header: `
require('./lib/dom');
var h5ajax = require('../');
      `
    }))
    .pipe(gulp.dest('test'));
});

gulp.task('build', function() {
  return gulp.src(['src/h5ajax.js'])
    .pipe(jdists({
      trigger: 'release',
      remove: 'remove,debug,test,safe'
    }))
    .pipe(rename('h5ajax.js'))
    .pipe(gulp.dest('./'))
    .pipe(uglify())
    .pipe(rename('h5ajax.min.js'))
    .pipe(gulp.dest('./'));
});

gulp.task('default', ['build']);
