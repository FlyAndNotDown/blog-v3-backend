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
            user: 'noreply@kindem.xyz',
            pass: 'zqCL8fZvwhAvG95e'
        }
    },
    info: {
        sender: 'Kindem的小秘书 <noreply@kindem.xyz>',
        subject: '[Kindem的博客] 激活账户',
        publicText: '欢迎加入Kindem的博客，点击链接激活账户，完成注册 ',
        publicHtml: '<p>欢迎加入Kindem的博客，点击链接激活账户，完成注册</p>'
    },
    testSend: {
        from: 'Kindem的小秘书 <noreply@kindem.xyz>',
        to: '461425614@qq.com',
        subject: 'Test Email',
        text: 'hello!',
        html: '<p>hello!</p>'
    },
    activeCallback: 'http://119.3.159.48/request/blog/user/local'
} : {
    connection: {
        pool: true,
        host: 'smtp.exmail.qq.com',
        port: 465,
        secure: true,
        auth: {
            user: 'noreply@kindem.xyz',
            pass: 'zqCL8fZvwhAvG95e'
        }
    },
    info: {
        sender: 'Kindem的小秘书 <noreply@kindem.xyz>',
        subject: '[Kindem的博客] 激活账户',
        publicText: '欢迎加入Kindem的博客，点击链接激活账户，完成注册 ',
        publicHtml: '<p>欢迎加入Kindem的博客，点击链接激活账户，完成注册</p>'
    },
    testSend: {
        from: 'Kindem的小秘书 <noreply@kindem.xyz>',
        to: '461425614@qq.com',
        subject: 'Test Email',
        text: 'hello!',
        html: '<p>hello!</p>'
    },
    activeCallback: 'http://119.3.159.48/request/blog/user/local'
};
