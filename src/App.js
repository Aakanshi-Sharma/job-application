import "./App.css";
import { Fragment } from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Description from "./pages/Description";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Fragment>
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/description/:productId">
          <Description />
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </Fragment>
  );
}

export default App;
