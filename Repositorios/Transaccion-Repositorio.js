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

    async enviar(id, fecha){
        const callback = new Promise((resolve, reject) => (
            con.query(
                'SELECT * FROM transaccion WHERE Tarjetaorigen = ? AND fecha = ?',
                [id,
                fecha],
                function (error, results, fields) {
                    if (error) reject(error);
        
                    resolve(results);
                }
            ))
        )
        return callback.then(res => res).catch(err => {throw err})
        
    }
    
}


module.exports = TransaccionRepositorio; 