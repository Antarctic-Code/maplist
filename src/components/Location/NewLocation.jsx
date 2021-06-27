import React, { useState, /*useContext,*/ Fragment } from 'react';
import clienteAxios from '../../config/axios';
import Swal from 'sweetalert2';
import { withRouter } from 'react-router-dom';
//Importar el context 

const NewLocation = ({history}) => {

       //Trabajar con el state
    // tlocation = state, gurardarLocation  funciona para guardar el state
    const [tlocation, gurardarLocation] = useState({
        nationalIdType:'',
    });

    //Query a la API
    const handleSubmit =  e => {
        e.preventDefault();
            clienteAxios.post('/national-id-type',tlocation/*,{
                headers: {
                'Authorization': `Bearer ${auth.token}`
                }
            }*/)
            .then(res => {
                //console.log('res :', res);
                Swal.fire(
                    'Tipo de Documento creado correctamente!',
                    'You clicked the button!',
                    'success'
                )
                //redireccionar 
                history.push('/tiposDocumentos');
            })
            .catch(err => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!',
                });
            })
    }

    const handleChange = (e) => {
        gurardarLocation({
            //Actualuzamos el state agregando una copia del State actual
            ...tlocation,
            [e.target.name]:e.target.value});
    }

    //Validar el formulario
    const validarLocation = () => {
    let valido=true;
    Object.values(tlocation).forEach((value) =>{
        valido = valido && value.length;
        //console.log('value :', value);
    });
    return !valido;
    }





    return (
        <Fragment>  
            <h2>Nuevo Tipo de Documento</h2>
            <form 
                onSubmit={handleSubmit}
            >
                <legend>Llena todos los campos</legend>
                <div className="campo">
                    <label>Tipo de Documento:</label>
                    <input
                        type="text" 
                        placeholder="Nombre Location" 
                        name="nationalIdType" 
                        onChange={handleChange}
                        />
                </div>
                <div className="enviar">
                    <input
                        type="submit" 
                        className="btn btn-azul" 
                        value="Agregar Location" 
                        disabled={validarLocation()}
                    />
                </div>
            </form>
        </Fragment>
    );
};

export default withRouter(NewLocation);