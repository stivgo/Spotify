import React, { Component } from "react";
import { BrowserRouter, Route,Switch} from "react-router-dom";
import "./App.scss";
import Home from "./screen/home";
import PlaylistScreen from "./screen/playlistScreen";



class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route path="/" exact>
              <Home/>
            </Route>
          </Switch>
        </BrowserRouter> 
      </div>
    );
  }
}
export default App;
