var gulp = require('gulp');
var fs = require('fs');
var path = require('path');
var cp = require('child_process');

var isHarmony = process.execArgv.indexOf('--harmony') > -1;

if(isHarmony) {
  fs.readdirSync('gulp-tasks').forEach(function(task) {
    if(/^[A-za-z].*\.js$/i.test(task)) {
      require(path.resolve(__dirname, 'gulp-tasks', task));
    }
  });
}

gulp.task('build', (isHarmony ? ['harmony-build-server', 'harmony-build-css', 'harmony-build-dist', 'harmony-copy-files'] : []), function () {
  if(!isHarmony) {
    spawnTask('build');
  }
});

gulp.task('server', function () {
    cp.spawn('node', ['--harmony', 'build/server/app'], {
      stdio: 'inherit'
    });
});

function spawnTask(task) {
  return cp.spawn('node', ['--harmony', 'node_modules/gulp/bin/gulp.js', task], {
    stdio: 'inherit'
  });
}
