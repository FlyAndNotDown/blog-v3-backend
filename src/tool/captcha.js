/**
 * /tool/captcha.js
 * @author John Kindem
 * @description source file of local user tool
 * @version v1.1
 * 
 * -------------------------------
 * modify at 2019.2.2
 * 1 - rename the tool class name
 * -------------------------------
 * 
 */

import nodeMailer from 'nodemailer';
import { connection } from '../configs/mail';
import { Log } from './log';

/**
 * captcha tool
 * @constructor
 */
export class CpatchaTool {

    /**
     * get mail info object func
     * @returns {Object} mail info object
     */
    static __getMailInfoObject() {
        return {
            from: 'Kindem的小秘书 <noreply@kindemh.cn>',
            subject: '[Kindem的博客] 邮箱验证码，请及时激活账户'
        };
    }

    /**
     * get captcha letter vertex
     * @returns {[string]} captcha letter vertex
     */
    static __getCaptchaLetterVertex() {
        return [
            'A', 'B', 'C', 'D', 'E', 'F',
            'G', 'H', 'I', 'J', 'K', 'L',
            'M', 'N', 'O', 'P', 'Q', 'R',
            'S', 'T', 'U', 'V', 'W', 'X',
            'Y', 'Z'
        ];
    }

    /**
     * get captcha length
     * @returns captcha length
     */
    static __getCaptchaLength() {
        return 6;
    }

    /**
     * get random captcha
     * @returns a random captcha
     */
    static getRandomCaptcha() {
        let captcha = '';
        let captchaLetterVertex = CpatchaTool.__getCaptchaLetterVertex();

        for (let i = 0; i < CpatchaTool.__getCaptchaLength; i++) {
            captcha += captchaLetterVertex[Math.floor(Math.random() * captchaLetterVertex.length)];
        }

        return captcha;
    }

    /**
     * send a captcha mail to email address
     * @param {string} email email of user
     * @param {string} captcha captcha
     */
    static sendCaptchaMail(email, captcha) {
        let mailInfoObject = CpatchaTool.__getMailInfoObject();
        let transport = nodeMailer.createTransport(connection);
        transport.sendMail({
            from: mailInfoObject.from,
            to: email,
            subject: mailInfoObject.subject,
            text: captcha.toString(),
            html: `<p>${captcha.toString()}</p>`
        }, (err) => {
            if (err) {
                Log.error('mail send failed');
            }
            transport.close();
            process.exit();
        });
    }

};