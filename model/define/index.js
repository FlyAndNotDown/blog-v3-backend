/**
 * /model/define/index.js
 * @author John Kindem
 */

const post = require('./post');

let modelDefineArray = [];

(function() {
    modelDefineArray.push(post);
})();

module.exports = modelDefineArray;
