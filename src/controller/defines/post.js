/**
 * /controller/define/post.js
 * @author John Kindem
 */

import controllerConfig from '../../configs/controller';
import regexConfig from '../../configs/regex';
import { Log } from "../../tool/log";

const postRegex = regexConfig.post;

/**
 * /post 控制器
 */
export default {
    url: `${controllerConfig.commonUrlPrefix}/post`,
    post: (db, models) => {
        return async (ctx, next) => {
            await next();

            // 校验管理员登录情况
            if (!ctx.session.adminLogin) {
                // 如果没有登录
                Log.error('status 401', `session.adminLogin: ${ctx.session.adminLogin}`);
                ctx.response.status = 401;
                return null;
            }

            // 如果已经登录了，则允许新建文章
            // 获取参数
            const requestBody = ctx.request.body || {};
            const title = requestBody.title || null;
            const body = requestBody.body || null;
            const description = requestBody.description || null;
            const labels = requestBody.labels || null;

            // 参数校验
            if (!title || !title.match(postRegex.title)) {
                Log.error('status 400', `title: ${title}`);
                ctx.response.status = 400;
                return null;
            }
            if (!description || !description.match(postRegex.description)) {
                Log.error('status 400', `description: ${description}`);
                ctx.response.status = 400;
                return null;
            }

            // TODO xss 过滤器

            // 查询所有标签
            let dbLabelObjects;
            let dbLabelMapFromIdToObject = [];
            try {
                dbLabelObjects = await models.label.findAll();
                dbLabelObjects.forEach(object => dbLabelMapFromIdToObject.push({
                    key: object.id,
                    value: object
                }));
            } catch (e) {
                Log.error('status 500', e);
                ctx.response.status = 500;
                return null;
            }

            Log.devLog(`labels: ${labels}`);

            // 看传过来的标签是否都在这个列表中
            let needLabelObjects = [];
            try {
                labels.forEach(label => {
                    let find = false;
                    for (let name in dbLabelMapFromIdToObject) {
                        if (dbLabelMapFromIdToObject.hasOwnProperty(name)) {
                            if (name === label) {
                                find = true;
                                needLabelObjects.push(dbLabelMapFromIdToObject[name]);
                                break;
                            }
                        }
                    }
                    // 如果不在，则报错
                    if (!find) throw new Error(`label ${label} not found in database`);
                });
            } catch (e) {
                Log.error('status 400', e);
                ctx.response.status = 400;
                return null;
            }

            // 存入数据库
            // 先存基础对象
            let newPost;
            try {
                newPost = await models.post.create({
                    title: title,
                    description: description,
                    body: body
                });
            } catch (e) {
                Log.error('status 500', e);
                ctx.response.status = 500;
                return null;
            }

            // 设置标签关系
            try {
                await newPost.setLabels(needLabelObjects);
            } catch (e) {
                Log.error('status 500', e);
                ctx.response.status = 500;

                // 回滚
                if (newPost) {
                    await models.post.destroy({
                        where: {
                            id: newPost.id
                        }
                    });
                }

                return null;
            }

            // 设置完成之后则返回成功
            ctx.response.body = {
                success: true
            };
            return null;
        }
    }
}