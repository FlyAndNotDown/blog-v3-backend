/**
 * /model/defines/model/user.js
 * @author John Kindem
 * @description model description file of 'user'
 * @version v1.0
 */

import Sequelize from 'sequelize';

/**
 * model define of 'user'
 */
export default {
    name: 'user',
    description: {
        id: {
            type: Sequelize.BIGINT,
            unique: true,
            autoIncrement: true,
            primaryKey: true
        },
        type: {
            type: Sequelize.STRING(10)
        },
        key: {
            type: Sequelize.STRING(100)
        },
        nickname: {
            type: Sequelize.STRING(100)
        },
        avatar: {
            type: Sequelize.STRING(200)
        },
        email: {
            type: Sequelize.STRING(50)
        },
        password: {
            type: Sequelize.STRING(64)
        },
        salt: {
            type: Sequelize.STRING(12)
        }
    }
};
