import React, { Component } from "react";
import "./styles/infoPlaylist.scss";
import "materialize-css";
import "materialize-css/dist/css/materialize.min.css";
import { Icon, Button, Modal, TextInput } from "react-materialize";
import { Link } from "react-router-dom";
import token from "./APIcontroller";

class InfoPlaylist extends Component {
  render() {
    return (
      <div className="InfoPlaylist row">
        <div className="center">
          <h2>Mis playlist</h2>
          <Modal
            actions={[
              <Button flat modal="close" node="button" waves="green" onClick={this.postPlaylist}>
                Agregar
              </Button>,
              <Button flat modal="close" node="button" waves="green">
                Cerrar
              </Button>,
            ]}
            bottomSheet={false}
            fixedFooter={false}
            header="Nueva PlayList"
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
              <Button
                className="red "
                floating
                icon={<Icon>add</Icon>}
                large
                node="button"
                waves="light"
                // onClick={this.postPlaylist}
              />
            }
          >
            <TextInput id="TextInput-4" label="Nombre" onChange={this.handleChangeName}/>
            <TextInput id="TextInput-4" label="Descripción" onChange={this.handleChangeDescription}/>

            
          </Modal>
        </div>
        <div className="item-list row center">
          {this.state.list.map((obj, index) => {
            return (
              <div className="col l3 m6 s12">
                <Link
                  to={{
                    pathname: "/playlist/" + obj.name,
                    state: {
                      id: obj.id,
                      img: obj.images[0] ? obj.images[0].url : "",
                    },
                  }}
                  className="column l4 m6 s12"
                >
                  <img
                    className=" responsive-img"
                    alt={"image " + obj.name}
                    src={obj.images[0] ? obj.images[0].url : ""}
                  />
                  <h3>{obj.name}</h3>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  constructor(props) {
    super();
    this.state = {
      list: [],
      userID: "",
      name: "",
      description: "",
    };
    this.getPlaylist();
    this.getProfile();
    this.handleChangeDescription = this.handleChangeDescription.bind(this)
    this.handleChangeName = this.handleChangeName.bind(this)
    
  }

  getPlaylist = () => {
    return fetch("https://api.spotify.com/v1/me/playlists", {
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
        console.log("info", info);
        this.setState({
          list: info,
        });
        return console.log(data);
      })
      .catch((error) => console.log(error));
  };

  componentDidUpdate(prevProps, prevState, snapshot){
    console.log('Update',prevState)
  }
  handleChangeName(event) {
    this.setState({ name: event.target.value });
  }
  handleChangeDescription(event) {
    this.setState({ description: event.target.value });
  }

  getProfile = () => {
    fetch("https://api.spotify.com/v1/me", {
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
        let id = data.id;
        this.setState({
          userID: id,
        });
        return console.log(data);
      })
      .catch((error) => console.log(error));
  };

  postPlaylist = () => {
    let data = {
      name: this.state.name,
      description: this.state.description,
      public: false,
    };

    fetch(
      "https://api.spotify.com/v1/users/" + this.state.userID + "/playlists",
      {
        method: "POST",
        headers: new Headers({
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        }),
        body: JSON.stringify(data),
      }
    )
      .then((response) => {
        console.log(response, "response");
        return response.json();
      })
      .then((data) => {
        this.getProfile()
        return console.log(data);
      })
      .catch((error) => console.log(error));
      
  };
}

export default InfoPlaylist;
