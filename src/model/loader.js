/**
 * /model/loader.js
 * @author John Kindem
 */

import modelDefineObject from './define';

/**
 * 模型加载器
 */
export class ModelLoader {

    /**
     * 构造
     * @param {Object} db Seq实例化对象
     */
    constructor(db) {
        this.__models = {};
        const modelDefines = modelDefineObject.model;
        const relationDefines = modelDefineObject.relation;
        // 对每一个模型，都定义一个对应的模型对象
        modelDefines.forEach((modelDefine) => {
            this.__models[modelDefine.name] = db.define(modelDefine.name, modelDefine.description);
        });
        // 对每一个关系，都定义一组关系
        relationDefines.forEach((relationDefine) => {
            switch (relationDefine.type) {
                case 'many2many':
                    const name1 = relationDefine.owner[0];
                    const name2 = relationDefine.owner[1];
                    if (relationDefine.as) {
                        const as1 = relationDefine.as[0];
                        const as2 = relationDefine.as[1];
                        this.__models[name1].belongsToMany(this.__models[name2], {
                            through: `${relationDefine.through}`,
                            as: as1
                        });
                        this.__models[name2].belongsToMany(this.__models[name1], {
                            through: `${relationDefine.through}`,
                            as: as2
                        });
                    } else {
                        this.__models[name1].belongsToMany(this.__models[name2], { through: `${relationDefine.through}` });
                        this.__models[name2].belongsToMany(this.__models[name1], { through: `${relationDefine.through}` });
                    }
                    break;
                case 'one2many':
                    this.__models[relationDefine.owner].hasMany(this.__models[relationDefine.to], { as: `${relationDefine.as}` });
                    break;
                case 'hasOne':
                    this.__models[relationDefine.owner].hasOne(this.__models[relationDefine.to], { as: `${relationDefine.as}` });
                default:
                    break;
            }
        });
    }

    /**
     * 获取模型列表
     * @returns {{}|*} 模型加载起
     */
    getModels() {
        return this.__models;
    }

}
