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

/**
 * captcha tool
 * @constructor
 */
export class CpatchaTool {

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

};