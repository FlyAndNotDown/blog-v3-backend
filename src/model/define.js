/**
 * /model/define.js
 * @author John Kindem
 */

import postModel from './defines/model/post';
import labelModel from './defines/model/label';
import adminModel from './defines/model/admin';
import settingModel from './defines/model/setting';
import userModel from './defines/model/user';
import commentModel from './defines/model/comment';
import postLabelRelation from './defines/relation/post-label';
import postCommentRelation from './defines/relation/post-comment';
import commentUserRelation from './defines/relation/comment-user';

/**
 * 导出定义对象
 */
export default {
    model: [
        postModel,
        labelModel,
        adminModel,
        settingModel,
        userModel,
        commentModel
    ],
    relation: [
        postLabelRelation,
        postCommentRelation,
        commentUserRelation
    ]
};
