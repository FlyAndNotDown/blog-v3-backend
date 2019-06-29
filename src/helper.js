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
import { execSync } from 'child_process';
import { writeFileSync, existsSync, readFileSync, readdirSync } from 'fs';
import { Renderer } from 'marked';
import marked from 'marked';
import pinyin from 'pinyin';
import emojiOne from 'emojione';
import path from 'path';
import fs from 'fs';
import mainConfig from './configs/main';
import cheerio from 'cheerio';

const connectionConfig = modelConfig.connection;
const mailConnection = mailConfig.connection;
const mailTestSend = mailConfig.testSend;

/* ------------------------------------------ */
const mdRenderer = new Renderer();
mdRenderer.heading = (text, level) => {
    let key = emojiOne.toShort(text);
    key = key.replace(':', '').replace(':', '').replace('.', '-').replace(/[ ]+/, ' ').replace(' ', '-');
    key = pinyin(key, { style: pinyin.STYLE_NORMAL }).join('-');

    return `<h${level} id="h${level}-${key}">${text}</h${level}>`;
};
mdRenderer.link = (href, title, text) => {
    return `<a href="${href}" target="__blank">${text}</a>`;
};
mdRenderer.image = (href, title, text) => {
    const imagePath = path.join(mainConfig.projectRootPath, syncConfig.postPath, href);
    const imageNameSplits = imagePath.split(path.sep);
    const imageName = imageNameSplits[imageNameSplits.length - 1];
    const destPath = path.join(syncConfig.uploadPath, imageName);
    
    if (!fs.existsSync(destPath)) {
        fs.copyFileSync(imagePath, destPath);
    }
    return `<img src="${syncConfig.serverImagePath}/${imageName}" alt="${text}"/>`;
};
mdRenderer.html = (html) => {
    const htmlObject = cheerio.load(html);
    htmlObject('img').each(function(index, elem) {
        const href = htmlObject(this).attr('src');
        const imagePath = path.join(mainConfig.projectRootPath, syncConfig.postPath, href);
        const imageNameSplits = imagePath.split(path.sep);
        const imageName = imageNameSplits[imageNameSplits.length - 1];
        const destPath = path.join(syncConfig.uploadPath, imageName);
        
        if (!fs.existsSync(destPath)) {
            fs.copyFileSync(imagePath, destPath);
        }
        return htmlObject(this).attr('src', `${syncConfig.serverImagePath}/${imageName}`);
    });
    return htmlObject.html().toString();
};

/* ------------------------------------------ */

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
    let files = readdirSync(syncConfig.postPath);

    let postNames = [];
    files.forEach(file => {
        if (file.match(regexConfig.sync.postName)) {
            return postNames.push(file);
        }
    });

    postNames.sort((a, b) => {
        const numberA = parseInt(a.split('.')[0], 10);
        const numberB = parseInt(b.split('.')[0], 10);
        return numberB - numberA;
    });
    
    return postNames;
}

function getPostInfos(postNames) {
    let postMetaInfos = [];
    postNames.forEach(postName => {
        let content = fs.readFileSync(`${syncConfig.postPath}/${postName}`).toString();
        let lines = content.split('\n');

        return postMetaInfos.push({
            key: getPostMetaInfoByLine(lines[1]).replace('\r', ''),
            title: getPostMetaInfoByLine(lines[2]).replace('\r', ''),
            date: getPostMetaInfoByLine(lines[3]).replace('\r', ''),
            labels: getPostMetaInfoByLine(lines[4]).replace('\r', '').split(' '),
            body: content
        });
    });
    return postMetaInfos;
}

/* ------------------------------------------------- */

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

let cmdDbTest = async () => {
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

let cmdDbSync = async () => {
    await syncFunc(false);
};

let cmdDbForceSync = async () => {
    await syncFunc(true);
};

let cmdAdminNew = async () => {
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

let cmdAdminLogin = async () => {
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

let cmdMailTestConnection = async () => {
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

let cmdMailTestSend = async () => {
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

let cmdAdminRepoClone = async () => {
    const command = `git clone ${syncConfig.blogSourceRepository}`;
    try {
        await execSync(command);
    } catch (e) {
        Log.error('git clone failed', e);
        return process.exit(0);
    }
    
    await writeFileSync(syncConfig.gitRepoExistFlagFileName, 'true');
    return Log.log('blog source repository cloned');
};

let cmdAdminRepoPull = async () => {
    const command = 'git pull';
    const dir = 'blog-source';
    try {
        await execSync(command, { cwd: dir });
    } catch (e) {
        Log.error('git pull failed', e);
        return process.exit(0);
    }
    
    return Log.log('blog source repository pulled');
};

let cmdAdminBlogSync = async () => {
    const db = new Sequelize(
        connectionConfig.database,
        connectionConfig.username,
        connectionConfig.password,
        connectionConfig.options
    );
    let models = new ModelLoader(db).getModels();
    
    let blogSourceGitRepoExists = await existsSync(syncConfig.gitRepoExistFlagFileName);
    if (blogSourceGitRepoExists) {
        const data = await readFileSync(syncConfig.gitRepoExistFlagFileName).toString();
        blogSourceGitRepoExists = data === 'true';
    }
    if (!blogSourceGitRepoExists) {
        Log.error('sync failed', 'blog source git repo is not exist, please clone the git repo first');
        return process.exit(0);
    }

    await cmdAdminRepoPull();

    const postNames = getPostNames();
    const postInfos = getPostInfos(postNames);

    for (let i = 0; i < postInfos.length; i++) {
        let count = 0;
        try {
            count = await models.post.count({ where: { id: postInfos[i].key } });
        } catch (e) {
            Log.error('database error', e);
            return process.exit(0);
        }
        if (count === 0) {
            const content = await fs.readFileSync(`${syncConfig.postPath}/${postInfos[i].key}.md`).toString();
            await models.post.create({
                id: postInfos[i].key,
                title: postInfos[i].title,
                body: marked(content, { renderer: mdRenderer })
            });
        }
    }

    Log.log('sync done');
    process.exit(0);
};

let cmdAdminBlogRenderTest = async () => {
    let content = await readFileSync(syncConfig.renderTestMdName).toString();
    console.log(marked(content, { renderer: mdRenderer }));
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
            sync: cmdAdminBlogSync,
            render: {
                test: cmdAdminBlogRenderTest
            }
        }
    },
    mail: {
        test: {
            connection: cmdMailTestConnection,
            send: cmdMailTestSend
        }
    }
};

/* ----------------------------------------------- */

(async function () {

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
        await temp();
    }

})();
