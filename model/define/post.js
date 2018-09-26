/**
 * /model/define/post.js
 * @author John Kindem
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
