/**
 * /model/define/model/emotion
 * @author John Kindem
 * @description 说说模型定义
 * @version v1.0
 */

import Sequelize from 'sequelize';

/**
 * 说说模型定义
 */
export default {
    name: 'emotion',
    description: {
        id: {
            type: Sequelize.BIGINT,
            unique: true,
            autoIncrement: true,
            primaryKey: true
        },
        content: {
            type: Sequelize.STRING(200)
        }
    }
};
