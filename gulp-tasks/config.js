import gulp from 'gulp';

export const paths = {
  source: 'source',
  build: 'build',
  bundle: 'bundle'
};
export const bundles = {

};

export const babelOptions = {
  optional: ['runtime']
};

gulp.task('config', () => {
  console.log(JSON.stringify({
    paths,
    bundles
  }, null, 2));
});
