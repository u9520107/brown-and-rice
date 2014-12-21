var gulp = require('gulp');
var cofs = require('co-fs');
var path = require('path');
var greasebox = require('greasebox');
var co = require('co');

gulp.task('harmony-clean-server', function (cb){
  co(function *() {
    if(yield cofs.exists(path.resolve(__dirname, '../build'))) {
      yield greasebox.rm(path.resolve(__dirname, '../build'));
    }
    cb();
  });
});
gulp.task('harmony-clean-dist', function (cb){
  co(function *() {
    if(yield cofs.exists(path.resolve(__dirname, '../dist'))) {
      yield greasebox.rm(path.resolve(__dirname, '../dist'));
    }
    cb();
  });
});

gulp.task('harmony-build-server', ['harmony-clean-server'], function (cb){
  gulp.src(['src/**/*.js', 'src/**/*.jsx'])
    .pipe(greasebox.loadMap())
    .pipe(greasebox.jsxTransform())
    .pipe(greasebox.removeCss())
    .pipe(greasebox.traceurTransform({
      generators: 'parse',
      promises: 'parse',
      symbols: 'parse'
    }))
    .pipe(greasebox.writeMap())
    .pipe(gulp.dest('build'))
    .on('end', cb);
});

gulp.task('harmony-build-dist', ['harmony-clean-dist'], function (cb){
  gulp.src(['src/**/*.js', 'src/**/*.jsx'])
    .pipe(greasebox.loadMap())
    .pipe(greasebox.jsxTransform())
    .pipe(greasebox.traceurTransform({
      modules: 'instantiate'  
    }))
    .pipe(greasebox.writeMap())
    .pipe(gulp.dest('dist'))
    .on('end', cb);
});

gulp.task('harmony-build-css', ['harmony-clean-dist'], function (cb) {
  gulp.src(['src/**/*.styl'])
    .pipe(greasebox.loadMap())
    .pipe(greasebox.stylusTransform())
    .pipe(greasebox.writeMap())
    .pipe(gulp.dest('dist'))
    .on('end', cb);
});

gulp.task('harmony-copy-files', ['harmony-clean-dist'], function (cb) {
  gulp.src([
    'src/**/*',
    '!src/**/*.js',
    '!src/**/*.jsx',
    '!src/**/*.styl'
  ]).pipe(gulp.dest('dist'))
  .on('end', cb);
});
