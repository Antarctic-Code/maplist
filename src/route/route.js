import React, { Fragment } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";



import MainMap from "../components/MainMap";
import NotFound from "../components/NotFound/NotFound";
import NewLocation from "../components/Location/NewLocation";
import Navegacion from "../components/layout/Navegacion";

//import Login from "../components/auth/Login";

const route = () => {

  return (
    <BrowserRouter>
      <Fragment>
        <Navegacion />
        <div className="content">          
            <Switch>
              <Route exact path="/" component={MainMap} />
              <Route exact path="/location" component={NewLocation} />
              <Route exact path="/location/:id" component={NewLocation} />
              <Route exact path="*" component={NotFound} />
            </Switch>
        </div>
      </Fragment>
    </BrowserRouter>
  );
};

export default route;
