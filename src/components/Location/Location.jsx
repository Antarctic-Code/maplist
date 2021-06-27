import React /*, {useContext}*/ from "react";
import { Link /*, withRouter*/ } from "react-router-dom";

const Location = (props) => {
  const { id, titulo } = props.location;

  return (
    <Link to={"/location/" + id} className="btn btn-azul">
      {titulo}
    </Link>
  );
};

export default Location;
