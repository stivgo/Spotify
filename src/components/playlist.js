import React, { Component } from "react";
import "./styles/playlist.scss";
import token from "./APIcontroller";
// import { Link } from "react-router-dom";
import "materialize-css/dist/css/materialize.min.css";
import "materialize-css";
import { Button, Modal, Icon } from "react-materialize";

class Playlist extends Component {
  render() {
    return (
      <div className="Playlist center">
        <div>
        <h2>{this.state.name}</h2>
        <Button
          className="red"
          floating
          icon={<Icon>update</Icon>}
          large
          node="button"
          waves="light"
          
        />
        
        <Button
          className="red"
          floating
          icon={<Icon>delete</Icon>}
          large
          node="button"
          waves="light"
        />
        </div>
        <img
          className=" center responsive-img "
          alt={this.state.name}
          src={this.state.img}
          width="300"
        />
        <h2>Canciones</h2>
        {console.log(this.state.songs)}
        <div className="songs row">
          {this.state.songs.map((obj, index) => {
            return (
              <div className="col s12 m5 l3 ">
                <Modal
                  actions={[
                    <Button flat modal="close" node="button" waves="green">
                      Cerrar
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
                  trigger={
                    <Button node="button">
                      <img
                        alt={obj.track.album.name}
                        src={obj.track.album.images[0].url}
                        width="200"
                      />
                    </Button>
                  }
                >
                  <img
                    className=" responsive-img"
                    alt={obj.track.album.name}
                    src={obj.track.album.images[0].url}
                    width="200"
                  />
                  <audio src={obj.track.preview_url} controls>
                    <p>Tu navegador no implementa el elemento audio</p>
                  </audio>
                </Modal>
              </div>
            );
          })}
        </div>
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
      userID:"",
    };
    this.getTracks();
  }
  shouldComponentUpdate(){
    return true
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
