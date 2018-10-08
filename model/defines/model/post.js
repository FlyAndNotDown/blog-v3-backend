/**
 * /model/defines/model/post.js
 * @author John Kindem
 */

const Sequelize = require('sequelize');

/**
 * 导出文章模型定义
 */
module.exports = {
    name: 'post',
    description: {
        id: {
            type: Sequelize.BIGINT,
            unique: true,
            autoIncrement: true,
            primaryKey: true
        },
        title: {
            type: Sequelize.STRING(100)
        },
        description: {
            type: Sequelize.STRING(1000)
        },
        body: {
            type: Sequelize.STRING(1000)
        },
        date: {
            type: Sequelize.DATEONLY
        }
    }
};