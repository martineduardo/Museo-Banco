import React, { useState, useEffect } from 'react';
import './App.css';
import {Button} from '@material-ui/core';
import Axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {Formulario, ContenedorBotonCentrado, Boton, MensajeExito, MensajeError} from './Elementos/Formulario';
import {faExclamationTriangle} from '@fortawesome/free-solid-svg-icons';
import ComponenteInput from './Componentes/Input';
import Popup from './Componentes/Popup'

function Registro() {

  const [nombreReg, setNombreReg] = useState({campo: '', valido: null})
  const [apellidoPReg, setApellidoPReg] = useState({campo: '', valido: null})
  const [apellidoMReg, setApellidoMReg] = useState({campo: '', valido: null})
  const [telReg, setTelReg] = useState({campo: '', valido: null})
  const [formularioValido, cambiarFormularioValido] = useState(null)
  const [botonPopup, setBotonPopup] = useState(false)

  const submitCuenta = (e) => {
    e.preventDefault()
    if(
      nombreReg.valido === 'true' &&
      apellidoPReg.valido === 'true' &&
      apellidoMReg.valido === 'true' &&
      telReg.valido === 'true') {
        cambiarFormularioValido(true);
        Axios.post('http://localhost:3001/api/registro', {
        nombrePila: nombreReg.campo,
        apellidoPat: apellidoPReg.campo,
        apellidoMat: apellidoMReg.campo,
        telCel: telReg.campo
      }).then(() => {
        alert("Cuenta registrada")
      });
      setNombreReg({campo: '', valido: null})
      setApellidoPReg({campo: '', valido: null})
      setApellidoMReg({campo: '', valido: null})
      setTelReg({campo: '', valido: null})
      }
      else {
        cambiarFormularioValido(false);
      }

    /*Axios.post('http://localhost:3001/api/registro', {
      nombrePila: nombreReg.campo,
      apellidoPat: apellidoPReg.campo,
      apellidoMat: apellidoMReg.campo,
      telCel: telReg.campo
    }).then(() => {
      alert("Cuenta registrada")
    });*/
  };

  /*const onSubmit = (e) => {
    e.preventDefault();
  }*/

  const expresiones = {
    nombre: /^[a-zA-ZÁ-ÿ]{3,20}/,
    apellido: /^[a-zA-ZÁ-ÿ]{3,16}/,
    telefono: /^\d{10}/
  }

  return (
    <div className="App">
      <div className="icon">
        <div className="icon_class"></div>
        <div className="text">Registro</div>
        
      </div>
      <div className="form">
        <Formulario action="" onSubmit={submitCuenta}>
          <ComponenteInput
            estado={nombreReg}
            cambiarEstado={setNombreReg}
            tipo="text"
            label="Nombre"
            placeholder="Nombre"
            name="nombreP"
            leyendaError="El nombre debe contener únicamente letras."
            expresionRegular={expresiones.nombre}
          />
          <ComponenteInput
          estado={apellidoPReg}
          cambiarEstado={setApellidoPReg}
            tipo="text"
            label="Apellido Paterno"
            placeholder="Apellido P."
            name="apellidoP"
            leyendaError="El apellido debe contener únicamente letras."
            expresionRegular={expresiones.apellido}
          />
          <ComponenteInput
          estado={apellidoMReg}
          cambiarEstado={setApellidoMReg}
            tipo="text"
            label="Apellido Materno"
            placeholder="Apellido M."
            name="apellidoM"
            leyendaError="El apellido debe contener únicamente letras."
            expresionRegular={expresiones.apellido}
          />
          <ComponenteInput
          estado={telReg}
          cambiarEstado={setTelReg}
            tipo="text"
            label="Teléfono"
            placeholder="Tel."
            name="telefono"
            leyendaError="El teléfono debe contener únicamente números. Debe ser de 10 dígitos."
            expresionRegular={expresiones.telefono}
          />
          <Popup trigger={botonPopup} setTrigger={setBotonPopup}>
            <h3>Mi popup</h3>
            <p>Esta es mi ventana emergente</p>
          </Popup>
          {formularioValido === false && <MensajeError>
            <p>
              <FontAwesomeIcon icon={faExclamationTriangle}/>
              <b>Error:</b> Por favor rellene el formulario correctamenrte.
            </p>
          </MensajeError>}
          <br/>
          <ContenedorBotonCentrado>
            <Boton type="submit" onClick={() => setBotonPopup(true)}>Abrir Cuenta</Boton>
            <br/>
            {formularioValido === true &&<MensajeExito>Cuenta registrada exitosamente.</MensajeExito>}
          </ContenedorBotonCentrado>
        </Formulario>
        <br/>
      </div>
    </div>
  );
}

export default Registro;
