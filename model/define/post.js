/**
 * /model/define/post.js
 * @author John Kindem
 */

module.exports = {
    name: 'post',
    description: {
        title: { type: 'text', size: 50 },
        description: { type: 'text', size: 500 },
        body: { type: 'text' },
        date: { type: 'date' }
    }
};
