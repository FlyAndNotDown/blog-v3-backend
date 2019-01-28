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
     * get public key function
     * @returns {string} public key
     */
    static getPublicKey() {
        return 'Blog of Kindem';
    }
    
    /**
     * get active code function
     * @param {string} email email of user
     * @param {number} id id of user
     * @returns {string} sha256 hash active code
     * @static
     */
    static getActiveCode(email, id) {
        return sha256(sha256(`${email} ${id} ${LocalUserTool.getPublicKey()}`));
    }

    /**
     * send active email to user's email
     * @static
     */
    static sendActiveMail(email) {
        // create connection
        let transport = nodeMailer.createTransport(connection);
        
        // get the active link
        let activeLink = `${activeCallback}?type=active&email=${email}`;

        // send a active email
        transport.sendMail({
            from: info.sender,
            to: email,
            subject: info.subject,
            text: `${info.publicText} ${activeLink}`,
            html: `${info.publicHtml} <p><a href="${activeLink}">激活链接</a></p>`
        });

        // close the connection
        transport.close();
    }

 };