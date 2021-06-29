import React, { useState, useEffect,useMemo,useRef } from "react";
import clienteAxios from "../../config/axios";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import Swal from "sweetalert2";
import { withRouter } from "react-router-dom";
//Importar el context

const mapStyle = {
  height: '40vh',
  width: '60vh'
};

const NewLocation = ({ history }) => {
  //Trabajar con el state
  // location = state, gurardarLocation  funciona para guardar el state
  const [location, gurardarLocation] = useState({
    titulo: "",
    direccion: "",
    lat: 9.004575579774295,
    lng: -79.52108424083316,
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

  const markerRef = useRef(null)
  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current
        if (marker != null) {
          const newmarket = marker.getLatLng();
          console.log(newmarket)
          gurardarLocation({
            ...location,
            lat: newmarket.lat,
            lng: newmarket.lng,
          });
        }
      },
    }),
    [],
  )

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
      location.titulo.length && location.direccion.length;
    return !valido;
  };

  return (
    <>
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
          <MapContainer center={[location.lat, location.lng]} zoom={19} style={mapStyle} scrollWheelZoom={false}>
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker 
              position={[location.lat, location.lng]}
              draggable
              eventHandlers={eventHandlers}
              ref={markerRef}
            >
              <Popup>
                <h1>{location.titulo}</h1>
                <p>{location.lat},{location.lng}</p>
              </Popup>
            </Marker>
          </MapContainer>
        </div>
        <div className="campo">
          <label>Latitud:</label>
          <input
            type="number"
            placeholder="Latitud"
            name="lat"
            onChange={handleChange}
            value={location.lat}
          />
        </div>
        <div className="campo">
          <label>Longitud:</label>
          <input
            type="number"
            placeholder="Longitud"
            name="lng"
            onChange={handleChange}
            value={location.lng}
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
    </>
  );
};

export default withRouter(NewLocation);
