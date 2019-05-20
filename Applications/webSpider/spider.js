/*This application is built with consequential asynchronous algorithms crawling over links on a page, using recursive iteration
* This practice showed how asynchronous APIs can be bent to my will,
* starting with plain JavaScript, which provided foundation for the analysis of more sophisticated techniques.
* async library defines solutions to most of async problems, in addition to offering a programming style for every taste
* I may now choose async to simplify the most common flows.
* */


const utilities = require('./promisify.js');
/*
* request module presents the following substack signature - request(url, (error, response, body) => {});
* promisification will therefore pass it's own 'SpecialCallback' (err, result) => {} that reassembles ...args list provided to promisify(...args)
* new signature of the request before it's invoked is: request(url, (reject , resolve) => { promise settlement achieved within this scope }),
* finally it yields thenable\settlement
* Appending last argument into the list adheres to NodeJS callback conventions: cb is passed last, therefore invoked as expected.
* */
const request = utilities.promisify(require('request'));
//signature of async mkdirp(dir, opts, cb)
const mkdirp = utilities.promisify(require('mkdirp'));
const fs = require('fs');
//fs.readFile(path[, options], function callback (reject, resolve) {settlement}). Callback, once more, is set by promisification.
const readFile = utilities.promisify(fs.readFile);
const writeFile = utilities.promisify(fs.writeFile);

const path = require('path');
const TaskQueue = require('./TaskQueue');
const downloadedUrls = new Map();
const urlToFilename = (url) => url.split('/').pop();
const async = require('async');
const downloadQueue = async.queue(
    (taskData, callback) => spider(taskData.link, taskData.nesting - 1, callback),
    2);

function download(url, filename) {
    console.log(`Downloading ${url}`);
    let body;
    //download returns either thenable object, either settlement of the response (from url request)
    return request(url)
    //response of the request, returned as
        .then(response => {
            body = response.body;
            //no
            return mkdirp(path.dirname(filename));
        })
        //writeFile is promising == thenable, hence onRejected is also registered by the process of promisification.
        .then(() => writeFile(filename, body))
        .then(() => {
            console.log(`Downloaded and saved: ${url}`);
            //finally, promise is fulfilled with value body.
            return body;
        });
}

function spiderLinks(currentUrl, body, nesting, callback) {
    if(nesting === 0) return process.nextTick(callback);
    const links = utilities.getPageLinks(currentUrl, body);
    if(links.length === 0) return process.nextTick(callback);
    let completed = 0;
    let hasErrors = false;
    links.forEach(link => {
        const taskData = {link: link, nesting: nesting};
        downloadQueue.push(taskData, err => {
            if (err) {
                hasErrors = true;
                return callback(err);
            }
            if (++completed === links.length && !hasErrors) callback();
        });
    });
}

function spider(url, nesting, callback) {
    if (downloadedUrls.has(url)) return process.nextTick(callback);
    downloadedUrls.set(url, true);
    const filename = urlToFilename(url);
    //promisified version of fs.readFile
    readFile(filename, 'utf8')
        .then()
        .catch();

    fs.readFile(filename, 'utf8', (err, body) => {
        if (err) return callback(err);
        download(url, filename, (err, body) => {
                err ?  callback(err) : spiderLinks(url, body, nesting, callback);
        });
    });
}

spider(process.argv[2], 1)
    .then(() => console.log('Download complete'))
    .catch(err => console.error(err));
