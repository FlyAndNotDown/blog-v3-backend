/**
 * /script.js
 * @author John Kindem
 */

const config = require('./config');
const Sequelize = require('sequelize');
const Log = require('./tool/log');

const modelConfig = config.model;
const connectionConfig = modelConfig.connection;

/**
 * 对应脚本输入的处理函数
 */
const funcMap = {
    /**
     * 数据库操作
     */
    db: {
        /**
         * 测试数据库连接
         */
        test: function () {
            Log.log('测试服务器连接');
            const model = new Sequelize(
                connectionConfig.database,
                connectionConfig.username,
                connectionConfig.password,
                connectionConfig.options
            );
            model
                .authenticate()
                .then(() => {
                    Log.log('连接成功');
                })
                .catch((error) => {
                    Log.error('连接失败', error);
                });
        }
    }
};

/**
 * 脚本
 */
(function () {

    const argv = process.argv;
    let temp = funcMap;
    argv.forEach((words, key) => {
        if (key > 1) {
            temp = temp[words] || null;
            if (!temp) {
                Log.error('参数读取错误');
            }
        }
    });
    if (typeof temp === 'function') {
        temp();
    }

}());