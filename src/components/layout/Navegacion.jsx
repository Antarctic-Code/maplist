import React/*, { useState, useContext }*/ from 'react'
import { Link } from 'react-router-dom';
import Locations from '../Location/Locations';
//import { UserContext } from '../../context/UserContext';


const Navegacion = () => {
  //const [auth, guardarAuth] = useContext(UserContext);
  /*const [menu, gurardarMenu] = useState(true);  

  const handleClick =  () => {
    gurardarMenu(!menu)
  }   
  if (!auth.auth ) {    
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
    
    <aside className="sidebar">
      
      <Link to={"/"} className="btn btn-verde nvo-general"> 
        <i className="fas fa-home"></i>
        Home
      </Link>      
      <Link to={"/location"} className="btn btn-verde nvo-general"> 
        <i className="fas fa-plus-circle"></i>
        ADD
      </Link>
        <Locations/>
    </aside>
  );
};
export default Navegacion;

