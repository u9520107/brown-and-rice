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
  urlRoot: '/build'
});

requireFilter.filter('.css!');
requireFilter.filter('.*!asset');


import app from './app/app';
import AppDriver from 'meepworks/server-app-driver';

const server = koa();
const port = process.env.PORT || 54321;

server.use(gzip());

server.use(function * (next) {
  console.log(`request: ${this.req.url}`);
  yield next;
});

server.use(favicon());
//server.use(mount('/assets/bundle', serve(path.resolve(__dirname, '../bundle'))));

server.use(mount('/', new AppDriver(app, {
  appPath: 'app/app',
  jspm: {
    path: 'jspm_packages',
    config: 'jspm_packages/config.js'
  },
  distPath: {
    external: 'build',
    internal: 'build'
  },
  fileRoot: __dirname,
  rootUrl: '/build'
})));

server.use(mount('/jspm_packages', serve(path.resolve(__dirname, '../jspm_packages'), {
  maxAge: 5*60*1000
})));
server.use(mount('/build', serve(__dirname, {
  maxAge: 5*60*1000
}) ));

server.listen(port, () => {
  console.log(`listening to ${port}`);
});



