import React, { useState, useEffect/*, useContext*/ } from "react";
import clienteAxios from "../../config/axios";
import Location from "./Location";
//import Spinner from "../layout/Spinner";

const Locations = () => {
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

  //Spinner de Carga
  //if(!locations.length) return <Spinner/>
  return (
    <nav> 
      {locations.map((location) => (
          <Location 
              key={location.id}
              location={location}
          />
      ))}
    </nav> 
);
};

export default Locations;
