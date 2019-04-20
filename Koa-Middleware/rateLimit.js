//rateLimit.js
// External middleware for limiting request frequency
const lastCall = new Map();
 module.exports = function * (next) {
   //inbound, before reaching the core
   const now = new Date();
   if (lastCall.has(this.ip) && now.getTime() - lastCall.get(this.ip).getTime() < 1000) return this.status = 429; //too many requests

     yield next;

     //outbound, after the core
     lastCall.set(this.ip, now);
     this.set('X-RateLimit-Reset', now.getTime() + 1000);
 };
