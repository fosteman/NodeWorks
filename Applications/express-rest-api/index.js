const HTTP_PORT = process.env.PORT || 3001;

const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

// Use Standard Apache combined log output, https://www.npmjs.com/package/morgan#combined
// :remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"
app.use(morgan("combined"));
app.use(bodyParser.json());
app.use(cors());

let data = [];

app.get("/data", (req,res) => {
        res.json(data);
});
app.use((req, res) => {
        res.status(404).end();
});

app.listen(HTTP_PORT);
