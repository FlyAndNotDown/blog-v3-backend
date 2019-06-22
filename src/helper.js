/**
 * /script.js
 * @author John Kindem
 */

import modelConfig from './configs/model';
import syncConfig from './configs/sync';
import Sequelize from 'sequelize';
import { Log } from "./tool/log";
import { ModelLoader } from "./model/loader";
import readline from 'readline';
import regexConfig from "./configs/regex";
import mailConfig from './configs/mail';
import { PwdTool } from "./tool/pwd";
import nodeMailer from 'nodemailer';
import { exec } from 'child_process';
import { writeFileSync, existsSync, readFileSync, readdirSync } from 'fs';

const connectionConfig = modelConfig.connection;
const mailConnection = mailConfig.connection;
const mailTestSend = mailConfig.testSend;

function getPostMetaInfoByLine(line) {
    const tokens = line.split(' ');
    let result = '';
    tokens.forEach((token, index) => {
        if (index > 0) {
            result += index === tokens.length - 1 ? token : `${token} `;
        }
    });
    return result;
}

function getPostNames() {
    let files = readdirSync();

    // TODO
}

let syncFunc = async (force) => {
    Log.log('connecting to database');
    const db = new Sequelize(
        connectionConfig.database,
        connectionConfig.username,
        connectionConfig.password,
        connectionConfig.options
    );

    // load models
    new ModelLoader(db).getModels();
    try {
        await db.sync({ force: force });
    } catch(e) {
        Log.error(`sync failed`, e);
    }
    Log.log(`sync ok`);
    process.exit(0);
};

let cmdDbTest = () => {
    Log.log('start testing connection of database');
    const db = new Sequelize(
        connectionConfig.database,
        connectionConfig.username,
        connectionConfig.password,
        connectionConfig.options
    );
    db
        .authenticate()
        .then(() => {
            Log.log('connection is usable');
            process.exit(0);
        })
        .catch((error) => {
            Log.error('can\'t connected to database', error);
            process.exit(0);
        });
};

let cmdDbSync = () => {
    syncFunc(false);
};

let cmdDbForceSync = () => {
    syncFunc(true);
};

let cmdAdminNew = () => {
    Log.log('connection to database');
    const db = new Sequelize(
        connectionConfig.database,
        connectionConfig.username,
        connectionConfig.password,
        connectionConfig.options
    );

    // load models
    let models = new ModelLoader(db).getModels();

    // create readline interface
    let rdInterface = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    // ask user for username
    rdInterface.question('username: ', async username => {
        // check the username
        if (!username.match(regexConfig.admin.username)) {
            Log.error('create admin account failed', 'username is not meet the requirement');
            process.exit(0);
        }

        // judge if the username have exist in database
        let usernameCount = await models.admin.count({
            username: username
        });
        // if it have been used
        if (usernameCount > 0) {
            Log.error(
                'create admin account failed',
                'the username have exist in database, please chose another username and try again'
            );
            process.exit(0);
        }

        // ask username for password
        rdInterface.question('password: ', password => {
            // check the password
            if (!password.match(regexConfig.admin.password)) {
                Log.error('create admin account failed', 'password is not meet the requirement');
                process.exit(0);
            }

            // ask user for password repeat
            rdInterface.question('repeat: ', repeat => {
                // check the password repeat
                if (!repeat.match(regexConfig.admin.password)) {
                    Log.error('create admin account failed', 'password is not meet the requirement');
                    process.exit(0);
                }
                // check passwords which input in second times is equal
                if (password !== repeat) {
                    Log.error('create admin account failed', 'passwords is not equal');
                    process.exit(0);
                }

                // ask user for name
                rdInterface.question('your name: ', name => {
                    // check the name
                    if (!name.match(regexConfig.admin.name)) {
                        Log.error('create admin account failed', 'name is not meet the requirement');
                        process.exit(0);
                    }

                    // ask user for phone number
                    rdInterface.question('your phone: ', async phone => {
                        // check the phone number
                        if (!phone.match(regexConfig.admin.phone)) {
                            Log.error('create admin account failed', 'phone number it not meet the requirement');
                            process.exit(0);
                        }

                        // get salt for encode
                        const salt = PwdTool.getSalt();

                        // save all the thing to database
                        await models.admin.create({
                            name: name,
                            username: username,
                            password: PwdTool.encode(password, salt),
                            salt: salt,
                            phone: phone
                        }).then(() => {
                            Log.log('create admin account success');
                            process.exit(0);
                        }).catch((error) => {
                            Log.error('create admin account failed', error);
                            process.exit(0);
                        });
                    });
                });
            });
        });
    });
};

let cmdAdminLogin = () => {
    const db = new Sequelize(
        connectionConfig.database,
        connectionConfig.username,
        connectionConfig.password,
        connectionConfig.options
    );
    let models = new ModelLoader(db).getModels();
    let rdInterface = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rdInterface.question('username: ', async username => {
        if (!username.match(regexConfig.admin.username)) {
            Log.error('login failed', 'incorrect username format');
            return process.exit(0);
        }
        rdInterface.question('password: ', async password => {
            if (!password.match(regexConfig.admin.password)) {
                Log.error('login failed', 'incorrect password format');
                return process.exit(0);
            }

            let admin = null;
            try {
                admin = await models.admin.findOne({
                    where: {
                        username: username
                    }
                });
            } catch (e) {
                Log.error('server error', e);
                return process.exit(0);
            }

            if (!admin) {
                Log.error('login failed', 'user is not exist');
                return process.exit(0);
            }

            let salt = admin.salt;
            let passwordHash = PwdTool.encode(password, salt);

            if (passwordHash === admin.password) {
                let token = PwdTool.getToken();
                try {
                    admin.token = token;
                    await admin.save();
                } catch (e) {
                    return Log.error('server error', e);
                }
                Log.log('login success', `here is your login token: ${token}`);
            } else {
                Log.error('login failed', 'password is incorrect');
            }
            process.exit(0);
        });
    });
};

let cmdMailTestConnection = () => {
    let transport = nodeMailer.createTransport(mailConnection);
    transport.verify((error) => {
        if (error) {
            Log.log('SMTP service seem not work', error);
        } else {
            Log.log('SMTP service worked');
        }
        transport.close();
        process.exit(0);
    });
};

let cmdMailTestSend = () => {
    let transport = nodeMailer.createTransport(mailConnection);
    transport.sendMail(mailTestSend, (err) => {
        if (err) {
            Log.error('test mail sent failed');
        } else {
            Log.log('test mail sent and success');
        }
        transport.close();
        process.exit(0);
    });
};

let cmdAdminRepoClone = () => {
    const command = `git clone ${syncConfig.blogSourceRepository}`;
    exec(command, async (err) => {
        if (err) {
            return Log.error('git clone failed', err);
        }
        await writeFileSync(syncConfig.gitRepoExistFlagFileName, 'true');
        return Log.log('blog source repository cloned');
    });
};

let cmdAdminRepoPull = () => {
    const command = 'git pull';
    const dir = 'blog-source';
    exec(command, { cwd: dir }, async (err) => {
        if (err) {
            return Log.error('git pull failed', err);
        }
        return Log.log('blog source repository pulled');
    });
};

let cmdAdminBlogSync = () => {
    const db = new Sequelize(
        connectionConfig.database,
        connectionConfig.username,
        connectionConfig.password,
        connectionConfig.options
    );
    let models = new ModelLoader(db).getModels;
    let rdInterface = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    Log.log('you need to show your login token first.');
    rdInterface.question('username', async (username) => {
        rdInterface.question('token', async token => {
            let admin = null;
            try {
                admin = await models.admin.findOne({
                    where: {
                        username: username
                    }
                });
            } catch (e) {
                Log.error('server error', e);
                return process.exit(0);
            }

            if (!admin) {
                Log.error('login failed', 'user is not exist');
                return process.exit(0);
            }

            if (token !== admin.token) {
                Log.error('login failed', 'token is incorrect');
                return process.exit(0);
            }

            const blogSourceGitRepoExists = await existsSync(syncConfig.gitRepoExistFlagFileName);
            if (blogSourceGitRepoExists) {
                const data = await readFileSync(syncConfig.gitRepoExistFlagFileName);
                blogSourceGitRepoExists = data === 'true';
            }
            if (!blogSourceGitRepoExists) {
                Log.error('sync failed', 'blog source git repo is not exist, please clone the git repo first');
                return process.exit(0);
            }

            cmdAdminRepoPull();

            // TODO
        });
    });
};

const funcMap = {
    db: {
        test: cmdDbTest,
        sync: cmdDbSync,
        force: {
            sync: cmdDbForceSync
        }
    },
    admin: {
        new: cmdAdminNew,
        login: cmdAdminLogin,
        repo: {
            clone: cmdAdminRepoClone,
            pull: cmdAdminRepoPull
        },
        blog: {
            sync: cmdAdminBlogSync
        }
    },
    mail: {
        test: {
            connection: cmdMailTestConnection,
            send: cmdMailTestSend
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
