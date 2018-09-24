const Connection = require('../database/connection');
const modelDefineArray = require('../model/index');

(function() {

    // 获取连接
    const connection = Connection.getInstance().getConnection();

    // 遍历模型定义数组，进行模型定义
    modelDefineArray.forEach(modelDefine => {

        connection.define(
            modelDefine.name,
            modelDefine.description,
            modelDefine.options || {}
        );

    });

    // 同步更改
    connection.sync();

}());
