const orm = require('orm');
const config = require('../config');
const dbConfig = config.database;

// 连接单例类
class Connection {

    /**
     * 获取单例
     * @return 连接实例
     */
    static getInstance() {

        // 单例模式
        if (!Connection.__instance) {
            Connection.__instance = new Connection();
        }
        return Connection.__instance;

    }

    /**
     * 构造
     */
    constructor() {

        // 创建连接
        this.__connection = orm.connect(
            `${dbConfig.driver}://${dbConfig.username}:${dbConfig.password}@${dbConfig.url}/${dbConfig.database}`
        );
        // 连接回调
        this.__connection.on('connect', (err) => {

            // 如果连接失败
            if (err) {
                // 删除实例
                Connection.__instance = null;
                // 控制台打印错误
                console.log('[error] Fail to connect to database');
            }

            console.log('[log] Connected to database');

        });

    }

    /**
     * 获取连接
     * @return 数据库连接对象
     */
    getConnection() {

        // 返回连接
        return this.__connection;

    }

}

module.exports = Connection;
