var fs = require('fs');
var path = require('path');

exports.src = fs.readFileSync(path.join(__dirname, 'dist/bucket.min.js')).toString();

exports.require = function(resource, options, fn) {
    return "bucket.require('" +
        resource + "'," + JSON.stringify(options) + ","
        + (fn ? fn.toString() : 'undefined') +
        ");";
};
