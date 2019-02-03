/**
 * /configs/regex.js
 * @author John Kindem
 */

import mainConfig from './main';

/**
 * 导出正则配置
 */
export default mainConfig.devMode ? {
    normal: {
        naturalNumber: /^[1-9]\d*|0$/
    },
    admin: {
        username: /^[0-9a-z]{6,16}$/,
        password: /^[0-9a-z@#]{6,16}$/,
        passwordHash: /^[0-9a-f]{64,64}$/,
        name: /^[0-9a-z]{6,16}$/,
        phone: /^[0-9]{11}$/
    },
    user: {
        // username: /^[0-9a-z]{6,16}$/,
        email: /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/,
        password: /^[0-9a-zA-Z@#]{6,16}$/,
        passwordHash: /^[0-9a-f]{64}$/,
        salt: /^[0-9a-f]{12}$/,
        nickname: /^([A-Za-z0-9]{4,20})|([\u4e00-\u9fa5]{2,10})$/,
        captcha: /^[A-Z]{6}$/
    },
    post: {
        title: /^.{1,100}$/,
        description: /^.{1,1000}$/
    }
} : {
    normal: {
        naturalNumber: /^[1-9]\d*|0$/
    },
    admin: {
        username: /^[0-9a-z]{6,16}$/,
        password: /^[0-9a-z@#]{6,16}$/,
        passwordHash: /^[0-9a-f]{64,64}$/,
        name: /^[0-9a-z]{6,16}$/,
        phone: /^[0-9]{11}$/
    },
    user: {
        // username: /^[0-9a-z]{6,16}$/,
        email: /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/,
        password: /^[0-9a-zA-Z@#]{6,16}$/,
        passwordHash: /^[0-9a-f]{64}$/,
        salt: /^[0-9a-f]{12}$/,
        nickname: /^([A-Za-z0-9]{4,20})|([\u4e00-\u9fa5]{2,10})$/,
        captcha: /^[A-Z]{6}$/
    },
    post: {
        title: /^.{1,100}$/,
        description: /^.{1,1000}$/
    }
};
