/**
 * /model/defines/model/label.js
 * @author John Kindem
 */

const Sequelize = require('sequelize');

/**
 * 导出标签模型定义
 */
module.exports = {
    name: 'label',
    description: {
        id: {
            type: Sequelize.BIGINT,
            unique: true,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING(20)
        }
    }
};