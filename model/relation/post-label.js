/**
 * /model/relation/post-label.js
 * @author John Kindem
 */

module.exports = {
    type: 'm2m',
    ownner: 'post',
    with: 'label',
    name: 'labels'
};
