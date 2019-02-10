/**
 * /model/defines/relation/post-comment.js
 * @author John Kindem
 * @description source file for post - comment model relation define
 * @version v1.0
 */

/**
 * export post - comment relation
 */
export default {
    type: 'one2many',
    owner: 'post',
    to: 'comment',
    as: 'comments'
};