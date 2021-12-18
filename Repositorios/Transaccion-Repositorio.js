var con = require('../BD_Conexion');
const mysql = require('mysql');

class TransaccionRepositorio{
    guardar(Datos) {
        //var Datos  = {id_transaccion: 1, Fecha: mysql.raw('NOW()'), Monto: 20000.00, NumCuenta: 6341090898};
        //Datos.Fecha =  mysql.raw('NOW()');

        var query = con.query('INSERT INTO transaccion SET ?', Datos, function (error, results, fields) {
        if (error) throw error;
        // Neat!
        });
        console.log(query.sql); // INSERT INTO transaccion SET `id` = 1, `title` = 'Hello MySQL'
    }

    enviar(id){
        var query = con.query('SELECT * FROM transaccion WHERE ?', id, function (error, rows, fields){
            if(error) throw error;
            // Neat!
        });
        var resultado = json(query.sql)
        return resultado;
    }
    
}

module.exports = TransaccionRepositorio; 