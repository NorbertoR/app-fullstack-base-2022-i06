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
    /*if(req.body.id!=undefined&& req.body.state!=undefined){
        console.log(req.body);
        res.send("actualizado");
    }else{
        res.send("ERROR");
    }*/

    console.log(req.body.id);
    console.log(req.body.state);

    //elimina el dispositivo de la base de datos
    let valor=0;
    if(req.body.state){
        valor=1;
    }
    let sql= "update Devices set state=? where id=?";
    utils.query(sql,[valor,req.body.id],function(err,respuesta){
        if(err){
            res.send(err).status(400);
            return;
        }
        res.send(respuesta)
    });

});

//delete para borrar un dispositivo
app.delete("/eliminar",function(req,res){
    console.log("Llegue al servidor para borrar")
    console.log(Object.keys(req.body).length)
    
    /*if(req.body.id!=undefined){
        console.log(req.body);
        res.send("eliminado");
    }else{
        res.send("ERROR");
    }*/

    //elimina el dispositivo de la base de datos
    let sql= "delete from Devices where id=?";
    utils.query(sql,[req.body.id],function(err,respuesta){
        if(err){
            res.send(err).status(400);
            return;
        }
        res.send(respuesta)
    });
});

//post para agregar un dispositivo
app.post("/agregar",function(req,res){
    console.log("Llegue al servidor para agregar")
    console.log(Object.keys(req.body).length)
    /*if(req.body.id!=undefined){
        console.log(req.body);
        res.send("agregado");
    }else{
        res.send("ERROR");
    }*/

    //se agrega un dispositivo a la base de datos
    let sql= "INSERT INTO Devices (id, name, description, state, type) VALUES (?, ?, ?, ?, ?)";
    utils.query(sql,[req.body.id,req.body.name,req.body.description,req.body.state,req.body.type],function(err,respuesta){
        if(err){
            res.send(err).status(400);
            return;
        }
        res.send(respuesta)
    });
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

app.get('/devices/:id', function(req, res) {
   
    console.log("Alguien un divice:" + req.params.id);
    
    //devuelvo solo el dispositivo con el id que me pasaron
    let sql= "SELECT id, name, description, state, type FROM Devices where id=?";
    utils.query(sql,[req.params.id],function(err,respuesta){
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
