var con = require('../BD_Conexion');
const mysql = require('mysql');

class TransaccionRepositorio{

    async guardar(Datos){
            
            //Validacion de Tarjetas
            const callback = new Promise((resolve,reject) => {
                con.query(
                    'Select numTarjeta From Tarjeta where numTarjeta = ?',
                    [Datos.tarjetaDestino],
                    function (error, results) {
                        if(error) reject(error);
                        resolve(results);
                    }
                )
            })

            var responde = await callback.then(res => res).catch(err => {throw err});
            var tarjeta = responde[0];

            if(tarjeta != null){
                var query = con.query('INSERT INTO transaccion SET ?', Datos, function (error, results, fields) {
                    if (error) throw error;
                    // Neat!
                    });
                    console.log(query.sql);
                    console.log("Transacción exitosa!");
            }
            else{
                console.log("Cuenta inexistente!");
            }
    }

    async enviar(Datos){
        await this.guardar(Datos);
        const callback = new Promise((resolve, reject) => (
            con.query(
                'SELECT * FROM transaccion WHERE tarjetaDestino = ? AND fecha = ?',
                [Datos.tarjetaDestino,
                Datos.fecha],
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