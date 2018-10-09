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
            rdInterface.question('username: ', async username => {
                // 验证用户名
                if (!username.match(regexConfig.admin.username)) {
                    Log.error('创建管理员账户失败', '用户名不符合规范');
                    process.exit(0);
                }

                // 判断用户名在数据库中是否已经被使用过了
                let usernameCount = await models.admin.count({
                    username: username
                });
                // 如果已经被使用过了
                if (usernameCount > 0) {
                    Log.error('创建管理员账户失败', '管理员账户已经存在');
                    process.exit(0);
                }

                rdInterface.question('password: ', password => {
                    // 验证密码
                    if (!password.match(regexConfig.admin.password)) {
                        Log.error('创建管理员账户失败', '密码不符合规范');
                        process.exit(0);
                    }

                    rdInterface.question('repeat: ', repeat => {
                        // 验证重复密码
                        if (!repeat.match(regexConfig.admin.password)) {
                            Log.error('创建管理员账户失败', '密码不符合规范');
                            process.exit(0);
                        }
                        // 验证两次密码
                        if (password !== repeat) {
                            Log.error('创建管理员账户失败', '两次输入密码不一致');
                            process.exit(0);
                        }

                        rdInterface.question('your name: ', name => {
                            // 验证姓名
                            if (!name.match(regexConfig.admin.name)) {
                                Log.error('创建管理员账户失败', '姓名不符合规范');
                                process.exit(0);
                            }

                            rdInterface.question('your phone: ', async phone => {
                                // 验证手机号码
                                if (!phone.match(regexConfig.admin.phone)) {
                                    Log.error('创建管理员账户失败', '手机号不符合规范');
                                    process.exit(0);
                                }

                                // 获取加密用的盐
                                const salt = PwdTool.getSalt();

                                // 存入数据库
                                await models.admin.create({
                                    name: name,
                                    username: username,
                                    password: PwdTool.encode(password, salt),
                                    salt: salt,
                                    phone: phone
                                }).then(() => {
                                    Log.log('创建管理员账户成功');
                                    process.exit(0);
                                }).catch((error) => {
                                    Log.error('创建管理员账户失败', error);
                                    process.exit(0);
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