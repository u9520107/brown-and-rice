import React from 'react';
import Koa from 'koa';
import serve from 'koa-static';
import mount from 'koa-mount';
import router from 'koa-router';
import config from '../../config';

var app = new Koa();

app.use(function * (next) {
  console.log(this.req.url);
  yield next;
});
app.use(router(app));



app.get('/', function *() {
  this.status = 200;
  this.body = '<!DOCTYPE html>' + React.renderToStaticMarkup(<html>
    <head>
      <title>Brown and Rice</title>
    </head>
    <body>
      Hello
    </body>
  </html>);
});

app.listen(config.port, function (err) {
  if(err) {
    return console.log(err);
  }
  console.log('listening to ' + config.port);
});


