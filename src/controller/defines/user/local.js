/**
 * /controller/defines/user/local.js
 * @author John Kindem
 * @description source file for //user/local controller
 * @version v1.0
 * @todo {2019.1.28} 注册逻辑：先调用API生成验证码，并且发送邮件，完成验证(前后端都要校验，后端发送邮件之后把验证码暂存入session)后，再发送请求创建用户
 */

import controllerConfig from '../../../configs/controller';
import regexConfig from '../../../configs/regex';
import { Log } from '../../../tool/log';

const userRegex = regexConfig.user;

/**
 * //user/local controller
 * @description {get} get a random check code
 * @param {'checkCode'} type type of get request
 * 
 * @description {get} email usage
 * @param {'emailUsage'} type if the email was used
 * @param {string} email email of user
 * 
 * @description {post} register a new local user
 * @param {string} email email of user
 * @param {string} checkCode check code
 * @param {string} nickname of user
 * @param {string} salt salt of password
 * @param {string} passwordHash sha256 hash value of user's password
 */
export default {
   url: `${controllerConfig.commonUrlPrefix}/user/local`,
   get: (database, models) => {
      return async (context, next) => {
         await next();

         // get params
         const query = context.request.query || {};
         const type = query.type || null;

         // check the params
         if (!type) {
            Log.error('status 400', `type: ${type}`);
            return context.response.status = 400;
         }

         // do different thing when get different 'type' value
         switch (type) {
            case 'checkCode':
               // TODO
               return null;
            case 'emailUsage':
               // TODO
               return null;
            default:
               Log.error('status 400', `type: ${type}`);
               return context.response.status = 400;
         }
      };
   }
};