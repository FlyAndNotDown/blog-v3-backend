/**
 * /model/define/index.js
 * @author John Kindem
 */

const post = require('./post');
const label = require('./label');

let modelDefineArray = [];

(function() {
    modelDefineArray.push(post);
    modelDefineArray.push(label);
})();

module.exports = modelDefineArray;
