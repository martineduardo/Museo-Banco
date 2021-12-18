
const { Router } = require('express');
const express = require('express');
const router = express.Router();
const TransaccionRepositorio = require('./Repositorios/Transaccion-Repositorio');

const TransaccionesRepositorio = new TransaccionRepositorio();

router.use(express.json()); 

/*router.use(function timeLog (req, res, next) {
    console.log('Time: ', Date.now())
    next()
  })*/

router.post('/transacciones', function(req, res){
    console.log(req.body, typeof req.body);
    TransaccionesRepositorio.guardar((req.body));
    res.send(JSON.stringify({
      Estado: 'Exitoso',
      Monto: req.body.monto,
      Cuenta: req.body.Tarjetaorigen
    }));
});

router.get('/', function (req, res) {
    res.send('Hola')
  })

module.exports = router;

