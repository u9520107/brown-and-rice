import gulp from 'gulp';


export const paths =  {
  source: 'source',
  build: 'build',
  bundle: 'bundle'
};

export const babelOptions = {
    optional: ['runtime']
};


export const bundles = {
  'base': [
    'react',
    'co',
    'meepworks/client-app-driver',
    'meepworks/uuid',
    'meepworks/tmpl',
    'meepworks/styles',
    'greasebox'
  ]
};

gulp.task('config', ()=>{});
