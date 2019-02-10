/**
 * /model/defines/model/message.js
 * @author John Kindem
 * @description source file for message model define
 * @version v1.0
 */

import Sequelize from 'sequelize';

/**
 * message model define
 */
export default {
    name: 'message',
    description: {
        id: {
            type: Sequelize.BIGINT,
            unique: true,
            autoIncrement: true,
            primaryKey: true
        },
        body: {
            type: Sequelize.STRING(500)
        },
        reply: {
            type: Sequelize.STRING(500)
        }
    }
};