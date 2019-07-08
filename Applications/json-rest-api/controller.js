import axios from 'axios';
import l from 'winston';
import {map} from './helpers';
import q from 'query-string';
import _ from 'lodash';
const publicAPI = 'https://hatchways.io/api/assessment/blog/posts?tag=';

const getPosts = (req, res) => {
    //Empty query
    if (tags !== undefined && req.query.tags) return res.status(400).json({ error: "Tags parameter is required" });

    let direction = req.query.direction || "asc";
    let results = [];
    let promises = [];

    let {tags} = q.parse(req.query.tags, {arrayFormat: 'comma'});
    l.info(tags);
    tags.forEach(tag => promises.push(axios.get(publicAPI + tag).then(result => results.push(result))));
    l.info(results);
    axios.all(promises).then(() => {
        //map out duplicate posts
        results = map(results);
        l.info(results);
        //direction query
        if (
            req.query.direction !== undefined &&
            !["asc", "desc"].includes(req.query.direction)
        )
            res.status(400).json({ error: "direction parameter is invalid" });

        //sortBy query
        if (
            req.query.sortBy !== undefined &&
            !["id", "likes", "popularity", "reads"].includes(req.query.sortBy)
        )
            res.status(400).send({ error: "sortBy parameter is invalid" });

        else if (req.query.sortBy !== undefined)
            results = _.orderBy(results[0].posts, req.query.sortBy, req.query.direction);

        l.info(results);
        //finally
        res.json(results);
    });
};




module.exports = {
    getPosts
};
