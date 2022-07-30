//=======[ Settings, Imports & Data ]==========================================

var PORT    = 3000;

var express = require('express');
var app     = express();
var utils   = require('./mysql-connector');

// to parse application/json
app.use(express.json()); 
// to serve static files
app.use(express.static('/home/node/app/static/'));

//=======[ Main module code ]==================================================

app.get('/devices/', function(req, res, next) {
    devices = [
        { 
            'id': 1, 
            'name': 'Lampara 1', 
            'description': 'Luz living', 
            'state': 1, 
            'type': 1, 
        },
        { 
            'id': 2, 
            'name': 'Ventilador 1', 
            'description': 'Ventilador Habitacion', 
            'state': 1, 
            'type': 2, 
        },
    ]
    console.log("Alguien pidio divices!");
    setTimeout(function(){
        res.send(JSON.stringify(devices)).status(200);
    }, 2000);
    
});

app.get('/metodoGET/', function(req, res, next) {
    let devicesfull = require('./datos.json');
    console.log("Alguien pidio get desde el archivo json!");
    setTimeout(function(){
        res.send(JSON.stringify(devicesfull)).status(200);
    }, 2000);
    
});

app.get('/metodoGET/:id', function(req, res) {
    let devicesfull = require('./datos.json');
    console.log("Alguien pidio un get desde el archivo json!: " + req.params.id);
    res.send(JSON.stringify(devicesfull.find(devicesfull => devicesfull.id == req.params.id))).status(200);
    //setTimeout(function(){
    //    res.send(JSON.stringify(devicesfull)).status(200);
    //}, 2000);
    
});

app.listen(PORT, function(req, res) {
    console.log("NodeJS API running correctly");
});

//=======[ End of file ]=======================================================
