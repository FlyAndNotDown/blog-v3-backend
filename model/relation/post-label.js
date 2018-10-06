/**
 * /model/relation/post-label.js
 * @author John Kindem
 */

/**
 * Model - Post 多对多关系
 */
module.exports = {
    type: 'm2m',
    ownner: 'post',
    with: 'label',
    name: 'labels'
};
