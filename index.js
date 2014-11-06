var fs = require('fs');

exports.src = fs.readFileSync('./dist/bucket.min.js').toString();

exports.require = function(resource, options, fn) {
    return "bucket.require('" +
        resource + "', " + JSON.stringify(options) + ", "
        + (fn ? fn.toString() : 'undefined') +
        ");";
};
