/**
 * /controller/defines/message.js
 * @author John Kindem
 * @description source file for //message controller
 * @version v1.0
 */

import controllerConfig from '../../configs/controller';
import regexConfig from '../../configs/regex';
import { Log } from '../../tool/log';

const normalRegex = regexConfig.normal;

/**
 * //message controller
 * @description {get} get all messages
 * 
 * @description {post} publish a new message
 * @param {string} body
 */
export default {
    url: `${controllerConfig.commonUrlPrefix}/message`,
    get: (database, models) => {
        return async (context, next) => {
            await next();

            // query database to get all message
            let messages = [];
            try {
                messages = await models.message.findAll();
            } catch (e) {
                Log.error('status 500', e);
                return context.response.status = 500;
            }

            // ready result list
            let result = [];
            for (let i = 0; i < messages.length; i++) {
                result.push({
                    id: messages[i].id,
                    body: messages[i].body,
                    reply: messages[i].reply || null
                });
            }

            // return result
            return context.response.body = {
                messages: result
            };
        };
    },
    post: () => {}
};