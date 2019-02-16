/**
 * /model/define.js
 * @author John Kindem
 */

import postModel from './defines/model/post';
import labelModel from './defines/model/label';
import adminModel from './defines/model/admin';
import userModel from './defines/model/user';
import commentModel from './defines/model/comment';
import messageModel from './defines/model/message';
import friendModel from './defines/model/friend';
import postLabelRelation from './defines/relation/post-label';
import postCommentRelation from './defines/relation/post-comment';
import messageUserRelation from './defines/relation/message-user';
import commentUserCreatorRelation from './defines/relation/comment-user-creator';
import commentUserMentionRelation from './defines/relation/comment-user-mention';

/**
 * 导出定义对象
 */
export default {
    model: [
        postModel,
        labelModel,
        adminModel,
        userModel,
        commentModel,
        messageModel,
        friendModel
    ],
    relation: [
        postLabelRelation,
        postCommentRelation,
        commentUserCreatorRelation,
        commentUserMentionRelation,
        messageUserRelation
    ]
};
