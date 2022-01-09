import React from 'react';
import './App.css';
import Estado_Cuenta from './Estado_Cuenta';
import Registro from './Registro';
import {Routes,Route} from 'react-router-dom';
import Prestamo from './Prestamo';

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path="/registro" exact element={<Registro/>}/>
        <Route path="/estado_de_cuenta" exact element={<Estado_Cuenta/>}/>
        <Route path="/prestamo" exact element={<Prestamo/>}/>
      </Routes>
    </div>
  );
}

export default App;
