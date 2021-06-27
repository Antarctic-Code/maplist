import React, { useState, useEffect } from "react";
import clienteAxios from "../config/axios";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const mapStyle = {
  height: "100vh"
};




const MainMap = () => {
  const center = [9.004575579774295, -79.52108424083316];
  const [locations, setLocations] = useState([]);

  //user effect es similar a componetdidmont y willmount
  useEffect(() => {
    //Query a la API
    const consultaAPI = () => {
      clienteAxios
        .get("/place", {
          /*headers: {
            Authorization: `Bearer ${auth.token}`,
          },*/
        })
        .then((res) => {
          //colocar  resultado en el state
          setLocations(res.data);
        })/*
        .catch((err) => {
          if (err.response.sratus === 500) props.history.push("/login");
        });*/
    };
    consultaAPI();
  }, [locations]);
  
  return (
    <MapContainer center={center} zoom={19} style={mapStyle} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {locations.map((location) => (
          <Marker position={location.ubicacion.coordinates}>
            <Popup>
              <h1>{location.titulo}</h1>
              <p>{location.ubicacion.coordinates[0]},{location.ubicacion.coordinates[1]}</p>
            </Popup>
          </Marker>
      ))}

    </MapContainer>
  );
};

export default MainMap;
