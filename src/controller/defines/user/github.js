/**
 * /controller/defines/user/github.js
 * @author John Kindem
 * @description source file for //user/github controller
 * @version v1.0
 */

import oauthConfig from '../../../configs/oauth';
import controllerConfig from '../../../configs/controller';
import { Log } from '../../../tool/log';
import Axios from 'axios';
import queryString from 'query-string';

const githubOauthConfig = oauthConfig.github;
const { clientId, clientSecret, accessTokenUri, userInfoUri } = githubOauthConfig;

/**
 * //user/github controller
 * @description {post} github login API
 * @param {string} code github user code
 */
export default {
    url: `${controllerConfig.commonUrlPrefix}/user/github`,
    post: (database, models) => {
        return async (context, next) => {
            await next();

            // get params
            const body = context.request.body || {};
            const code = body.code || null;

            // check params
            if (!code) {
                Log.error('status 400', `code: ${code}`);
                return context.response.status = 400;
            }

            // send request to get access token
            let httpResponse, data;
            try {
                httpResponse = await Axios.post(accessTokenUri, {
                    client_id: clientId,
                    client_secret: clientSecret,
                    code: code
                });
            } catch (e) {
                Log.error('status 500', e);
                return context.response.status = 500;
            }

            // get access token in response object
            httpResponse = httpResponse || {};
            data = httpResponse.data || {};
            let accessToken = queryString.parse(`?${data}`).access_token || null;

            // check token
            if (!accessToken) {
                Log.error('status 500', `accessToken: ${accessToken}`);
                return context.response.status = 500;
            }

            // use token to get user info
            httpResponse = null;
            data = null;
            try {
                httpResponse = await Axios.get(userInfoUri, {
                    params: {
                        access_token: accessToken
                    }
                });
            } catch (e) {
                Log.error('status 500', e);
                return context.response.status = 500;
            }

            // get user info in data object
            httpResponse = httpResponse || {};
            data = httpResponse.data || {};
            
            // split user info key
            const key = data.id || null;
            const nickname = data.login || null;
            const avatar = data.avatar_url || null;
            const email = data.email || null;

            // check params
            if (
                !key ||
                !nickname ||
                !avatar ||
                !email
            ) {
                Log.error('status 500', e);
                return context.response.status = 500;
            }

            // query database to check if user has register
            let user;
            try {
                user = await models.user.findOne({
                    where: {
                        type: 'github',
                        key: key
                    }
                });
            } catch (e) {
                Log.error('status 500', e);
                return context.response.status = 500;
            }

            // if not found
            if (!user) {
                // add a new user object to database
                let newUser;
                try {
                    newUser = await models.user.create({
                        type: 'github',
                        key: key,
                        nickname: nickname,
                        avatar: avatar,
                        email: email
                    });
                } catch (e) {
                    Log.error('status 500', e);
                    return context.response.status = 500;
                }

                // if success, save user info to session
                context.session.userLogin = true;
                context.session.userInfo = {
                    id: newUser.id || null,
                    type: newUser.type || null,
                    key: newUser.key || null,
                    nickname: newUser.nickname || null,
                    avatar: newUser.avatar || null,
                    email: newUser.email || null
                };

                // return result
                return context.response.body = {
                    success: true
                };
            }

            // if found, just save user info to session
            context.session.userLogin = true;
            context.session.userInfo = {
                id: user.id || null,
                type: user.type || null,
                key: user.key || null,
                nickname: user.nickname || null,
                avatar: user.avatar || null,
                email: user.email || null
            };

            // return result
            return context.response.body = {
                success: true
            };
        };
    }
};