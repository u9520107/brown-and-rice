import koa from 'koa';
import favicon from 'koa-favicon';
import mount from 'koa-mount';
import serve from 'koa-static-cache';
import router from 'koa-router';
import gzip from 'koa-gzip';
import path from 'path';

import * as config from './config';

import RequireFilter from 'meepworks/require-filter';
const requireFilter = new RequireFilter({
  fileRoot: __dirname,
  urlRoot: '/assets/build'
});

requireFilter.filter('.css!');
requireFilter.filter('.*!asset');


import app from './app/app';
import AppDriver from 'meepworks/server-app-driver';

const server = koa();
const port = process.env.PORT || 54321;

server.use(gzip());

server.use(favicon());
server.use(mount('/assets/jspm_packages', path.resolve(__dirname, '../jspm_packages')));
server.use(mount('/assets/build', __dirname) );
server.use(mount('/assets/bundle', path.resolve(__dirname, '../bundle')));

server.use(mount('/', new AppDriver(app, {
  appPath: 'app/app',
  jspm: {
    path: 'jspm_packages',
    config: 'jspm_packages/config.js'
  },
  distPath: {
    external: 'assets/build',
    internal: 'build'
  },
  fileRoot: __dirname,
  urlRoot: '/assets/build'
})));

server.listen(port, () => {
  console.log(`listening to ${port}`);
});



