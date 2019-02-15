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
                messages = await models.message.findAll({
                    order: [
                        ['createdAt', 'DESC']
                    ]
                });
            } catch (e) {
                Log.error('status 500', e);
                return context.response.status = 500;
            }

            // ready result list
            let result = [];
            for (let i = 0; i < messages.length; i++) {
                // get creator
                let creatorList = await messages[i].getUsers();
                let creator = creatorList[0] || null;

                // ready datetime
                let createdAt = messages[i].createdAt;
                let year = createdAt.getFullYear();
                let month = createdAt.getMonth() + 1;
                let date = createdAt.getDate();
                let hours = createdAt.getHours();
                let minutes = createdAt.getMinutes();
                let seconds = createdAt.getSeconds();

                // push object
                result.push({
                    id: messages[i].id,
                    datetime: `${year}-${month}-${date} ${hours}:${minutes}:${seconds}`,
                    body: messages[i].body,
                    reply: messages[i].reply || null,
                    creator: creator && {
                        id: creator.id,
                        type: creator.type,
                        key: creator.key,
                        nickname: creator.nickname,
                        avatar: creator.avatar,
                        email: creator.email
                    }
                });
            }

            // return result
            return context.response.body = {
                messages: result
            };
        };
    },
    post: (database, models) => {
        return async (context, next) => {
            await next();

            // get param
            const body = context.request.body || {};
            const messageBody = body.body || null;

            // check param
            if (!messageBody) {
                Log.error('status 400', `body: ${messageBody}`);
                return context.response.status = 400;
            }

            // check user login status
            if (!context.session.userLogin || !context.session.userInfo) {
                Log.error('status 400', 'user not login');
                return context.response.status = 400;
            }

            // check creator status
            let creator;
            try {
                creator = await models.user.findOne({
                    where: {
                        id: context.session.userInfo.id
                    }
                });
            } catch (e) {
                Log.error('status 500', e);
                return context.response.status = 500;
            }

            // if not found
            if (!creator) {
                Log.error('status 400', 'fake user info in session');
                return context.response.status = 400;
            }

            // create message
            let message;
            try {
                message = await models.message.create({
                    body: messageBody,
                    reply: null
                });
            } catch (e) {
                Log.error('status 500', e);
                return context.response.status = 500;
            }

            // create relation
            try {
                await creator.addMessage(message);
            } catch (e) {
                Log.error('status 500', e);
                return context.response.status = 500;
            }

            // ready datetime
            let createdAt = message.createdAt;
            let year = createdAt.getFullYear();
            let month = createdAt.getMonth() + 1;
            let date = createdAt.getDate();
            let hours = createdAt.getHours();
            let minutes = createdAt.getMinutes();                let seconds = createdAt.getSeconds();

            // return result
            return context.response.body = {
                success: true,
                message: {
                    id: message.id,
                    datetime: `${year}-${month}-${date} ${hours}:${minutes}:${seconds}`,
                    body: message.body,
                    reply: message.reply || null,
                    creator: {
                        id: creator.id,
                        type: creator.type,
                        key: creator.key,
                        nickname: creator.nickname,
                        avatar: creator.avatar,
                        email: creator.email
                    }
                },
            };
        };
    }
};