import React, { Fragment } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";



import MainMap from "../components/MainMap";
import NotFound from "../components/NotFound/NotFound";
import Navegacion from "../components/layout/Navegacion";

//import Login from "../components/auth/Login";

const route = () => {

  return (
    <BrowserRouter>
      <Fragment>
        <div className="grid contenedor contenido-principal">
          <Navegacion />
          <main className="caja-contenido col-9">
            <Switch>
              <Route exact path="/" component={MainMap} />
              <Route exact path="*" component={NotFound} />
            </Switch>
          </main>
        </div>
      </Fragment>
    </BrowserRouter>
  );
};

export default route;
