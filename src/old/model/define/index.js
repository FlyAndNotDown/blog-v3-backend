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


/**
 * 模型定义数组
 */
module.exports = modelDefineArray;
