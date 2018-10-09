/**
 * /model/define.js
 * @author John Kindem
 */

import postModel from './defines/model/post';
import labelModel from './defines/model/label';
import adminModel from './defines/model/admin';
import postLabelRelation from './defines/relation/post-label';

/**
 * 导出定义对象
 */
export default {
    model: [
        postModel,
        labelModel,
        adminModel
    ],
    relation: [
        postLabelRelation
    ]
};