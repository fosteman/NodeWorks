//An example of implementation of WeakMap() into a namespace
//in order to hide internal values of an object.
//interanally namespaced WeakMap manages objects of type Point.

let map = new WeakMap();

let internal = function (object) {
    if (!map.has(object))
        map.set(object, {});
    return map.get(object);
}

function Point(x, y) {
    internal(this).x = x;
    internal(this).y = y;
}

Point.prototype.getX = function () {
    return internal(this).x;
};

Point.prototype.setX = function (x) {
    internal(this).x = x;
};

Point.prototype.getY = function () {
    return internal(this).y;
};

Point.prototype.setY = function (y) {
    internal(this).y = y;
};