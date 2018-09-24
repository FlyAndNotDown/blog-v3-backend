const Connection = require('../database/connection');

function post(model, method) {

    // 获取连接
    let connection = Connection.getInstance().getConnection();
    // TODO

}

module.exports = post;
