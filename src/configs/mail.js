/**
 * /configs/mail.js
 * @author John Kindem
 * @description config file for SMTP mail server
 * @version v1.0
 */

import mainConfig from './main';

/**
 * export mail config
 */
export default mainConfig.devMode ? {
    connection: {
        pool: true,
        host: 'smtp.exmail.qq.com',
        port: 465,
        secure: true,
        auth: {
            user: 'noreply@kindemh.cn',
            pass: 'wbPu3EcdE5wkwnZ3'
        }
    },
    test: {
        dstMail: '461425614@qq.com',
        title: 'hello',
        body: 'hello'
    }
} : {
    connection: {
        pool: true,
        host: 'smtp.exmail.qq.com',
        port: 465,
        secure: true,
        auth: {
            user: 'noreply@kindemh.cn',
            pass: 'wbPu3EcdE5wkwnZ3'
        }
    },
    test: {
        dstMail: '461425614@qq.com',
        title: 'hello',
        body: 'hello'
    }
};
