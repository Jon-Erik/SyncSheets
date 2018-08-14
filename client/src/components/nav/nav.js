import React, { Component } from "react";
import API from "../../utils/API.js";
import Logo from "../../assets/images/eliteSheetsLogo.png";

class Nav extends Component {
  
  state = {
    userName: "",
    userEmail: ""
  }

  getUserData = () => {
    let pathArray = window.location.pathname.split("/");

    API.getUserData()
    .then((res) => {
     
      if (res.data.name === undefined &&
        pathArray[1] !== "login" &&
        pathArray[1] !== "" &&
        pathArray[1] !== "signup") {
        window.location.replace("/login");
      } else {
        this.setState({
          userName: res.data.name,
          userEmail: res.data.email,
          //userId: res.data.id
        })
      }
    }).catch((err) => {
      console.log(err);
    })
  }

  logout = event => {
    event.preventDefault();

    API.logout()
    .then((res) => {
      console.log(res)
      this.setState({
        username: ""
      })
      window.location.replace("/login");
    }).catch((err) => {
      console.log(err);
    })
  }

  componentDidMount () {
    this.getUserData();
  }

  render() {
    return (
      <nav class="navbar navbar-expand-sm navbar-light bg-light">
        <a class="navbar-brand" href="/">SyncSheets</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              {!this.state.userName ? (
                <a class="nav-link" href="/login">Login</a>
              ) : (
                <a class="nav-link" href="/accountinfo">Welcome, {this.state.userName}</a>
              )}
            </li>
            <li class="nav-item">
              {!this.state.userName ? (
                <a class="nav-link" href="/signup">Sign Up</a>
              ) : (
                <a class="nav-link" href="/accountinfo">Account Info</a>
              )}
            </li>
            <li class="nav-item">
              <a class="nav-link" href="" onClick={this.logout}>Log Out</a>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Nav;