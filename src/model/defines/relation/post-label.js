/**
 * /model/defines/relation/post-label.js
 * @author John Kindem
 */

/**
 * 导出标签文章关系定义
 */
export default {
    type: 'many2many',
    owner: ['post', 'label'],
    through: 'postlabel'
};