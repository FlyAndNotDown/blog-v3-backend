const Connection = require('../../database/connection');

function post(model, server, url) {

    server.get(url, (req, res) => {

        console.log('hello');

    });

}

module.exports = post;
