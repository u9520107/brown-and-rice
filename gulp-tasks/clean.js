<<<<<<< HEAD
import gulp from 'gulp';
import rm from 'greasebox/rm';
import path from 'path';
import * as config from './config.js';

gulp.task('clean', ['clean:bundle', 'clean:build'], () => {});

gulp.task('clean:bundle', (cb) => {
  rm(path.resolve(__dirname, `../${config.paths.bundle}`))
    .then(cb)
    .catch(cb);
});

gulp.task('clean:build', (cb) => {
  rm(path.resolve(__dirname, `../${config.paths.build}`))
    .then(cb)
    .catch(cb);
=======

import gulp from 'gulp';
import co from 'co';
import path from 'path';
import plumber from 'gulp-plumber';
import rm from 'greasebox/rm';

import { paths } from './config';


gulp.task('clean', (cb) => {
  rm(paths.build)
  .then(cb)
  .catch(cb);
});

gulp.task('clean:bundle', (cb) => {
  rm(paths.bundle)
  .then(cb)
  .catch(cb);
>>>>>>> 42638c287be161d6e68d0453e5dff3d589819622
});
