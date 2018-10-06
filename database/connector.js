/**
 * /database/connector.js
 * @author John Kindem
 */

const orm = require('orm');
const databaseConfig = require('../config/database');
const Log = require('../tool/log');

const connectionConfig = databaseConfig.connection;

/**
 * 连接器类
 * @constructor
 */
class Connector {

    /**
     * 获取单例
     * @returns {Object} 连接器单例
     */
    static getInstance() {
        if (!Connector.__instance) {
            Connector.__instance = new Connector();
        }
        return Connector.__instance;
    }

    /**
     * 构造
     */
    constructor() {
        // 创建新连接
        this.__connection = orm.connect(
            `${connectionConfig.driver}://${connectionConfig.username}:${connectionConfig.password}@${connectionConfig.url}/${connectionConfig.database}`
        );
        this.__connection.on('connect', (err) => {
            if (err) {
                return Log.error('无法连接到数据库', err);
            }
            return Log.log('成功连接到数据库');
        });
    }

    /**
     * 获取建立的连接
     * @return {object} 连接对象
     */
    getConnection() {
        return this.__connection;
    }

}

module.exports = Connector;
