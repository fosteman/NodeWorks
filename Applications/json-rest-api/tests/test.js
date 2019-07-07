import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server';
import q from 'query-string';

chai.use(chaiHttp);
chai.should();

const url = '/api/posts';

describe("Hatchways json-api", () => {

    describe("Error Responses", () => {
        it("responds 400 for missing tags", done => {
            chai.request(app)
                .get(url)
                .end((err, res) => {
                    res.should.have.status(400);

                    res.body.should.strictEqual({"error": "Tags parameter is required"}, '');

                    done();
                });
        });
        it("responds 400 for invalid sortBy", done => {
            let invalidRequest = url + '?' + q.stringify({sortBy: ['TYPO', 'reads', 'likess', 'popuLarity']});
            chai.request(app)
                .get(invalidRequest)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.strictEqual({"error": "sortBy parameter is invalid"}, '');
                    done();
                });
        });
        it("responds 404 for wrong url", done => {
            chai.request(app)
                .get(url + '/typo')
                .end((err, res) => {
                    res.should.have.status(404);
                    done();
                });
        });
    }); //Error Responses

    describe("Query functions", () => {
        it("sorts posts by acceptable fields", done => {
            let sort = q.stringify({sortBy: ['id', 'reads', 'likes', 'popularity']});
            let sortedRequest = url + '?' + sort;

            fetch('https://hatchways.io/api/assessment/solution/posts?' + sort)
                .then(res => res.json())
                .then(correct => chai.request(app)
                    .get(sortedRequest)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.strictEqual(correct);
                        done();
                    }));
        });
        it("filters by tags iteratively", done => {
            let tags = q.stringify({tags: ['tech', 'health']});
            let taggedRequest = url + '?' + tags;

            fetch('https://hatchways.io/api/assessment/solution/posts?' + tags)
                .then(res => res.json())
                .then(correct => chai.request(app)
                    .get(taggedRequest)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.strictEqual(correct);
                        done();
                    })
                );
        });
        it("directs order", done => {
            let direction = q.stringify({direction: 'asc'});
            let directedRequest = url + '?' + direction;

            fetch('https://hatchways.io/api/assessment/solution/posts?' + direction)
                .then(res => res.json())
                .then(correct => chai.request(app)
                    .get(directedRequest)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.strictEqual(correct);
                        done();
                    })
                );
        });
    }); // Query function
}); // Hatchways json-api
