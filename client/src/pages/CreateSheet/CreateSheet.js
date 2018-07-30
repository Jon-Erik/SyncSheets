import React, { Component } from "react";
import API from "../../utils/API.js"
import InvoiceModal from "../../components/InvoiceModal";
import Table from "../../components/Table";
import { Input, TextArea, FormBtn, FormBtnLeft, FormBtnRight } from "../../components/Form";

class CreateSheet extends Component {

    state = {
        newSheetTitle: "",
        userName: "",
        userEmail: "",
        userId: "",
        createdSheets: [],
        sharedSheets: [],
        newSheetName: "",
        otherUsers: []
      }
    
      getUserData = () => {
        API.getUserData()
        .then((res) => {
          //console.log(res.data.email);
          if (res.data.name === undefined) {
            window.location.replace("/login");
          } else {
            this.setState({
              userName: res.data.name,
              userEmail: res.data.email,
              userId: res.data.id
            })
          }
        }).catch((err) => {
          console.log(err);
        })
      }
    
      createSheet = event => {
        event.preventDefault();
        
        let sheetData = {
          newSheetName: this.state.newSheetName,
          // userId: this.state.userId
        }
    
        if (this.state.newSheetName !== "") {
          console.log(sheetData)
    
          API.createSheet(sheetData)
          .then((res) => {
            let newSheet = res.data;
            let updatedSheets = this.state.createdSheets.push(newSheet);
            alert("New Sheet Created")
            // console.log("updated created sheets-------")
            // console.log(this.state.createdSheets);
          })
        } 
      }
    
      viewCreated = () => {
        API.viewCreatedSheets()
        .then((res) => {
          let createdSheets = res.data;
          this.setState({
            createdSheets: createdSheets
          })
          console.log("Here are the sheets this user has created-----");
          console.log(this.state.createdSheets);
        })
      }
    
      viewShared = () => {
        API.viewSharedSheets()
        .then((res) => {
          let sharedSheets = res.data;
          this.setState({
            sharedSheets: sharedSheets
          })
          console.log("Here are the shared sheets for this user-----")
          console.log(this.state.sharedSheets);
        })
      }
    
      viewOtherUsers = () => {
        API.viewOtherUsers().
        then((res) => {
          let otherUsers = res.data;
          this.setState({
            otherUsers: otherUsers
          }); 
          // console.log("Here are the other users signed up for elitesheets------");
          // console.log(this.state.otherUsers);
        })
      }
    
      grantAccess = event => {
        //Kristen: I'll let you figure out exactly how how you want to get the sheetId and the other user's Id. Just put the data in an object:
    
        let sheetData = {
          sheetId: "",
          otherUserId: "",
          creatorUserId: ""//this is logged in user id
        }
    
        API.grantAccess(sheetData)
        .then((res) => {
          console.log('access granted to ' + sheetData.otherUserId + " for sheet " + sheetData.sheetId);
          alert("Access granted.")
          this.viewCreated();
        }).catch((err) => {
          console.log(err);
          alert("There was an error with the server. Please try again.")
        })
        
      }
    
      withdrawAccess = event => {
        //Kristen: I'll let you figure out exactly how how you want to get the sheetId and the other user's Id. Just put the data in an object:
    
        let sheetData = {
          sheetId: "",
          otherUserId: "",
          creatorUserId: ""//this is logged in user id
        }
    
        API.withdrawAccess(sheetData)
        .then((res) => {
          console.log("access withdrawn from sheet " + sheetData.sheetId + " for user " + sheetData.creatorUserId)
        }).catch((err) => {
          console.log(err);
          alert("There was an error with the server. Please try again.")
        })
      }
    
      viewSheet = event => {
        let userId = this.state.userId;
        let sheetId = "";
    
        window.location.replace("/viewchart/" + sheetId + "/" + userId);
      }
    
      componentDidMount() {
        this.getUserData();
        this.viewCreated();
        this.viewShared();
        this.viewOtherUsers();
      }
    
      handleInputChange = event => {
        const {name, value} = event.target;
    
        this.setState({
          [name]: value
        });
      }

      constructor(props) {
        super(props);
    
        this.state = { isOpen: false };
      }
    
      toggleInvoiceModal = () => {
        this.setState({
          isOpen: !this.state.isOpen
        });
      }
    
      render() {
        return (
          <div className="container">
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
              <a className="navbar-brand" href="/">
                eliteSheets
              </a>
              <button
                className="navbar-toggler"
                data-toggle="collapse"
                data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon" />
              </button>
        
              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                  <li className="nav-item">
                    <a className="nav-link" href="/">
                      Home <span className="sr-only">(current)</span>
                    </a>
                  </li>
                  <li className="nav-item dropdown">
                    <a
                      className="nav-link dropdown-toggle"
                      href="/"
                      id="navbarDropdown"
                      role="button"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false">
                      User
                    </a>
                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                      <a className="dropdown-item" href="/login">
                        Login
                      </a>
                      <a className="dropdown-item" href="/signup">
                        Sign up
                      </a>
                      <div className="dropdown-divider" />
                      <a className="dropdown-item" href="/accountinfo">
                        Account Info
                      </a>
                    </div>
                  </li>
                </ul>
              </div>
            </nav>
            <div className="jumbotron">
    
              <h2>Welcome!</h2>
              <h3>User: {this.state.userName}</h3>
              <h3>Email: {this.state.userEmail}</h3>
              <FormBtn onClick={this.toggleInvoiceModal}>Add Invoice</FormBtn>
              <InvoiceModal show={this.state.isOpen}
	                onClose={this.toggleInvoiceModal}>
                </InvoiceModal>
              
    
              <div className="card mt-2">
                            <div className="card-body">
                              <form className="form-inline">
                                <h5 className="card-title">{this.state.newSheetName}</h5>
                                  <Table></Table>
                              </form>
                            </div>
                          </div>
          
        </div>
     </div> 
        )}
    }

export default CreateSheet ;