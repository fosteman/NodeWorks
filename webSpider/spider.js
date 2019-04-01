/*This application is built with consequential asynchronous algorithms crawling over links on a page, using recursive iteration
* This practice showed how asynchronous APIs can be bent to my will,
* starting with plain JavaScript, which provided foundation for the analysis of more sophisticated techniques.
* async library defines solutions to most of async problems, in addition to offering a programming style for every taste
* I may now choose async to simplify the most common flows.
* */

const request = require('request');
const fs = require('fs');
const mkdirp = require('mkdirp');
const path = require('path');
const utilities = require('utility');
const TaskQueue = require('./TaskQueue');
const downloadedUrls = new Map();

const urlToFilename = (url) => url.split('/').pop();
const async = require('async');
const downloadQueue = async.queue(
    (taskData, callback) => spider(taskData.link, taskData.nesting - 1, callback),
    2);


function download(url, filename, callback) {
    console.log(`Downloading ${url}`);
    let body;
    async.series([
        callback => request(url, (err, response, resBody) => {
                if (err) return callback(err);
                body = resBody;
                callback();
        }),
        mkdirp.bind(null, path.dirname(filename)),
        callback => fs.writeFile(filename, body, callback),
    ], err => {
        if (err) return callback(err);
        console.log(`Downloaded and saved: ${url}`);
        callback(null, body);
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
    if(downloadedUrls.has(url)) return process.nextTick(callback);
    downloadedUrls.set(url, true);
    const filename = urlToFilename(url);
    fs.readFile(filename, 'utf8', (err, body) => {
        if (err) return callback(err);
        download(url, filename, (err, body) => {
                err ?  callback(err) : spiderLinks(url, body, nesting, callback);
        });
    });
}
spider(process.argv[2], (err, filename, downloaded) => {
    if(err) {
        console.log(err);
    } else if(downloaded){
        console.log(`Completed the download of "${filename}"`);
    } else {
        console.log(`"${filename}" was already downloaded`);
    }
});
