/**
 * /model/defines/relation/comment-user-creator.js
 * @author John Kindem
 * @description source file for comment - user - creator model relation define
 * @version v1.0
 */

/**
 * epxort message - user model relation define
 */
export default {
    type: 'many2many',
    owner: ['message', 'user'],
    through: 'messageCreator'
};