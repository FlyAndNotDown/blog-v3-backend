/**
 * /model/defines/model/admin
 * @author John Kindem
 */

const Sequelize = require('sequelize');

/**
 * 管理员模型定义
 */
module.exports = {
    name: 'admin',
    description: {
        id: {
            type: Sequelize.BIGINT,
            unique: true,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING(20)
        },
        username: {
            type: Sequelize.STRING(20)
        },
        password: {
            type: Sequelize.STRING(64)
        },
        salt: {
            type: Sequelize.STRING(12)
        },
        phone: {
            type: Sequelize.STRING(11)
        }
    }
};