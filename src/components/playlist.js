import React, { Component } from "react";
import "./styles/playlist.scss";
import token from "./APIcontroller";
// import { Link } from "react-router-dom";
import "materialize-css/dist/css/materialize.min.css";
import "materialize-css";
import { Button, Modal } from "react-materialize";

class Playlist extends Component {
  render() {
    return (
      <div className="Playlist">
        <h2>{this.state.name}</h2>
        <p>{this.state.id}</p>
        <img
          className=" responsive-img"
          alt={this.state.name}
          src={this.state.img}
          width="200"
        />
        <h2>Canciones</h2>
        {console.log(this.state.songs)}
        {this.state.songs.map((obj, index) => {
          return (
            <div>
              <Modal
                actions={[
                  <Button flat modal="close" node="button" waves="green">
                    Close
                  </Button>,
                ]}
                bottomSheet={false}
                fixedFooter={false}
                header={obj.track.name + " - " + obj.track.artists[0].name}
                id="Modal-0"
                open={false}
                options={{
                  dismissible: true,
                  endingTop: "10%",
                  inDuration: 250,
                  onCloseEnd: null,
                  onCloseStart: null,
                  onOpenEnd: null,
                  onOpenStart: null,
                  opacity: 0.5,
                  outDuration: 250,
                  preventScrolling: true,
                  startingTop: "4%",
                }}
                trigger={<Button node="button">MODAL</Button>}
              >
                <img
                  className=" responsive-img"
                  alt={obj.track.album.name}
                  src={obj.track.album.images[0].url}
                  width="200"
                />
                <audio src={obj.track.previwe_url} controls autoplay loop>
                  <p>Tu navegador no implementa el elemento audio</p>
                </audio>
                <audio src={obj.track.previwe_url} autoplay>
                  Your browser does not support the <code>audio</code> element.
                </audio>
              </Modal>
            </div>
          );
        })}
      </div>
    );
  }
  constructor(props) {
    super();

    console.log("img", props.location);
    this.state = {
      name: props.match.params.name,
      id: props.location.state.id,
      img: props.location.state.img,
      songs: [],
    };
    this.getTracks();
  }

  getTracks = () => {
    fetch("https://api.spotify.com/v1/playlists/" + this.state.id + "/tracks", {
      headers: new Headers({
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      }),
    })
      .then((response) => {
        console.log(response, "response");
        return response.json();
      })
      .then((data) => {
        let info = data.items;
        console.log(info, "info");
        this.setState({
          songs: info,
        });
        return console.log(data);
      })
      .catch((error) => console.log(error));
  };
}

export default Playlist;
