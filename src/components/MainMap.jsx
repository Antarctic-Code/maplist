import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const mapStyle = {
  height: "100vh"
};

const MainMap = () => {
  const position = [9.004575579774295, -79.52108424083316];
  return (
    <MapContainer center={position} zoom={19} style={mapStyle}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default MainMap;
