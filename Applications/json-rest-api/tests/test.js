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
            let sortedRequest = url + '?' + q.stringify({sortBy: ['id', 'reads', 'likes', 'popularity']});

            chai.request(app)
                .get(sortedRequest)
                .end((err, res) => {
                    res.should.have.status(200);

                    //get working version's response
                    //compare

                    done();
                });
        });
        it("filters by tags iteratively", done => {
            let taggedRequest = url + '?' + q.stringify({tags: ['tech', 'health']});
            chai.request(app)
                .get(taggedRequest)
                .end((err, res) => {
                    res.should.have.status(200);

                    //get working version's response
                    //compare

                    done();
                });
        });
        it("directs order", done => {
            let directedRequest = url + '?' + q.stringify({direction: 'asc'});
            chai.request(app)
                .get(directedRequest)
                .end((err, res) => {
                    res.should.have.status(200);

                    //get working version's response
                    //compare

                    done();
                });
        });
    }); // Query function
}); // Hatchways json-api
