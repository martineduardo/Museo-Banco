import React, { useState } from 'react'
import './App.css'
import Axios from 'axios';
import {Formulario, ContenedorBotonCentrado, Boton, MensajeExito, MensajeError, Label} from './Elementos/Formulario';
import ComponenteInput from './Componentes/Input';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faExclamationTriangle} from '@fortawesome/free-solid-svg-icons';
import Popup from './Componentes/Popup'

function Prestamo() {

    const [nombreReg, setNombreReg] = useState('')
    const [importeReg, setImporteReg] = useState(0)
    const [motivoReg, setMotivoReg] = useState('')
    const [numCuentaReg, setNumCuentaReg] = useState(0)
    const [formularioValido, cambiarFormularioValido] = useState(null)
    const [botonPopup, setBotonPopup] = useState(false)

    const expresiones = {
        nombre: /^[a-zA-ZÁ-ÿ]{1,20}/,
        motivo: /^[a-zA-ZÁ-ÿ]{1,20}/,
        cuenta: /^\d{1,3}/,
        importe: /^\d/
    }

    const submitPrestamo = () => {
        Axios.post('http://localhost:3001/api/prestamo', {
            pNombre: nombreReg,
            importeP: importeReg,
            motivoP: motivoReg,
            numCuentaP: numCuentaReg
        }).then(() => {
            alert("Prestamo aprobado")
        });
        setNombreReg({campo: '', valido: null})
        setImporteReg({campo: 0, valido: null})
        setMotivoReg({campo: 0, valido: null})
        setNumCuentaReg({campo: '', valido: null})   
    }
    
    return(
        <div className="App">
            <div className="icon">
                <div className="icon_class"></div>
                <div className="text">Solicitud de préstamos monetarios</div>
            </div>
            <div className="form">
                <Formulario action="" onSubmit={submitPrestamo}>
                    <div>
                        <Label>Nombre</Label>
                        <input type="text" label="Nombre" placeholder='Nombre' name='nombre' onChange={(e) => {
                            setNombreReg(e.target.value)
                        }}></input>
                    </div>
                    <div>
                        <Label>Importe</Label>
                        <input type="number" label="Nombre" placeholder='' name='importe' onChange={(e) => {
                            setImporteReg(e.target.value)
                        }}></input>
                    </div>
                    <div>
                        <Label>Motivo</Label>
                        <input type="text" label="Nombre" placeholder='Motivo' name='motivo' onChange={(e) => {
                            setMotivoReg(e.target.value)
                        }}></input>
                    </div>
                    <div>
                        <Label>Num. Cuenta</Label>
                        <input type="number" label="Nombre" placeholder='' name='numCuenta' onChange={(e) => {
                            setNumCuentaReg(e.target.value)
                        }}></input>
                    </div>
                    {/*<ComponenteInput
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
                    />*/}
                    <ContenedorBotonCentrado>
                        <Boton type='submit' onClick={() => setBotonPopup(true)}>Solicitar Prestamo</Boton>
                        <Popup trigger={botonPopup} setTrigger={setBotonPopup}>
                            <h3>Éxito</h3>
                            <p>Solicitud enviada exitosamente</p>
                        </Popup>
                    </ContenedorBotonCentrado>
                </Formulario>
            </div>
        </div>
    );
}

export default Prestamo;