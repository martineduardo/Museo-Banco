import Axios from 'axios';
import './App.css';
import { TextField, Button } from '@material-ui/core';
import React, { useState } from 'react';

function Estado_Cuenta() {
    
    const [idTarjeta, setIdTarjeta] = useState('')
    const [listaTransacciones, setListaTransacciones] = useState([])

    const getTransacciones = () => {
        Axios.post('http://localhost:3001/api/estado', {
            numeroTarjeta: idTarjeta
        }).then((response) => {
            setListaTransacciones(response.data)
        });
    };

    return (
        <div className='container'>
            <div className="icon">
                <div className="icon_class"></div>
                <div className="text">Estados de cuenta</div>
            </div>
            <div>
                <TextField type="number" name="NumTarjeta" variant="outlined" label="Num. De Tarjeta" onChange={(e)=>{
              setIdTarjeta(e.target.value)
            }}/>
                <Button onClick={getTransacciones} variant="contained" color="primary">Buscar</Button>
            </div>
            <br/>
            <table className='table table-bordered table-striped'>
                <thead>
                    <tr>
                        <td>ID</td>
                        <td>Fecha</td>
                        <td>Monto</td>
                        <td>Tarjeta Origen</td>
                        <td>Tarjeta Destino</td>
                        <td>Estado</td>
                    </tr>
                </thead>
                <tbody>
                    {listaTransacciones.map((transaccion) => (
                        <tr>
                            <td>{transaccion.id_Transaccion}</td>
                            <td>{transaccion.fecha}</td>
                            <td>{transaccion.monto}</td>
                            <td>{transaccion.tarjetaOrigen}</td>
                            <td>{transaccion.tarjetaDestino}</td>
                            <td>{transaccion.estado}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Estado_Cuenta;