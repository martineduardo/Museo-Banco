const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const app = express()
const mysql = require("mysql")
//var x = 1

const con = mysql.createPool({
    host: "localhost",
    user: "root", //root
    password: "123456", //123456
    database: "banco"
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

app.post('/api/registro', (req, res) => {
    const nombrePila = req.body.nombrePila
    const apellidoPat  = req.body.apellidoPat
    const apellidoMat = req.body.apellidoMat
    const telCel = req.body.telCel
    /*x = x + 1;
    var numTarjeta = x + 4152313868721916;*/

    const sqlInsert = "insert into Cuenta(nombre_p, apellido_p, apellido_m, numTelefonico, id_sucursal) values(? ,? ,? ,? ,2);"
    con.query(sqlInsert, [nombrePila, apellidoPat, apellidoMat, telCel], (err, result) => {
        console.log(err);
    });

    /*const sqlRead = "select numCuenta from Cuenta where numTelefonico = ?;"
    con.query(sqlRead, [telCel], (err, result) => {
        if(err) {
            console.log(err);
        }
        else {
            res.send(result);
        }
    });

    sqlInsert = "insert into Tarjeta (numTarjeta, saldo, numCuenta) values"*/
});

app.post('/api/estado', (req, res) => {
    const numeroTarjeta = req.body.numeroTarjeta
    
    const sqlRead = "select * from Transaccion where tarjetaOrigen = ? or tarjetaDestino = ?;"
    con.query(sqlRead, [numeroTarjeta, numeroTarjeta], (err, result) => {
        if(err) {
            console.log(err);
        }
        else {
            res.send(result);
        }
    })
})

app.listen(3001, () => {
    console.log("running on port 3001");
})