/**
 * /model/relation/index.js
 * @author John Kindem
 */

const postLabel = require('./post-label');

let modelRelationArray = [];

(function() {
    modelRelationArray.push(postLabel);
})();

/**
 * 模型关系定义数组
 */
module.exports = modelRelationArray;
