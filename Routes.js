
const { Router } = require('express');
const express = require('express');
const router = express.Router();
const TransaccionRepositorio = require('./Repositorios/Transaccion-Repositorio');
const PrestamoRepositorio = require('./Repositorios/Prestamo-Repositorio');

const TransaccionesRepositorio = new TransaccionRepositorio();
const PrestamosRepositorio = new PrestamoRepositorio();

router.use(express.json()); 

/*router.use(function timeLog (req, res, next) {
    console.log('Time: ', Date.now())
    next()
  })*/

//router.post('/transacciones', function(req, res){
    /*console.log(req.body, typeof req.body);
    TransaccionesRepositorio.guardar((req.body));
    var resultado  = TransaccionesRepositorio.enviar(req.body.Tarjetaorigen, req.body.fecha)
    res.send(JSON.stringify({
      //Estado: 'Exitoso',
      //Monto: req.body.monto,
      //Cuenta: req.body.Tarjetaorigen
      resultado
    }));
});*/

router.post('/transacciones', function (req, res) {
  TransaccionesRepositorio.guardar((req.body));
  TransaccionesRepositorio.enviar(req.body.Tarjetaorigen, req.body.fecha).then( (resultado) => {
 
    res.send({
     resultado
    });
 
  });
 })

 router.post('/prestamos', function (req, res) {
  PrestamosRepositorio.guardar((req.body));
  PrestamosRepositorio.enviar(req.body.Tarjetadestino, req.body.fecha).then( (resultado) => {
 
    res.send({
     resultado
    });
 
  });
 })

router.get('/', function (req, res) {
    res.send('Hola')
  })

module.exports = router;

