const Connection = require('../database/connection');

(function() {

    // 获取连接
    const connection = Connection.getInstance().getConnection();

}());
