/**
 * /model/defines/relation/comment-user-mention.js
 * @author John Kindem
 * @description source file for comment - user - mention model relation define
 * @version v1.0
 */

 /**
  * epxort comment - user model relation define
  */
export default {
    type: 'many2many',
    owner: ['comment', 'user'],
    through: 'commentMention'
};