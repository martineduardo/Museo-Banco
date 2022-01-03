import React, { useState, useEffect } from 'react';
import './App.css';
import { TextField, Button } from '@material-ui/core';
import Axios from 'axios';

function Registro() {

  const [nombreReg, setNombreReg] = useState('')
  const [apellidoPReg, setApellidoPReg] = useState('')
  const [apellidoMReg, setApellidoMReg] = useState('')
  const [telReg, setTelReg] = useState('')

  const submitCuenta = () => {
    Axios.post('http://localhost:3001/api/registro', {
      nombrePila: nombreReg,
      apellidoPat: apellidoPReg,
      apellidoMat: apellidoMReg,
      telCel: telReg
    }).then(() => {
      alert("Cuenta registrada")
    });
  };

  return (
    <div className="App">
      <div className="icon">
        <div className="icon_class"></div>
        <div className="text">Registro</div>
      </div>
      <div className="form">
        <div className='row m-2'>
          <div className='col-6 p-2'>
            <br/>
            <TextField type="text" name="nombreP" variant="outlined" label="Nombre" onChange={(e)=>{
              setNombreReg(e.target.value)
            }} fullWidth/>
          </div>
          <div className='col-6 p-2'>
            <br/>
            <TextField type="text" name="apellidoP" variant="outlined" label="Apellido Paterno" onChange={(e)=>{
              setApellidoPReg(e.target.value)
            }}/>
          </div>
          <div className='col-6 p-2'>
            <br/>
            <TextField type="text" name="apellidoM" variant="outlined" label="Apellido Materno" onChange={(e)=>{
              setApellidoMReg(e.target.value)
            }}/>
          </div>
          <div className='col-6 p-2'>
            <br/>
            <TextField type="text" name="telefono" variant="outlined" label="Teléfono" onChange={(e)=>{
              setTelReg(e.target.value)
            }}/>
          </div>
        </div>
        <br/>
        <Button onClick={submitCuenta} variant="contained" color="primary">Abrir Cuenta</Button>
      </div>
    </div>
  );
}

export default Registro;
