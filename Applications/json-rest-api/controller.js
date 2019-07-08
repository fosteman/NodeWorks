const axios = require('axios');
const l = require('winston');
const map = data => {
    // Mapping to remove duplicates
    let post = {};
    let posts = [];
    for (let i = 0; i < data.length; i++) {
        let blog = data[i];
        for (let i = 0; i < blog.length; i++) {
            post[blog[i].id] = blog[i];
        }
    }
    // Response object
    for (let key in post) posts.push(post[key]);
    return posts;
};
const merge = (arr1, arr2) => {
    let result = [];
    var i = 0;
    var j = 0;
    while(i < arr1.length && j < arr2.length) {
        if (arr2[j].likes < arr1[i].likes) {
            result.push(arr1[i]);
            i++;
        } else {
            result.push(arr2[j]);
            j++;
        }
    }
    while(i < arr1.length) {
        result.push(arr1[i]);
        i++
    }
    while(j < arr2.length) {
        result.push(arr2[j]);
        j++
    }
    return result;
};
const mergeSort = (arr) => {
    if (arr.length <= 1) return arr;

    let mid = Math.floor(arr.length / 2);
    let left = mergeSort(arr.slice(0, mid));
    let right = mergeSort(arr.slice(mid));
    return merge(left, right);
};


const getTags = (req, res) => {
    l.info('getTags');
    axios.all([
        axios.get('http://hatchways.io/api/assessment/blog/posts?tag=tech'),
        axios.get('http://hatchways.io/api/assessment/blog/posts?tag=history'),
        axios.get('http://hatchways.io/api/assessment/blog/posts?tag=health'),
        axios.get('http://hatchways.io/api/assessment/blog/posts?tag=startups'),
        axios.get('http://hatchways.io/api/assessment/blog/posts?tag=science'),
        axios.get('http://hatchways.io/api/assessment/blog/posts?tag=design'),
        axios.get('http://hatchways.io/api/assessment/blog/posts?tag=culture'),
        axios.get('http://hatchways.io/api/assessment/blog/posts?tag=politics'),
        axios.get('http://hatchways.io/api/assessment/blog/posts?tag=science')
    ])
        .then(axios.spread((response1, response2, response3, response4, response5, response6, response7, response8, response9) => {
            let data = [
                response1.data.posts,
                response2.data.posts,
                response3.data.posts,
                response4.data.posts,
                response5.data.posts,
                response6.data.posts,
                response7.data.posts,
                response8.data.posts,
                response9.data.posts
            ];
            res.status(200).send(map(data));
        }))
        .catch(error => res.sendStatus(400).send({error: 'Tags parameter is required'}));
};

const sortPosts = (req, res) => {
    axios.all([
        axios.get('http://hatchways.io/api/assessment/blog/posts?tag=tech'),
        axios.get('http://hatchways.io/api/assessment/blog/posts?tag=history')
    ])
        .then(axios.spread((response1, response2) => {
            let data = [
                response1.data.posts,
                response2.data.posts
            ];
            res.status(200).send({posts: mergeSort(map(data))});
        }))
        .catch(error => res.sendStatus(400).send({error: 'sortBy parameter is invalid'}));
};

module.exports = {
    getTags,
    sortPosts,
};
