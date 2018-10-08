/**
 * /model/define.js
 * @author John Kindem
 */

const Sequelize = require('sequelize');

/**
 * 文章模型定义
 */
const postModel = {
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
};

/**
 * 标签模型定义
 */
const labelModel = {
    id: {
        type: Sequelize.BIGINT,
        unique: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING(20)
    }
};

/**
 * 管理员模型定义
 */
const adminModel = {
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
};

/**
 * 文章标签关系定义
 */
const postLabelRelation = {
    type: 'm2m',
    owner: ['post', 'label']
};

/**
 * 导出定义列表
 */
module.exports = {
    model: [
        postModel,
        labelModel,
        adminModel
    ],
    relation: [
        postLabelRelation
    ]
};