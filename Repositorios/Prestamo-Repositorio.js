var con = require('../BD_Conexion');
var fecha = "2022-01-01";
const mysql = require('mysql');

class PrestamoRepositorio{
    async guardar(Datos) {

        var msg = null;
        const callback = new Promise((resolve,reject) =>{
            con.query('Select * from prestamo where numCuenta = ?',
            [Datos.numCuenta],
            function (error, results){
                if(error) reject(results);
                resolve(results);
            }
        )
        })
        var response = await callback.then(res => res).catch(err => {throw err});
        var prestamo = response[0];

        if(prestamo == null){
            const callback = new Promise ((resolve,reject) =>{
            con.query(
                'Select numCuenta From cuenta Where numCuenta = ?',
                [Datos.numCuenta],
                function (error,results){
                    if(error) reject(error);
                    resolve(results);
                }
            )
        })

        var resCuenta = await callback.then(res => res).catch(err => {throw err});
        var cuenta = resCuenta[0];

        if(cuenta != null){
            var query = con.query('INSERT INTO Prestamo SET ?', Datos, function (error, results, fields) {
                if (error) throw error;
                // Neat!
                });

            const callbackOrigen = new Promise((resolve, reject) =>{
            con.query(
                'Select saldo from tarjeta where numCuenta = ?',
                [3],
                function(error, results){
                    if(error) reject(error);
                    resolve(results);
                }
            )
        })

        const callbackDestino = new Promise((resolve, reject) =>{
            con.query(
                'Select saldo from tarjeta where numCuenta = ?',
                [Datos.numCuenta],
                function(error, results){
                    if(error) reject(error);
                    resolve(results);
                }
            )
        })
        var resOrigen = await callbackOrigen.then(res => res).catch(err => {throw err});
        var saldoOrigen = resOrigen[0].saldo;

        var resDestino = await callbackDestino.then(res => res).catch(err => {throw err});
        var saldoDestino = resDestino[0].saldo;

        var deposito = await this.jsonParser(Datos);

        if(saldoOrigen >= deposito){
            const date = new Date();
            const mysqlDate = date.toISOString().split("T")[0]+' '+date.toTimeString().split(' ')[0];

            var saldoRestado = saldoOrigen - deposito;
            var saldoTotal = saldoDestino + deposito;

            var query = con.query("INSERT INTO Transaccion  (fecha, monto, tarjetaOrigen, tarjetaDestino, estado) values (' " + mysqlDate + "', "+ deposito +", '5204165457812794', '5515070400407615', "+ 1 +")", function (error, results, fields){
                if (error) throw error;
            });

            var query2 = con.query('Update tarjeta Set saldo = ? Where numCuenta = ?',
                [saldoRestado,
                3],
                function (error, results, fields){
                    if(error) throw error;
            });

            var query3 = con.query('Update tarjeta Set saldo = ? Where numCuenta = ?',
            [saldoTotal,
            Datos.numCuenta],
            function (error, results, fields){
                if(error) throw error;
            });
            //console.log("Prestamo aceptado!\n");
            console.log("Transaccion exitosa!");
        }else{
            const date = new Date();
            const mysqlDate = date.toISOString().split("T")[0]+' '+date.toTimeString().split(' ')[0];

            var query = con.query("INSERT INTO Transaccion  (fecha, monto, tarjetaOrigen, tarjetaDestino, estado) values (' " + mysqlDate + "', "+ deposito +", '5204165457812794', '5515070400407615', "+ 0 +")",
                function (error, results, fields) {
                    if (error) throw error;
                });
            console.log("Fondos insuficientes!");
            //return msg = "Fondos insufucientes!"
        }
        }else
        {
            console.log("Número de cuenta inexistente!");
            //return msg = "Número de cuenta inexistente!";
        }
        }else{
            console.log("Ya existe un prestamo!");
            //return msg = "Ya existe un prestamo";
            
        }
    }

    jsonParser(doubleValue){
        var double = JSON.stringify(doubleValue);
        var objectValue = JSON.parse(double);
        return objectValue['importe'];
    }

    async enviar(Datos){ //Modificado para conectividad con restauraciones
        await this.guardar(Datos);
        const date = new Date();
            const mysqlDate = date.toISOString().split("T")[0]+' '+date.toTimeString().split(' ')[0];

            const callback = new Promise((resolve, reject) => (
                con.query(
                    'SELECT * FROM transaccion WHERE tarjetaDestino = ? AND fecha = ?',
                    [5515070400407615,
                    mysqlDate],
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