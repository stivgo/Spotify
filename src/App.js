import React, { Component } from "react";
import { BrowserRouter, Route,Switch} from "react-router-dom";
import "./App.scss";
import NotFound from "./components/notFound";
import Playlist from "./components/playlist";
import Home from "./screen/home";
import PlaylistScreen from "./screen/playlistScreen";



class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route path="/" exact component={Home}/>
            <Route path="/playlist" exact component={PlaylistScreen}/>
            <Route path="/playlist/:name/" exact component={Playlist}/>
            <Route component={NotFound}/>
          </Switch>
        </BrowserRouter> 
      </div>
    );
  }
}
export default App;
