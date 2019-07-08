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
export default map

