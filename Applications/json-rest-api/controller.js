import axios from 'axios'
import l from './winston'
import map from './helpers'
import q from 'query-string'
import _ from 'lodash'
const publicAPI = 'https://hatchways.io/api/assessment/blog/posts?tag=';

export default function getPosts(req, res) {
    //Empty query
    if (req.query.tags === undefined || req.query.tags.length < 1) return res.status(400).json({ error: "Tags parameter is required" });

    let direction = req.query.direction || "asc";
    let results = [];
    let promises = [];

    let tags = req.query.tags;
    l.info('query tags: %o', tags);

    tags && _.forEach(tags, tag => promises.push(axios.get(publicAPI + tag).then(result => results.push(result))));
    l.info('Results: %o', results);
    axios.all(promises).then(() => {
        //map out duplicate posts
        results = map(results);
        l.info('%o', results);
        //direction query
        if (
            req.query.direction !== undefined &&
            !["asc", "desc"].includes(req.query.direction)
        )
            return res.status(400).json({ error: "direction parameter is invalid" });

        //sortBy query
        if (
            req.query.sortBy !== undefined &&
            !["id", "likes", "popularity", "reads"].includes(req.query.sortBy)
        )
            return res.status(400).send({ error: "sortBy parameter is invalid" });

        else if (req.query.sortBy !== undefined)
            results = _.orderBy(results[0].posts, req.query.sortBy, req.query.direction);

        l.info(results);
        //finally
        res.json(results);
    });
};
