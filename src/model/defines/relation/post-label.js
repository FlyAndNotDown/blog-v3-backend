/**
 * /model/defines/relation/post-label.js
 * @author John Kindem
 */

/**
 * 导出标签文章关系定义
 */
module.exports = {
    type: 'm2m',
    owner: ['post', 'label']
};