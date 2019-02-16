/**
 * /model/defines/model/friend.js
 * @author John Kindem
 * @description source file for firent model define
 * @version v1.0
 */

import Sequelize from 'sequelize';

/**
 * friend model define
 */
export default {
    name: 'friend',
    description: {
        id: {
            type: Sequelize.BIGINT,
            unique: true,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING(100)
        },
        to: {
            type: Sequelize.STRING(500)
        }
    }
};