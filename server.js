const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + '/public/'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get('/room', (req, res) => {
    res.sendFile(path.join(__dirname, "/public/room.html"));
})


app.listen(PORT, () => {
    console.log(`🧂 Server started on port ${PORT}`);
});