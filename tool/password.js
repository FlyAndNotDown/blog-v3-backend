/**
 * /tool/password.js
 * @author John Kindem
 */

const sha256 = require('js-sha256');

class PasswordTool {

    /**
     * 获取盐矩阵
     * @return {[type]} [description]
     */
    static getSaltVertex() {
        return [
            '0', '1', '2', '3',
            '4', '5', '6', '7',
            '8', '9', 'a', 'b',
            'c', 'd', 'e', 'f'
        ];
    }

    /**
     * 获取盐
     * @return {string} 盐
     */
    static getSalt() {
        let salt = '';
        const saltVertex = PasswordTool.getSaltVertex();
        for (let i = 0; i < 12; i++) {
            salt += saltVertex[Math.floor(Math.random() * 16)]
        }
        return salt;
    }

    /**
     * 加密
     * @return {string} 密码hash值
     */
    static encode(password, salt) {
        return sha256(sha256(password) + salt);
    }

}

module.exports = PasswordTool;
