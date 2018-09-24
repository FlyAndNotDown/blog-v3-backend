const postModelDefine = require('./define/post');

// 定义模型定义数组
const modelDefineArray = [];

// 添加模型定义
(function() {

    modelDefineArray.push(postModelDefine);

});

// 导出模型定义数组
module.exports = modelDefineArray;
