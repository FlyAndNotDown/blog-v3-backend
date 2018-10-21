/**
 * /controller/define/post.js
 * @author John Kindem
 */

import controllerConfig from '../../configs/controller';
import regexConfig from '../../configs/regex';
import { Log } from "../../tool/log";
import Sequelize from 'sequelize';

const postRegex = regexConfig.post;
const normalRegex = regexConfig.normal;

const SequelizeOp = Sequelize.Op;

/**
 * ${commonUrlPrefix}/post 控制器
 * @description get 获取文章内容
 * * @param {'summary'|'detail'} type 获取文章内容的类型 (summary 文章概述列表 | detail 详情)
 * * @param {number} id 文章 id (where type == 'detail')
 * * @param {{start: number, length: number}} range 文章 id 范围 (where type == 'summary')
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
            const query = ctx.request.query || {};
            const type = query.type || null;

            // 校验参数
            if (!type) {
                Log.error('status 400', `type: ${type}`);
                return ctx.response.status = 400;
            }

            // 根据不同类型进行不同处理
            switch (type) {
                // 如果是获取文章概述
                case 'summary':
                    // 获取参数
                    const range = query.range || null;
                    const rangeStart = range.start || null;
                    const rangeLength = range.length || null;

                    // 参数校验
                    if (!range) {
                        Log.error('status 400', `range: ${JSON.stringify(range)}`);
                        return ctx.response.status = 400;
                    }
                    if (!rangeStart || !rangeStart.match(normalRegex.naturalNumber)) {
                        Log.error('status 400', `range: ${JSON.stringify(range)}`);
                        return ctx.response.status = 400;
                    }
                    if (!rangeLength || !rangeLength.match(normalRegex.naturalNumber)) {
                        Log.error('status 400', `range: ${JSON.stringify(range)}`);
                        return ctx.response.status = 400;
                    }

                    let posts;
                    if (rangeStart === 0) {
                        // 如果 rangeStart == 0，则意味着获取最新的 length 篇文章概述
                        try {
                            posts = await models.post.findAll({
                                order: [
                                    ['createdAt', 'DESC']
                                ],
                                limit: rangeLength
                            });
                        } catch (e) {
                            Log.error('status 500', e);
                            return ctx.response.status = 500;
                        }
                    } else {
                        // 如果 rangeStart != 0，则按照分页取得文章
                        try {
                            posts = await models.post.findAll({
                                where: {
                                    [SequelizeOp.lt]: rangeStart
                                },
                                order: [
                                    ['createdAt', 'DESC']
                                ],
                                limit: rangeLength
                            });
                        } catch (e) {
                            Log.error('staus 500', e);
                            return ctx.response.status = 500;
                        }
                    }

                    // 进行数据过滤
                    let result = [];
                    posts.forEach(post => {
                        const createdAt = post.createdAt;
                        const time = `${createdAt.getYear()}-${createdAt.getMonth()}-${createdAt.getDay()}`;
                        result.push({
                            id: post.id,
                            title: post.title,
                            description: post.description,
                            body: post.body,
                            time: time
                        });
                    });

                    // 返回结果
                    return ctx.response.body = {
                        posts: posts
                    };
                // 如果是获取单篇文章详情
                case 'detail':
                    // 获取参数
                    const id = query.id || null;

                    // 参数校验
                    if (!id || !id.match(normalRegex.naturalNumber)) {
                        Log.error('status 400', `id: ${id}`);
                        return ctx.response.status = 400;
                    }

                    let post;
                    // 查询 post 详情
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

                    // 如果没有查询到对应的文章
                    if (!post) {
                        return ctx.response.body = {
                            post: null
                        };
                    }

                    // 处理时间并返回
                    const createdAt = post.createdAt;
                    const time = `${createdAt.getYear()}-${createdAt.getMonth()}-${createdAt.getDay()}`;
                    return ctx.response.body = {
                        id: post.id,
                        title: post.title,
                        description: post.description,
                        body: post.body,
                        time: time
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
