/**
 * /script.js
 * @author John Kindem
 */

import modelConfig from './configs/model';
import Sequelize from 'sequelize';
import { Log } from "./tool/log";
import { ModelLoader } from "./model/loader";

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
            Log.log('开始测试数据库连接');
            const db = new Sequelize(
                connectionConfig.database,
                connectionConfig.username,
                connectionConfig.password,
                connectionConfig.options
            );
            db
                .authenticate()
                .then(() => {
                    Log.log('连接成功');
                    process.exit(0);
                })
                .catch((error) => {
                    Log.error('连接失败', error);
                    process.exit(0);
                });
        },
        /**
         * 初始化数据库
         */
        init: function () {
            Log.log('连接到数据库');
            const db = new Sequelize(
                connectionConfig.database,
                connectionConfig.username,
                connectionConfig.password,
                connectionConfig.options
            );
            // 加载模型配置
            let models = new ModelLoader(db).getModels();
            let count = 0;
            let length = Object.getOwnPropertyNames(models).length;
            for (let modelKey in models) {
                if (models.hasOwnProperty(modelKey)) {
                    models[modelKey].sync({
                        force: true
                    }).then(() => {
                        Log.log(`同步${modelKey}成功`);
                        if (++count === length) process.exit(0);
                    }).catch((error) => {
                        Log.error(`同步${modelKey}失败`, error);
                    });
                }
            }
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