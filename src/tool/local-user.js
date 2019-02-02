/**
 * /tool/user.js
 * @author John Kindem
 * @description source file of local user tool
 * @version v1.0
 */

import sha256 from 'js-sha256';
import nodeMailer from 'nodemailer';
import { connection, info, activeCallback } from '../configs/mail';

/**
 * User Tool
 * @constructor
 */
export class LocalUserTool {

    /**
     * get active code letter vertex
     * @returns {[string]} active code letter vertex
     */
    static __getActiveCodeLetterVertex() {
        return [
            'A', 'B', 'C', 'D', 'E', 'F',
            'G', 'H', 'I', 'J', 'K', 'L',
            'M', 'N', 'O', 'P', 'Q', 'R',
            'S', 'T', 'U', 'V', 'W', 'X',
            'Y', 'Z'
        ];
    }

    /**
     * get active code length
     * @returns active code length
     */
    static __getActiveCodeLength() {
        return 6;
    }

    /**
     * get random active code
     * @returns a random active code
     */
    static getRandomActiveCode() {
        let activeCode = '';
        let activeCodeLetterVertex = LocalUserTool.__getActiveCodeLetterVertex();

        for (let i = 0; i < LocalUserTool.__getActiveCodeLength; i++) {
            activeCode += activeCodeLetterVertex[Math.floor(Math.random() * activeCodeLetterVertex.length)];
        }

        return activeCode;
    }

};