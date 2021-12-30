const express = require('express');
const app = express();
const PORT = 8000;
const routes = require('./Routes');
let transactions = [];
//const router = require('./routes')
app.use('/api', routes)

//app.use(express.json()); 

  /*app.get('/', (req, res) => {
    res.status(200).send(
        transactions
       )
  })*/

 /* app.post('/transact', (req, res) => {
    const transact = req.body;
    // Output the book to the console for debugging
    console.log(transact);
    transactions.push(transact);
    res.send(JSON.stringify({Estado:"Transacción exitosa",
    CtaDestino:"*****8470",
    Monto: 600.00}));
});*/


app.listen(
    PORT,
    () => console.log('Ya esta conectado')
)

app.use('/Routes', routes);