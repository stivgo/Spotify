import React, { Component } from "react";
import "./styles/profile.scss";
import "materialize-css/dist/css/materialize.min.css";
import "materialize-css"
import { MediaBox } from "react-materialize";
import userProfile from "../assets/img/user.png";
import token from './APIcontroller'

class Profile extends Component {
  render() {
    return (
      <div className="Profile row">
        <h1>Mi perfil</h1>

        <MediaBox
          id="MediaBox_7"
          options={{
            inDuration: 275,
            onCloseEnd: null,
            onCloseStart: null,
            onOpenEnd: null,
            onOpenStart: null,
            outDuration: 200,
          }}
        >
        <img
          className="circle responsive-img"
          alt="profile"
          src={this.state.imageProfile}
          width="200"
        />
        </MediaBox>
        <h2 className="center col s12 ">{this.state.userName}</h2>
        <div className="pais">
          <h2 className="center col s12">{this.state.country}</h2>
          <img
            className=" responsive-img"
            alt="country"
            src={this.state.imageCountry}
            width="50"
          />
        </div>
        <h2 className="center col s12">{this.state.email}</h2>
      </div>
    );
  }

  constructor(props) {
    super();
    this.state = {
      imageProfile: userProfile,
      userName: "",
      country: "",
      email: "",
      imageCountry: "",
    };
    this.getProfile();
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
        let username = data.display_name;
        let country = data.country;
        let email = data.email;
        let image = data.images;
        console.log(image);
        if (image.length === 0) {
          image = userProfile;
        }
        let imageCountry =
          "https://flagcdn.com/16x12/" + country.toLowerCase() + ".png";
        this.setState({
          userName: username,
          country: country,
          email: email,
          imageProfile: image,
          imageCountry: imageCountry,
        });
        return console.log(data);
      })
      .catch((error) => console.log(error));
  };
}

export default Profile;
