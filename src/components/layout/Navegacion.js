import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom';
//import { UserContext } from '../../context/UserContext';


const Navegacion = () => {
  //const [auth, guardarAuth] = useContext(UserContext);
  const [menu, gurardarMenu] = useState(false);  

  const handleClick =  () => {
    gurardarMenu(!menu)
  }   
  /*if (!auth.auth ) {    
    const token = localStorage.getItem('token')
    if (token) {
      guardarAuth({
        token,
        auth:true
      })
    }
    if (!auth.auth ) return null;
  }*/

  return (
    <aside className="sidebar col-3">
      <button 
      className="menu"
        type="button" 
        onClick={handleClick}                
      >
        <i className="fas fa-bars" />
      </button>
      { menu ? (
      <nav className="navegacion">
        <Link to={"/clientes"} className="generales">Clientes</Link>
        <Link to={"/ordenes"} className="generales">Ordenes</Link>
        <Link to={"/transacciones"} className="generales">Transacciones</Link>
        <Link to={"/cargos"} className="generales">Cargos</Link>
        <Link to={"/tasas"} className="generales">Tasas</Link>
        <Link to={"/usuarios"} className="generales">Usuarios</Link>
        <Link to={"/sucursales"} className="generales">Sucursales</Link>
        <Link to={"/grupos"} className="generales">Grupos</Link>
        <Link to={"/monedas"} className="generales">Monedas</Link>
        <Link to={"/cuentas"} className="generales">Cuentas</Link>
        <Link to={"/bancos"} className="generales">Bancos</Link>
        <Link to={"/tiposCuentas"} className="generales">Tipos de Cuentas</Link>
        <Link to={"/ocupaciones"} className="generales">Ocupaciones</Link>
        <Link to={"/tiposDocumentos"} className="generales">Tipos de Documentos</Link>
        <Link to={"/clientes"} className="generales">Clientes</Link>
        <Link to={"/ordenes"} className="generales">Ordenes</Link>
        <Link to={"/transacciones"} className="generales">Transacciones</Link>
        <Link to={"/cargos"} className="generales">Cargos</Link>
        <Link to={"/tasas"} className="generales">Tasas</Link>
        <Link to={"/usuarios"} className="generales">Usuarios</Link>
        <Link to={"/sucursales"} className="generales">Sucursales</Link>
        <Link to={"/grupos"} className="generales">Grupos</Link>
        <Link to={"/monedas"} className="generales">Monedas</Link>
        <Link to={"/cuentas"} className="generales">Cuentas</Link>
        <Link to={"/bancos"} className="generales">Bancos</Link>
        <Link to={"/tiposCuentas"} className="generales">Tipos de Cuentas</Link>
        <Link to={"/ocupaciones"} className="generales">Ocupaciones</Link>
        <Link to={"/tiposDocumentos"} className="generales">Tipos de Documentos</Link>
        <Link to={"/clientes"} className="generales">Clientes</Link>
        <Link to={"/ordenes"} className="generales">Ordenes</Link>
        <Link to={"/transacciones"} className="generales">Transacciones</Link>
        <Link to={"/cargos"} className="generales">Cargos</Link>
        <Link to={"/tasas"} className="generales">Tasas</Link>
        <Link to={"/usuarios"} className="generales">Usuarios</Link>
        <Link to={"/sucursales"} className="generales">Sucursales</Link>
        <Link to={"/grupos"} className="generales">Grupos</Link>
        <Link to={"/monedas"} className="generales">Monedas</Link>
        <Link to={"/cuentas"} className="generales">Cuentas</Link>
        <Link to={"/bancos"} className="generales">Bancos</Link>
        <Link to={"/tiposCuentas"} className="generales">Tipos de Cuentas</Link>
        <Link to={"/ocupaciones"} className="generales">Ocupaciones</Link>
        <Link to={"/tiposDocumentos"} className="generales">Tipos de Documentos</Link>
        <Link to={"/clientes"} className="generales">Clientes</Link>
        <Link to={"/ordenes"} className="generales">Ordenes</Link>
        <Link to={"/transacciones"} className="generales">Transacciones</Link>
        <Link to={"/cargos"} className="generales">Cargos</Link>
        <Link to={"/tasas"} className="generales">Tasas</Link>
        <Link to={"/usuarios"} className="generales">Usuarios</Link>
        <Link to={"/sucursales"} className="generales">Sucursales</Link>
        <Link to={"/grupos"} className="generales">Grupos</Link>
        <Link to={"/monedas"} className="generales">Monedas</Link>
        <Link to={"/cuentas"} className="generales">Cuentas</Link>
        <Link to={"/bancos"} className="generales">Bancos</Link>
        <Link to={"/tiposCuentas"} className="generales">Tipos de Cuentas</Link>
        <Link to={"/ocupaciones"} className="generales">Ocupaciones</Link>
        <Link to={"/tiposDocumentos"} className="generales">Tipos de Documentos</Link>
      </nav>
      ) : ''}
    </aside>
  );
};
export default Navegacion;

