/**
 * /config/regex.js
 * @author John Kindem
 */

/**
 * 正则配置
 */
module.exports = {
    admin: {
        username: /[0-9a-z]{6,16}/,
        password: /[0-9a-z@#]{6,16}/,
        passwordHash: /[0-9a-f]{64,64}/,
        name: /[0-9a-z]{6,16}/,
        phone: /[0-9]{11}/
    }
};