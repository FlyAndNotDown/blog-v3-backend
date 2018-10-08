/**
 * /model/define.js
 * @author John Kindem
 */

const Sequelize = require('sequelize');

/**
 * 获取 Post 模型
 * @param {Object} model 模型对象
 * @returns {Model|*|void} 文章模型
 */
function getPostModel(model) {
    return model.define('post', {
        id: {
            type: Sequelize.BIGINT,
            unique: true,
            autoIncrement: true
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
    });
}

/**
 * 获取标签模型
 * @param {Object} model 模型对象
 * @returns {Model|*|void} 标签模型
 */
function getLabelModel(model) {
    return model.define('label', {
        id: {
            type: Sequelize.BIGINT,
            unique: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING(20)
        }
    });
}

/**
 * 获取管理员模型
 * @param {Object} model 模型对象
 * @returns {Model|*|void} 管理员模型
 */
function getAdminModel(model) {
    return model.define('admin', {
        id: {
            type: Sequelize.BIGINT,
            unique: true,
            autoIncrement: true
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
    });
}

/**
 * 导出定义列表
 */
module.exports = {
    model: [
        getPostModel,
        getLabelModel,
        getAdminModel
    ],
    relation: []
};