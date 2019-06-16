/**
 * /tool/pwd.js
 * @author John Kindem
 */

import sha256 from 'js-sha256';

/**
 * Password Tool
 * @constructor
 */
export class PwdTool {

    /**
     * 获取盐矩阵
     * @returns {Object} 获取盐矩阵
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
     * @returns {string} 盐
     */
    static getSalt() {
        let salt = '';
        const saltVertex = PwdTool.getSaltVertex();
        for (let i = 0; i < 12; i++) {
            salt += saltVertex[Math.floor(Math.random() * 16)]
        }
        return salt;
    }

    /**
     * 加密
     * @param {string} password 密码明文
     * @param {string} salt 盐
     * @returns {string} sha256加密结果
     */
    static encode(password, salt) {
        return sha256(sha256(password) + salt);
    }

    static getToken() {
        return PwdTool.getSalt().toUpperCase();
    }

}