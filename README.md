# NodeJS
NodeJS. Exploration of Design Patterns.

Resources consulted building this repo:
https://caolan.github.io/async/docs.html#eachOfSeries
https://medium.com/javascript-scene/what-is-this-the-inner-workings-of-javascript-objects-d397bfa0708a
https://streams.spec.whatwg.org

Node.js Design Patterns: 

Revealing contructor, encapsulation: 
https://blog.domenic.me/the-revealing-constructor-pattern/

Prototypical inheritance: https://vimeo.com/69255635
https://medium.com/javascript-scene/introducing-the-stamp-specification-77f8911c2fee
https://medium.com/@koresar/fun-with-stamps-episode-1-stamp-basics-e0627d81efe0
http://crockford.com/javascript/prototypal.html

Augmentating proxification, Prototypical middleware-like hooking: 
https://www.npmjs.com/package/hooks
Notably, http://mongoosejs.com is a Object-Document Mapping (ODM) library for MongoDB, I used in Antilope project. Internally, it uses this package to provide pre-post-execution hooks for the init, validate, save, and remove methods of its Document objects.

Monjey hooking https://www.npmjs.com/package/hooker

Proxi API 
https://developers.google.com/web/updates/2016/02/es2015-proxies
https://developer.mozilla.org/it/docs/Web/JavaScript/Reference/Global_Objects/Proxy

LevelDB Project:
levelup https://www.npmjs.com/package/levelup
https://www.npmjs.com/package/level

Multiformat Strategy, State, Template formats:
https://www.npmjs.com/package/json-over-tcp
http://www.passportjs.org/docs/
https://www.npmjs.com/package/ini
https://www.npmjs.com/package/object-path
Notably, Passport.js http://passportjs.org - an authentification middleware for node enables support of different authentification providers (OAuth, localdb, custom) for requests, using Strategy pattern.

Core J2EE Pattern - Intercepting Filter
https://www.oracle.com/technetwork/java/interceptingfilter-142169.html

Chain of Responsobility Pattern
https://dzone.com/articles/design-patterns-uncovered-chain-of-responsibility

Operational Transformation
http://www.codecommit.com/blog/java/understanding-and-applying-operational-transformation

ZeroMQ \zero-em-queue\, \ØMQ\:
http://zeromq.org/

koa next generation web framework for node.js 
https://koajs.com/
https://github.com/koajs/ratelimit

URL-safe means of representing claims to be transferred between two parties 
http://self-issued.info/docs/draft-ietf-oauth-json-web-token.html

Fast, unopinionated, minimalist web framework for node.
https://www.npmjs.com/package/express

Fast and simple storage. A Node.js wrapper for abstract-leveldown compliant stores, which follow the characteristics of LevelDB 
https://www.npmjs.com/package/levelup

Angular Magic of argument extraction
https://www.npmjs.com/package/args-list




