import React from 'react';
import {Input, Label, GrupoInput, LeyendaError, IconoValidacion,} from './../Elementos/Formulario';
import { faCheckCircle} from '@fortawesome/free-solid-svg-icons';

const ComponenteInput = ({estado, cambiarEstado, tipo, label, placeholder, name, leyendaError, expresionRegular}) => {
    const onChange = (e) => {
        cambiarEstado({...estado, campo: e.target.value});
    }
    
    const validacion = () => {
        if(expresionRegular.test(estado.campo)){
            cambiarEstado({...estado, valido: 'true'});
        }
        else {
            cambiarEstado({...estado, valido: 'false'});
        }
    }

    return (
        <div>
            <Label htmlFor={name}>{label}</Label>
            <GrupoInput>
                <Input
                    type={tipo}
                    name={name}
                    placeholder={placeholder}
                    estado={estado.campo}
                    onChange={onChange}
                    onKeyUp={validacion}
                    onBlur={validacion}
                    valido={estado.valido}
                />
                <IconoValidacion icon = {faCheckCircle}/>
            </GrupoInput>
            <LeyendaError valido={estado.valido}>{leyendaError}</LeyendaError>
        </div>
    );
}

export default ComponenteInput;
