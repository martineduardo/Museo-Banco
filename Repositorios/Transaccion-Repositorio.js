var con = require('../BD_Conexion');
const mysql = require('mysql');

class TransaccionRepositorio{

    async guardar(Datos){
            
        //Validacion de Tarjetas
        var msg = null;
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
            const callbackOrigen = new Promise((resolve,reject) => {
                con.query(
                    'Select saldo From Tarjeta where numTarjeta = ?',
                    [Datos.tarjetaOrigen],
                    function (error, results) {
                        if(error) reject(error);
                        resolve(results);
                    }
                )
            })
            const callbackDestino = new Promise((resolve,reject) => {
                con.query(
                    'Select saldo From Tarjeta where numTarjeta = ?',
                    [Datos.tarjetaDestino],
                    function (error, results) {
                        if(error) reject(error);
                        resolve(results);
                    }
                )
            })

            var responseOrigen = await callbackOrigen.then(res => res).catch(err => {throw err});
            var saldoOrigen = responseOrigen[0].saldo;

            var responseDestino = await callbackDestino.then(res => res).catch(err => {throw err});
            var saldoDestino = responseDestino[0].saldo;

            var deposito = await this.jsonParser(Datos);

            const date = new Date();
            const mysqlDate = date.toISOString().split("T")[0]+' '+date.toTimeString().split(' ')[0];

            if(saldoOrigen >= deposito){

                var saldoRestado = saldoOrigen - deposito;
                var saldoTotal = saldoDestino + deposito;
                
                var query = con.query('INSERT INTO transaccion SET fecha = ?, ?, estado = ?',
                [mysqlDate,
                Datos,
                1],
                function (error, results, fields) {
                    if (error) throw error;
                });

                var query2 = con.query('Update tarjeta Set saldo = ? Where numTarjeta = ?',
                [saldoRestado,
                Datos.tarjetaOrigen],
                function (error, results, fields){
                    if(error) throw error;
                });

                var query3 = con.query('Update tarjeta Set saldo = ? Where numTarjeta = ?',
                [saldoTotal,
                Datos.tarjetaDestino],
                function (error, results, fields){
                    if(error) throw error;
                });
                console.log("Transaccion exitosa!");
                
            }
            else{
                var query = con.query('INSERT INTO transaccion SET fecha = ?, ?, estado = ?',
                [mysqlDate,
                Datos,
                0],
                function (error, results, fields) {
                    if (error) throw error;
                });
                //console.log("Fondos insuficientes!");
                return msg = "Fondos insuficientes!";
            }
        }
        else{
            //console.log("Cuenta inexistente!");
            return msg = "Cuenta inexistente!";
        }
    }

    jsonParser(doubleValue){
        var double = JSON.stringify(doubleValue);
        var objectValue = JSON.parse(double);
        return objectValue['monto'];
    }

    async enviar(Datos){
        var msg = await this.guardar(Datos);
        if (msg == null){
            const date = new Date();
            const mysqlDate = date.toISOString().split("T")[0]+' '+date.toTimeString().split(' ')[0];
            const callback = new Promise((resolve, reject) => (
                con.query(
                    'SELECT * FROM transaccion WHERE tarjetaDestino = ? AND fecha = ?',
                    [Datos.tarjetaDestino,
                    mysqlDate],
                    function (error, results, fields) {
                        if (error) reject(error);
            
                        resolve(results);
                    }
                ))
            )
            return callback.then(res => res).catch(err => {throw err})
        }
        else{
            return msg;
        }
        
        
    }
    
}


module.exports = TransaccionRepositorio; 