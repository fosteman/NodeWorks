const HTTP_PORT = process.env.PORT || 3010;
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const apicache = require('apicache');
const { getTags, sortPosts } = require('./controller.js');

//Caching
const cache = apicache.middleware;
//Logging
app.use(morgan("combined"));
//CORS
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.get('/api/ping', (req, res) =>
    res.sendStatus(200).json({"success": true}));

app.get('/api/posts',cache('30 minutes'), getTags);

app.get('/api/posts/sortBy',cache('30 minutes'), sortPosts);

//app.use((req, res) => res.status(404).end());

app.listen(HTTP_PORT);
