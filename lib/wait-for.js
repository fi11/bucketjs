var pendingBank = {};
var pendingCounter = {};
var invokeBank = {};

module._waitFor = function(key, deps, fn) {
    if (!deps) return fn();

    if (pendingCounter[key] === undefined)
        pendingCounter[key] = 0;

    invokeBank[key] = fn;

    [].concat(deps).forEach(function(item) {
        pendingCounter[key]++;
        (pendingBank[item] || (pendingBank[item] = {}))[key] = true;

        if (pendingBank[item][key] && pendingBank[key] && pendingBank[key][item]) {
            throw new Error('Circular dependency pair:', item, key);
        }
    });
};

module._resolve = function(key) {
    Object.keys(pendingBank[key] || {}).forEach(function(item) {
        --pendingCounter[item] || invokeBank[item]();
    }, this);
};
