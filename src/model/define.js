/**
 * /model/define.js
 * @author John Kindem
 */

const postModel = require('./defines/model/post');
const labelModel = require('./defines/model/label');
const adminModel = require('./defines/model/admin');
const postLabelRelation = require('./defines/relation/post-label');

/**
 * 导出定义对象
 */
module.exports = {
    model: [
        postModel,
        labelModel,
        adminModel
    ],
    relation: [
        postLabelRelation
    ]
};