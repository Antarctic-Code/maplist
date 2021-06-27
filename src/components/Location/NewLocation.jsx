import React, { useState, /*useContext,*/ Fragment } from "react";
import clienteAxios from "../../config/axios";
import Swal from "sweetalert2";
import { withRouter } from "react-router-dom";
//Importar el context

const NewLocation = ({ history }) => {
  //Trabajar con el state
  // location = state, gurardarLocation  funciona para guardar el state
  const [location, gurardarLocation] = useState({
    titulo: "",
    direccion: "",
    lat: 0,
    lng: 0,
    userId: 1,
  });

  //Query a la API
  const handleSubmit = (e) => {
    e.preventDefault();
    clienteAxios
      .post(
        "/place",
        location /*,{
                headers: {
                'Authorization': `Bearer ${auth.token}`
                }
            }*/
      )
      .then((res) => {
        //console.log('res :', res);
        Swal.fire(
          "Lugar Guardado correctamente!",
          "You clicked the button!",
          "success"
        );
        //redireccionar
        history.push("/");
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
      });
  };

  const handleChange = (e) => {
    gurardarLocation({
      //Actualuzamos el state agregando una copia del State actual
      ...location,
      [e.target.name]: e.target.value,
    });
  };

  //Validar el formulario
  const validarLocation = () => {
    let valido =
      location.titulo.length && location.direccion.length && location.lat>0 && location.lng>0;
    return !valido;
  };

  return (
    <Fragment>
      <h2>Guardar Lugar</h2>
      <form onSubmit={handleSubmit}>
        <legend>Llena todos los campos</legend>
        <div className="campo">
          <label>Titulo:</label>
          <input
            type="text"
            placeholder="Nombre Location"
            name="titulo"
            onChange={handleChange}
          />
        </div>
        <div className="campo">
          <label>Direccion:</label>
          <input
            type="text"
            placeholder="Direccion"
            name="direccion"
            onChange={handleChange}
          />
        </div>
        <div className="campo">
          <label>Latitud:</label>
          <input
            type="number"
            placeholder="Latitud"
            name="lat"
            onChange={handleChange}
          />
        </div>
        <div className="campo">
          <label>Longitud:</label>
          <input
            type="number"
            placeholder="Longitud"
            name="lng"
            onChange={handleChange}
          />
        </div>
        <div className="enviar">
          <input
            type="submit"
            className="btn btn-azul"
            value="Guardar Lugar"
            disabled={validarLocation()}
          />
        </div>
      </form>
    </Fragment>
  );
};

export default withRouter(NewLocation);
