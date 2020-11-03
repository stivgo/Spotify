import React, { Component } from "react";
import InfoPlaylist from "../components/infoPlaylist";
import './styles/playlistScreen.scss'

class PlaylistScreen extends Component {
  render() {
    return (
      <div className="PlaylistScreen">
        <InfoPlaylist/>
      </div>
    );
  }
}

export default PlaylistScreen;