/**
 * /model/define/index.js
 * @author John Kindem
 */

const post = require('./post');
const label = require('./label');
const admin = require('./admin');

let modelDefineArray = [];

(function() {
    modelDefineArray.push(post);
    modelDefineArray.push(label);
    modelDefineArray.push(admin);
})();

module.exports = modelDefineArray;
