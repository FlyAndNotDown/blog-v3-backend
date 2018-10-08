/**
 * /server.js
 * @author John Kindem
 */

/**
 * 服务器类
 * @constructor
 */
class Server {

    /**
     * 模型配置加载器
     * @param {Object} db 实例化过的Seq对象
     * @param {Object} modelDefines 模型定义列表
     * @param {Object} relationDefines 关系定义列表
     */
    static modelLoader(db, modelDefines, relationDefines) {
        let model = {};
        // 对每一个模型定义，都定义一个对应的模型对象
        modelDefines.forEach((modelDefine) => {
            model[modelDefine.name] = db.define(modelDefine.name, modelDefine.description);
        });
        // 对每一个关系定义，都定义一组关系
        relationDefines.forEach((relationDefine) => {
            switch (relationDefine.type) {
                case 'm2m':
                    const name1 = relationDefine.owner[0];
                    const name2 = relationDefine.owner[1];
                    model[name1].belongsToMany(model[name2], { through: `${name1}${name2}` });
                    model[name2].belongsToMany(model[name1], { through: `${name1}${name2}` });
                    break;
                case 'm2o':
                    // TODO
                    break;
                default:
                    break;
            }
        });
        return model;
    }

}

module.exports = Server;