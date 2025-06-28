import {useState} from 'react'
import reactLogo from './assets/react.svg'
import workintech from "./assets/workintech.svg";
import './App.css'
import Home from "./Home"
import Order from './Order'
import Success from './Success'
import { BrowserRouter, Switch, Route} from "react-router-dom";


function App() {
  return (
    <BrowserRouter>
    <Switch>
      <Route exact path ="/" component={Home} />
      <Route path="/order" component={Order} />
      <Route path="/success" component={Success} />
    </Switch>
    </BrowserRouter>
  );
}

export default App
