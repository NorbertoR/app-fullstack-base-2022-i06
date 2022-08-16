//=======[ Settings, Imports & Data ]==========================================

var PORT    = 3000;

var express = require('express');
var app     = express();
var utils   = require('./mysql-connector');

// to parse application/json
app.use(express.json()); 
// to serve static files
app.use(express.static('/home/node/app/static/'));

var  devices = [
    { 
        'id': 1, 
        'name': 'Lampara 1', 
        'description': 'Luz living', 
        'state': 0, 
        'type': 1, 
    },
    { 
        'id': 2, 
        'name': 'Ventilador 1', 
        'description': 'Ventilador Habitacion', 
        'state': 1, 
        'type': 2, 
    },
];
//=======[ Main module code ]==================================================
app.post("/actualizar",function(req,res){
    console.log("Llegue al servidor")
    console.log(Object.keys(req.body).length)
    if(req.body.id!=undefined&& req.body.state!=undefined){
        console.log(req.body);
        res.send("actualizado");
    }else{
        res.send("ERROR");
    }

   
});

//post para borrar un dispositivo
app.delete("/eliminar",function(req,res){
    console.log("Llegue al servidor para borrar")
    console.log(Object.keys(req.body).length)
    if(req.body.id!=undefined){
        console.log(req.body);
        res.send("eliminado");
    }else{
        res.send("ERROR");
    }
});

//post para agregar un dispositivo
app.post("/agregar",function(req,res){
    console.log("Llegue al servidor para agregar")
    console.log(Object.keys(req.body).length)
    if(req.body.id!=undefined){
        console.log(req.body);
        res.send("agregado");
    }else{
        res.send("ERROR");
    }
});

app.get('/devicesDB/', function(req, res) {
//*  *//
var mysql = require('mysql');

var con = mysql.createConnection({
  host: "mysql-server",
  port: "3306",
  user: "root",
  password: "userpass",
  database: "smart_home"
});

con.connect(function(err) {
  if (err) throw err;
  con.query("SELECT id, name, description, state, type FROM Devices", function (err, result, fields) {
    if (err) throw err;
    console.log(result);
    res.send(JSON.stringify(result)).status(200);
  });
});
//*  *//
    console.log("Alguien pidio divices a la base de datos!");
    setTimeout(function(){
        //res.send(JSON.stringify(devices)).status(200);
    }, 2000);
    
});

app.get('/devices/', function(req, res) {
   
    console.log("Alguien pidio divices!");
//    setTimeout(function(){
//        res.send(JSON.stringify(devices)).status(200);
//    }, 2000);

    let sql= "SELECT id, name, description, state, type FROM Devices";
    utils.query(sql,function(err,respuesta){
        if(err){
            res.send(err).status(400);
            return;
        }
        res.send(respuesta)
    });    
   
});

app.listen(PORT, function(req, res) {
    console.log("NodeJS API running correctly");
});

//=======[ End of file ]=======================================================
