/*
Koa uses middleware alike Express
It uses generators of ES2015, and no callbacks. Has ONION structure with outbound and inbound (downstream, upstream) traversal of middlewares and the app core.
* */
//This app returns current timestamp
const app = require('koa');
app.use(function * () {
   this.body = {now: new Date()};
});
app.use(require('./rateLimit'));
app.listen(3000);
