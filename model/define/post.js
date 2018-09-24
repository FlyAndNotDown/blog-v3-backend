// 导出文章 model 定义
module.exports = {

    name: person,
    description: {
        id: {
            type: 'serial',
            key: true
        },
        title: {
            type: 'text',
            size: '50'
        },
        description: {
            type: 'text',
            size: '500'
        },
        body: {
            type: 'text'
        },
        date: {
            type: 'date'
        }
    }

};
