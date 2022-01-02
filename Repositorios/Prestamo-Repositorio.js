var con = require('../BD_Conexion');
var fecha = "2022-01-01";
const mysql = require('mysql');

class PrestamoRepositorio{
    guardar(Datos) {
        //var Datos  = {id_transaccion: 1, Fecha: mysql.raw('NOW()'), Monto: 20000.00, NumCuenta: 6341090898};
        //Datos.Fecha =  mysql.raw('NOW()');

        var query = con.query('INSERT INTO Prestamo SET ?', Datos, function (error, results, fields) {
        if (error) throw error;
        // Neat!
        });

        var monto = Datos.importe;

        //var query2 = con.query("INSERT INTO Transaccion  (fecha, monto, tarjetaOrigen, tarjetaDestino, estado) values (fecha='" + fecha + "', monto = " + monto + ", tarjetaOrigen = '5204165457812794', tarjetaDestino = '4152313868721916', estado = "+ true + " )", function (error, results, fields){
        var query2 = con.query("INSERT INTO Transaccion  (fecha, monto, tarjetaOrigen, tarjetaDestino, estado) values ("+ '2021/02/02' + ", "+ monto +", '5204165457812794', '4152313868721916', "+ 1 +")", function (error, results, fields){

            if (error) throw error;
            // Neat!
        });
        console.log(query.sql); // INSERT INTO transaccion SET `id` = 1, `title` = 'Hello MySQL'
        console.log(query2.sql);
    }

    async enviar(id){ //Modificado para conectividad con restauraciones
        const callback = new Promise((resolve, reject) => (
            con.query(
                'SELECT * FROM Transaccion WHERE tarjetaDestino = ?',
                [id],
                function (error, results, fields) {
                    if (error) reject(error);
        
                    resolve(results);
                }
            ))
        )
        return callback.then(res => res).catch(err => {throw err})
        
    }
    
}


module.exports = PrestamoRepositorio; 