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
export default {
    map,
    merge,
    mergeSort
}

