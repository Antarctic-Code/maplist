import React, { useState, useEffect,/* useContext,*/ Fragment } from 'react';
import clienteAxios from '../../config/axios';
import Swal from 'sweetalert2';
import { withRouter } from 'react-router-dom';
//Importar el context 

const EditarTipoDocumento = props => {
    const {id}= props.match.params

       //Trabajar con el state
    // tipoDocumento = state, gurardarTipoDocumento  funciona para guardar el state
    const [tipoDocumento, gurardarTipoDocumento] = useState({
        "titulo":'',
        "isActive": true,
    });

    //Query a la API
    const handleSubmit =  e => {
        e.preventDefault();
            clienteAxios.put('/national-id-type/'+tipoDocumento.id,tipoDocumento/*,{
                headers: {
                'Authorization': `Bearer ${auth.token}`
                }
            }*/)
            .then(res => {
                //console.log('res :', res);
                Swal.fire(
                    'Tipo de Documento Actualizado correctamente!',
                    'You clicked the button!',
                    'success'
                )
                //redireccionar 
                props.history.push('/tiposDocumentos');
            })
            .catch(err => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!',
                });
                 if (err.response.sratus === 500)  props.history.push('/');
            })
    }

    const handleChange = (e) => {
        gurardarTipoDocumento({
            //Actualuzamos el state agregando una copia del State actual
            ...tipoDocumento,
            [e.target.name]: e.target.type === "checkbox" ? e.target.checked : e.target.value});
    }

    //Validar el formulario
    const validarTipoDocumento = () => {
    return (tipoDocumento.nationalIdType.length===0);
    }

    //user effect es similar a componetdidmont y willmount
    useEffect(() => {
        //Query a la API Buscar uno
        const consultaAPI = async () => {

            // if(auth.token !== '' && auth.auth) {
    
                try {
                    const consulta = await clienteAxios.get('/national-id-type/'+id/*,{
                        headers: {
                        'Authorization': `Bearer ${auth.token}`
                        }
                    }*/);
                    //console.log('consulta: ', consulta.data)
                    //colocar  resultado en el state
                    gurardarTipoDocumento(consulta.data); 
                } catch (err) {
                    /* if (err.response.sratus === 500)*/  props.history.push('/');
    
                }
        /*  }
            else {
                props.history.push('/login');
            }*/
        }

        consultaAPI();
        /*return () => {
            cleanup
        }*/
    }, []);



    return (
        <Fragment>  
            <h2>Editar Tipo de Documento</h2>
            <form 
                onSubmit={handleSubmit}
            >
                <legend>Llena todos los campos</legend>
                <div className="campo">
                    <label>Tipo de Documento:</label>
                    <input
                        type="text" 
                        placeholder="Nombre TipoDocumento" 
                        value={tipoDocumento.nationalIdType}
                        name="nationalIdType" 
                        onChange={handleChange}
                        />
                </div>
                <div className="campo">
                    <label>Activo:</label>
                    <input type="checkbox" 
                        name="isActive" 
                        onChange={handleChange}
                        checked={tipoDocumento.isActive}
                    />
                </div>
                <div className="enviar">
                    <input
                        type="submit" 
                        className="btn btn-azul" 
                        value="Editar TipoDocumento" 
                        disabled={validarTipoDocumento()}
                    />
                </div>
            </form>
        </Fragment>
    );
};

export default withRouter(EditarTipoDocumento);