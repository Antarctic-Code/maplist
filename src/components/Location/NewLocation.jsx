import React, { useState,useMemo,useRef,useEffect } from "react";
import clienteAxios from "../../config/axios";
import { MapContainer, TileLayer, Marker, Popup,useMap } from "react-leaflet";
import Swal from "sweetalert2";
import { withRouter } from "react-router-dom";
//Importar el context

const mapStyle = {
  height: '40vh',
  width: '100%'
};

const NewLocation = ({ history,match }) => {
  //Trabajar con el state
  // location = state, gurardarLocation  funciona para guardar el state
  const [location, gurardarLocation] = useState({
    titulo: "",
    direccion: "",
    lat: 9.004575579774295,
    lng: -79.52108424083316,
    userId: 1,
  });
  const mapRef = useRef();


  const {id}= match.params;

  if(id){
    console.log(id);
  }
  else {
    console.log('no id')
  }

  //user effect es similar a componetdidmont y willmount
  useEffect(() => {
    //Query a la API
    const consultaAPI = () => {
      clienteAxios
        .get("/place/"+id, {
          /*headers: {
            Authorization: `Bearer ${auth.token}`,
          },*/
        })
        .then((res) => {
          //colocar  resultado en el state
          gurardarLocation({
            titulo: res.data.titulo,
            direccion: res.data.direccion,
            lat: res.data.ubicacion.coordinates[0],
            lng: res.data.ubicacion.coordinates[1]
          });         
          console.log(res.data);
          //mapRef.current.setView([res.data.ubicacion.coordinates[0],res.data.ubicacion.coordinates[1]],19);

        })/*
        .catch((err) => {
          if (err.response.sratus === 500) props.history.push("/login");
        });*/
    };

    if(id){
    consultaAPI();
    }
    else {
      console.log('no id')
    }
  }, [id]);


 
  //Query a la API
  const handleSubmit = (e) => {
    e.preventDefault();
    if(id){      
      clienteAxios
      .put(
        "/place/"+id,
        location /*,{
                headers: {
                'Authorization': `Bearer ${auth.token}`
                }
            }*/
      )
      .then((res) => {
        //console.log('res :', res);
        Swal.fire(
          "Lugar Actualizado correctamente!",
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
    }
    else {
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

    }
  };

  const markerRef = useRef(null)
  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current
        if (marker != null) {
          const newmarket = marker.getLatLng();
          console.log(newmarket);
          console.log(location);
          gurardarLocation({
            ...location,
            lat: newmarket.lat,
            lng: newmarket.lng,
          });
        }
      },
    }),
    [location],
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
    <div class="container">
      <h2>Guardar Lugar</h2>
      <form onSubmit={handleSubmit}>        
        <legend>Llena todos los campos</legend>
        <div className="form-group">
          <label>Titulo:</label>
          <input
            className="form-control"
            type="text"
            placeholder="Nombre Location"
            name="titulo"
            value={location.titulo}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Direccion:</label>
          <input
            className="form-control"
            type="text"
            placeholder="Direccion"
            name="direccion"
            value={location.direccion}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">          
          <MapContainer ref={mapRef} center={[location.lat,location.lng]} zoom={19} style={mapStyle} scrollWheelZoom={false}>
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
        <div className="form-group">
          <label>Latitud:</label>
          <input
            className="form-control"
            type="number"
            placeholder="Latitud"
            name="lat"
            onChange={handleChange}
            value={location.lat}
          />
        </div>
        <div className="form-group">
          <label>Longitud:</label>
          <input
            className="form-control"
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
            className="btn btn-primary"
            value={id?'Actualizar Lugar':"Guardar Lugar"}
            disabled={validarLocation()}
          />
        </div>
      </form>
    </div>
  );
};

export default withRouter(NewLocation);
