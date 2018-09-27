/**
 * /script/new-admin.js
 * @author John Kindem
 */

const Connector = require('../database/connector');
const Model = require('../model/model');
const Log = require('../tool/log');
const readline = require('readline');
const scriptConfig = require('../config/script');

(function() {
    let connection = Connector.getInstance().getConnection();
    let model = new Model(connection).getModel();
    const readlineInterface = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    setTimeout(() => {
        readlineInterface.question('username: ', (username) => {
            if (!username.match(scriptConfig.adminRegex.username)) {
                Log.error('创建管理员账户失败', '用户名不符合规格');
                process.exit(0);
            }
            // 查看数据库中是否有重复的管理员账户
            model.admin.count({ username: username }, (err, count) => {
                if (err) {
                    Log.error('创建管理员账户失败', err);
                    process.exit(0);
                }
                if (count > 0) {
                    Log.error('创建管理员账户失败', '管理员账户已经存在');
                    process.exit(0);
                }
                readlineInterface.question('password: ', (password) => {
                    if (!password.match(scriptConfig.adminRegex.password)) {
                        Log.error('创建管理员账户失败', '密码不符合规格');
                        process.exit(0);
                    }
                    readlineInterface.question('repeat password: ', (passwordRepeat) => {
                        if (password !== passwordRepeat) {
                            Log.error('创建管理员账户失败', '两次输入的密码不相同');
                            process.exit(0);
                        }
                        let salt = PasswordTool.getSalt();
                        model.admin.create({
                            username: username,
                            password: PasswordTool.encode(password, salt),
                            salt: salt
                        }, (err) => {
                            if (err) {
                                Log.error('创建管理员账户失败', err);
                                process.exit(0);
                            }
                            Log.log('创建管理员账户成功');
                            process.exit(0);
                        });
                    });
                });
            });
        });
    }, 1000);
})();
