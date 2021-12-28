const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const app = express()
const mysql = require("mysql")

const con = mysql.createPool({
    host: 'Localhost',
    user: 'UsuarioBanco',
    password: 'banco',
    database: 'banco',
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

app.post('/api/registro', (req, res) => {
    const nombrePila = req.body.nombrePila
    const apellidoPat  = req.body.apellidoPat
    const apellidoMat = req.body.apellidoMat
    const telCel = req.body.telCel

    const sqlInsert = "insert into Cuenta(nombre_p, npellido_p, npellido_m, numTelefonico, id_sucursal) values(? ,? ,? ,? ,69429);"
    con.query(sqlInsert, [nombrePila, apellidoPat, apellidoMat, telCel], (err, result) => {
        console.log(err);
    });
});

app.listen(3001, () => {
    console.log("running on port 3001");
})