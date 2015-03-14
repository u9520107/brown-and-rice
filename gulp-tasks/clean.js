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
});
