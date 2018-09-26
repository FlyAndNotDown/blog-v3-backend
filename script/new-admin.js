/**
 * /script/new-admin.js
 * @author John Kindem
 */

const Connector = require('../database/connector');
const Model = require('../model/model');
const Log = require('../tool/log');
const readline = require('readline');

(function() {
    let connection = Connector.getInstance().getConnection();
    let model = new Model(connection).getModel();
    const readlineInterface = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    setTimeout(() => {
        readlineInterface.question('username: ', (username) => {
            readlineInterface.question('password: ', (password) => {
                readlineInterface.question('repeat password: ', (passwordRepeat) => {
                    if (password !== passwordRepeat) {
                        Log.error('创建管理员账户失败', '两次输入的密码不相同');
                        process.exit(0);
                    } else {
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
                    }
                });
            });
        });
    }, 1000);
})();
