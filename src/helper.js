/**
 * /script.js
 * @author John Kindem
 */

import modelConfig from './configs/model';
import Sequelize from 'sequelize';
import { Log } from "./tool/log";
import { ModelLoader } from "./model/loader";
import readline from 'readline';
import regexConfig from "./configs/regex";
import { PwdTool } from "./tool/pwd";

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
        test: () => {
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
        init: () => {
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
    },
    /**
     * 管理员操作
     */
    admin: {
        /**
         * 新建管理员账户
         */
        new: () => {
            Log.log('连接到数据库');
            const db = new Sequelize(
                connectionConfig.database,
                connectionConfig.username,
                connectionConfig.password,
                connectionConfig.options
            );

            // 加载模型配置
            let models = new ModelLoader(db).getModels();

            // 创建 readlineInterface
            let rdInterface = readline.createInterface({
                input: process.stdin,
                output: process.stdout
            });

            // 询问用户用户名
            rdInterface.question('username: ', username => {
                rdInterface.question('password: ', password => {
                    rdInterface.question('repeat: ', repeat => {
                        rdInterface.question('your name: ', name => {
                            rdInterface.question('your phone: ', phone => {
                                // 验证用户名
                                if (!username.match(regexConfig.admin.username)) {
                                    Log.error('创建管理员账户失败', '用户名不符合规范');
                                    process.exit(0);
                                }

                                // 验证密码
                                if (!password.match(regexConfig.admin.password)) {
                                    Log.error('创建管理员账户失败', '密码不符合规范');
                                    process.exit(0);
                                }
                                if (password !== repeat) {
                                    Log.error('创建管理员账户失败', '两次输入密码不一致');
                                    process.exit(0);
                                }

                                // 验证姓名
                                if (!name.match(regexConfig.admin.name)) {
                                    Log.error('创建管理员账户失败', '姓名不符合规范');
                                    process.exit(0);
                                }

                                // 验证手机号码
                                if (!phone.match(regexConfig.admin.phone)) {
                                    Log.error('创建管理员账户失败', '手机号不符合规范');
                                    process.exit(0);
                                }

                                const salt = PwdTool.getSalt();

                                // 存入数据库
                                models.admin.create({
                                    name: name,
                                    username: username,
                                    password: PwdTool.encode(password, salt),
                                    salt: salt,
                                    phone: phone
                                }).then((result) => {
                                    console.log(result);
                                });
                            });
                        });
                    });
                });
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