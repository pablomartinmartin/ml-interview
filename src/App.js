import React, { useContext, useReducer} from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.scss";

import Breadcrumb from "./components/Breadcrumb/Breadcrumb";
import Nav from "./components/Nav/Nav";
import ProductPage from "./components/Product/ProductPage";
import ResultsPage from "./components/Results/ResultsPage";

import MlContext from './context';
import categoriesReducer from './reducer';

const App = () => {

  const initialState = useContext(MlContext);
  const [state, dispatch] = useReducer(categoriesReducer, initialState);

  return (
    <BrowserRouter>
      <MlContext.Provider value={{ state, dispatch}}>
        <Nav />
        <Breadcrumb />
        <div className="App">
          <Switch>
            <Route exact path="/items/:id" component={ProductPage} />
            <Route exact path="/items" component={ResultsPage} />
          </Switch>
        </div>
      </MlContext.Provider>
    </BrowserRouter>
  );
};

export default App;
