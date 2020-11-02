import React, { Component } from "react";
import "./styles/infoPlaylist.scss";
import "materialize-css/dist/css/materialize.min.css";
import { MediaBox } from "react-materialize";
import { Link } from "react-router-dom";

const token ="BQDTYj-CLsddVBQit2urOeIfR-Ov5F4-XdVGjncgVC1RbLe-vBCmYyiePvIrgbV8BWdHYbqgKg6tZuzsYPB0AZO1u9XVLL7MHq2iwjeXMh0nqTN9nvqrctHoVp3OnaoXd6SaQiWxfH5mxGoYqw1GUmERoV5mrf2lBCapWZk8JLrLA9if1jwBArCf4qbULyLxWmpBss2G27RbXdfwcr_llU1sjR1KwmAPEsS13L4JRwWOWijncKzXPahVk2qFaEGKiwN3jqvO8dZrhu4reiNHmITIvIBt-mc1RABVoGW-9lw";

class InfoPlaylist extends Component {
  render() {
    return (
      <div className="InfoPlaylist row">
        <h2 className="center">Mis playlist</h2>
        <div className="item-list">
          {this.state.list.map((obj, index) => {
            return (
              <Link to={"/playlist/"+obj.name}>
                <div>
                  <img
                    className=" responsive-img"
                    alt={"image " + obj.name}
                    src={obj.images[0].url}
                    width="200"
                  />
                  <h3>{obj.name}</h3>
                </div>
              </Link>
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
    };
    this.getPlaylist();
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
}

export default InfoPlaylist;
