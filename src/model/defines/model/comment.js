/**
 * /model/defines/model/comment.js
 * @author John Kindem
 * @description source file for comment model define
 * @version v1.0
 */

import Sequelize from 'sequelize';

/**
 * comment model define
 */
export default {
    name: 'comment',
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
        level: {
            type: Sequelize.SMALLINT
        },
        parent: {
            type: Sequelize.BIGINT
        }
    }
};