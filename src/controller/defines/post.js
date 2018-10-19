/**
 * /controller/define/post.js
 * @author John Kindem
 */

import controllerConfig from '../../configs/controller';
import regexConfig from '../../configs/regex';
import { Log } from "../../tool/log";

const postRegex = regexConfig.post;
const normalRegex = regexConfig.normal;

/**
 * ${commonUrlPrefix}/post 控制器
 * @description get 获取文章内容
 * * @param {'detail'} type 获取文章内容的类型
 * * @param {number} id 文章 id (when type == 'detail')
 * @description post 新建文章
 * * @param {string} title 标题
 * * @param {string} body 文章主体
 * * @param {string} description 描述
 * * @param {[id: number]} labels 标签id数组
 */
export default {
    url: `${controllerConfig.commonUrlPrefix}/post`,
    get: (db, models) => {
        return async (ctx, next) => {
            await next();

            // 获取参数
            const requestBody = ctx.request.body || {};
            const type = requestBody.type || null;

            // 参数校验
            if (!type) {
                Log.error('status 400', `type: ${type}`);
                return ctx.response.status = 400;
            }

            // 根据 get 的类型进行处理
            switch (type) {
                case 'detail':
                    // 根据 id 获取详细信息
                    // 获取 id
                    const id = requestBody.id || null;
                    // 参数校验
                    if (!id || !id.match(normalRegex.naturalNumber)) {
                        Log.error('status 400', `id: ${id}`);
                        return ctx.response.status = 400;
                    }

                    // 查询 id
                    let post;
                    try {
                        post = await models.post.findOne({
                            where: {
                                id: id
                            }
                        });
                    } catch (e) {
                        Log.error('status 500', e);
                        return ctx.response.status = 500;
                    }

                    // 如果没有查询到 post 的内容
                    if (!post) {
                        return ctx.response.body = {
                            post: null
                        };
                    }

                    return ctx.response.body = {
                        id: post.id || 0,
                        title: post.title || '',
                        description: post.description || '',
                        body: post.body || ''
                    };
                default:
                    Log.error('status 400', `type: ${type}`);
                    return ctx.response.status = 400;
            }
        };
    },
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
            let dbLabelMapFromIdToObjectList = [];
            try {
                dbLabelObjects = await models.label.findAll();
                dbLabelObjects.forEach(object => dbLabelMapFromIdToObjectList.push({
                    key: object.id,
                    value: object
                }));
            } catch (e) {
                Log.error('status 500', e);
                ctx.response.status = 500;
                return null;
            }

            // 看传过来的标签是否都在这个列表中
            let needLabelObjects = [];
            try {
                labels.forEach(labelId => {
                    let find = false;
                    for (let i = 0; i < dbLabelMapFromIdToObjectList.length; i++) {
                        if (dbLabelMapFromIdToObjectList[i].key === labelId) {
                            find = true;
                            needLabelObjects.push(dbLabelMapFromIdToObjectList[i].value);
                            break;
                        }
                    }
                    // 如果不在，则报错
                    if (!find) throw new Error(`label ${labelId} not found in database`);
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
        };
    }
}
