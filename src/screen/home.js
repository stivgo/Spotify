import React, { Component } from "react";
import './styles/home.scss'
import InfoPlaylist from '../components/infoPlaylist'
import Profile from "../components/profile";

class Home extends Component {
  render() {
    return (
      <div className="Home">
          <Profile/>
          <InfoPlaylist/>
          
        
      </div>
    );
  }
}

export default Home;