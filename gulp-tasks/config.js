import gulp from 'gulp';

<<<<<<< HEAD
export const paths = {
=======

export const paths =  {
>>>>>>> 42638c287be161d6e68d0453e5dff3d589819622
  source: 'source',
  build: 'build',
  bundle: 'bundle'
};
<<<<<<< HEAD
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
=======

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
>>>>>>> 42638c287be161d6e68d0453e5dff3d589819622
