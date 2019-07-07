const HTTP_PORT = process.env.PORT || 3010;

const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

app.use(morgan("combined"));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

let data = [];

app.get("/api/ping", (req, res) =>
    res.sendStatus(200).json({"success": true}));

app.get("​/api/posts", (req, res) => {

});

app.use((req, res) => {
    res.status(404).end();
});

app.listen(HTTP_PORT);
