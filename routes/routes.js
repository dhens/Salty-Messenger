module.exports = function(app) {
    app.get('/', function(req, res) {
        res.sendFile(__dirname + '/index.html');
    });
    
    app.post('/messageReceiving', function(req, res) {
        console.log(`messageReceiving route hit: ${req.body}`);
        res.send(`req.body: ${req.body}`);
    })    
}

