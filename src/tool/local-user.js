/**
 * /tool/user.js
 * @author John Kindem
 * @description source file of local user tool
 * @version v1.0
 */

 import sha256 from 'js-sha256';

 /**
  * User Tool
  * @constructor
  */
 export class LocalUserTool {

    // public key
    static __PUBLIC_KEY = 'Blog of Kindem';
    
    /**
     * get active code function
     * @param {string} email email of user
     * @param {number} id id of user
     * @static
     */
    static getActiveCode(email, id) {
        return sha256(sha256(`${email} ${id} ${LocalUserTool.__PUBLIC_KEY}`));
    }

 };