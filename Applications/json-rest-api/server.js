import express from "express"
import morgan from "morgan"
import bodyParser from "body-parser"
import cors  from "cors"
import apicache  from 'apicache'
import getPosts from './controller.js'

const HTTP_PORT = process.env.PORT || 3010;
const app = express();
//Caching
const cache = apicache.middleware;
//Logging
app.use(morgan("combined"));
//CORS
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/api/ping', (req, res) => res.status(200).json({"success": true}));

app.get('/api/posts',cache('30 minutes'), getPosts);


app.listen(HTTP_PORT);

export default app
