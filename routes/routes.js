const saltyProtocol = require('../salty_messenger')

module.exports = function(app) {
    app.get('/', function(req, res) {
        res.sendFile(__dirname + '/index.html');
    });
    
    app.post('/messageReceiving', function(req, res) {
        const encodedMessage = saltyProtocol.salty_encode(req.body.message)
        res.send(encodedMessage);
    })    
}

