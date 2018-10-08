/**
 * /model/define/post.js
 * @author John Kindem
 */

/**
 * Post 模型定义
 */
module.exports = {
    name: 'post',
    description: {
        id: { type: 'serial' },
        title: { type: 'text', size: 100 },
        description: { type: 'text', size: 1000 },
        body: { type: 'text' },
        date: { type: 'date' }
    }
};
