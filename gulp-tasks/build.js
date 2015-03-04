import gulp from 'gulp';
import co from 'co';
import path from 'path';
import plumber from 'gulp-plumber';
import * as gb from 'greasebox';
import * as config from './config';

import debug from 'debug';

debug.enable('build');
const log = debug('build');

const jsFiles = `${config.paths.source}/**/*.js`;
const copyFiles = [`${config.paths.source}/**`, `!${jsFiles}`];


gulp.task('build', ['build:js', 'build:copy', 'bundle'], () => {});

gulp.task('build:js', ['clean'], (cb) => {
  gulp.src(jsFiles)
    .pipe(plumber({
      errorHanlder: cb
    }))
    .pipe(gb.loadMap())
    .pipe(gb.babelTransform(config.babelOptions))
    .pipe(gb.writeMap())
    .pipe(gulp.dest(config.paths.build))
    .on('end', cb);
});

//mainly configs in json format
gulp.task('build:copy', ['clean'], (cb) => {
  gulp.src(copyFiles)
    .pipe(plumber({
      errorHanlder: cb
    }))
    .pipe(gulp.dest(config.paths.build))
    .on('end', cb);
});

