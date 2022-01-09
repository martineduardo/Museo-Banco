import React, { useState } from 'react'
import './App.css'
import Axios from 'axios';
import {Formulario, ContenedorBotonCentrado, Boton, MensajeExito, MensajeError} from './Elementos/Formulario';
import ComponenteInput from './Componentes/Input';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faExclamationTriangle} from '@fortawesome/free-solid-svg-icons';

function Prestamo() {

    const [nombreReg, setNombreReg] = useState({campo: '', valido: null})
    const [importeReg, setImporteReg] = useState({campo: 0, valido: null})
    const [motivoReg, setMotivoReg] = useState({campo:'', valido: null})
    const [numCuentaReg, setNumCuentaReg] = useState({campo: 0, valido: null})
    const [formularioValido, cambiarFormularioValido] = useState(null)

    const expresiones = {
        nombre: /^[a-zA-ZÁ-ÿ]{1,20}/,
        motivo: /^[a-zA-ZÁ-ÿ]{1,20}/,
        cuenta: /^\d{1,3}/,
        importe: /^\d/
    }

    const submitPrestamo = (e) => {
        e.preventDefault()
        if(
            nombreReg === 'true' &&
            importeReg === 'true' &&
            motivoReg === 'true' &&
            numCuentaReg === 'true'
            ) {
            cambiarFormularioValido(true);
            Axios.post('http://localhost:3001/api/prestamo', {
                pNombre: nombreReg.campo,
                importeP: importeReg.campo,
                motivoP: motivoReg.campo,
                numCuentaP: numCuentaReg.campo
            }).then(() => {
                alert("Prestamo aprobado")
            });
            setNombreReg({campo: '', valido: null})
            setImporteReg({campo: 0, valido: null})
            setMotivoReg({campo: 0, valido: null})
            setNumCuentaReg({campo: '', valido: null})
        }
        else {
            cambiarFormularioValido(false);
        }
    }
    
    return(
        <div className="App">
            <div className="icon">
                <div className="icon_class"></div>
                <div className="text">Solicitud de préstamos monetarios</div>
            </div>
            <div className="form">
                <Formulario action="" onSubmit={submitPrestamo}>
                    <ComponenteInput
                        estado={nombreReg}
                        cambiarEstado={setNombreReg}
                        tipo="text"
                        label="Nombre"
                        placeholder="Nombre"
                        name="nombre"
                        expresionRegular={expresiones.nombre}
                    />
                    <ComponenteInput
                        estado={importeReg}
                        cambiarEstado={setImporteReg}
                        tipo="number"
                        label="Importe"
                        placeholder=""
                        name="importe"
                        expresionRegular={expresiones.importe}
                    />
                    <ComponenteInput
                        estado={motivoReg}
                        cambiarEstado={setMotivoReg}
                        tipo="text"
                        label="Motivo"
                        placeholder="Motivo"
                        name="motivo"
                        expresionRegular={expresiones.nombre}
                    />
                    <ComponenteInput
                       estado={numCuentaReg}
                       cambiarEstado={setNumCuentaReg}
                        tipo="number"
                        label="Num. Cuenta"
                        placeholder="Num. Cuenta"
                        name="numCuenta"
                        expresionRegular={expresiones.cuenta}
                    />
                    {formularioValido === false && <MensajeError>
                        <p>
                            <FontAwesomeIcon icon={faExclamationTriangle}/>
                            <b>Error:</b> Por favor rellene el formulario correctamente.
                        </p>
                    </MensajeError>}
                    <ContenedorBotonCentrado>
                        <Boton type='submit'>Solicitar Prestamo</Boton>
                        {formularioValido === true &&<MensajeExito>Solicitud enviada con éxito.</MensajeExito>}
                    </ContenedorBotonCentrado>
                </Formulario>
            </div>
        </div>
    );
}

export default Prestamo;