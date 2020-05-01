import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.scss";

import Nav from "./components/Nav/Nav";
import ProductPage from "./components/Product/ProductPage";
import ResultsPage from "./components/Results/ResultsPage";

const App = () => {
  return (
    <BrowserRouter>
      <Nav />
      <div className="App">
        <Switch>
          <Route exact path="/items/:id" component={ProductPage} />
          <Route exact path="/items" component={ResultsPage} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default App;
