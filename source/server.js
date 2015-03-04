import koa from 'koa';
import router from 'koa-router';
import favicon from 'koa-favicon';
import mount from 'koa-mount';
import serve from 'koa-static';
import path from 'path';
import * as config from './config';

import debug from 'debug';

debug.enable('server-log');
const log = debug('server-log');

import requireFilter from 'meepworks/require-filter';
requireFilter.filter('.css!');

import AdminApp from './app/app';
import AppDriver from 'meepworks/server-app-driver';
import auth from './middlewares/auth';
import api from './api/api';


const server = koa();
const port = process.env.PORT || 10700;

server.use(favicon());
server.use(mount('/build', serve(path.resolve(__dirname, '../build/')) ));
server.use(mount('/bundle', serve(path.resolve(__dirname, '../bundle/')) ));
server.use(mount('/jspm_packages', serve(path.resolve(__dirname, '../jspm_packages/')) ));

server.use(function * (next) {
  let t = new Date();
  yield next;
  log(this.req.url, t, `${ (new Date().getTime() - t.getTime()) } ms`);
});


server.use(mount('/api', api));
server.use(auth);

server.use(mount('/', new AppDriver(AdminApp, {
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
  debug: config.debug
})));

server.listen(port, () => {
  log(`listening to ${port}`);
});
