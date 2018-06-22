import React, { Component } from 'react';
import { Header, Main, Footer } from "./components/";
import logic from "./logic";
import profile_img from './images/others/profile-user.jpg'


class App extends Component {

  state = {
    isLogged: false,
    photoProfile: undefined,
    name: undefined,
    city: undefined,
    newNotifications: [],
    notifications: [],
    friends: [],
    idUser: localStorage.getItem("id-app"),
    allDataUser: {},
    renderUser: false,
  }

  clearNotifications = () => {
    this.setState({ newNotifications: [] })
  }


  changePhotoProfile = (photoProfile) => {
    this.setState({ photoProfile })
  }

  renderUser = () => {
    this.setState({
      renderUser: !this.state.renderUser
    })
  }

  getNotifications = () => {

    logic.retrieveUser(this.idUser()).then(({ notifications }) => {

      let newNotifications = logic.getNotifications(notifications)
      this.setState({ newNotifications })
      return newNotifications
    })
  }


  idUser = () => {
    return localStorage.getItem("id-app")
  }


  logIn = () => {
    this.retrieveUser(this.idUser())
  }

  logOut = () => {

    logic.logOut()
    this.setState({
      isLogged: false,
      idUser: undefined

    });
  }


  retrieveUser = (idUser) => {

    if (idUser) return logic.retrieveUser(idUser).then(data => data)
      .then(allDataUser => {

        let { photoProfile, name, city, notifications } = allDataUser
        if (!photoProfile) photoProfile = profile_img
        this.setState({
          photoProfile,
          name,
          city,
          idUser,
          notifications,
          isLogged: true,
          allDataUser
        })
      })
  }

  componentDidMount() {
    this.retrieveUser(this.idUser())
  }


  render() {

    return (
      <div className="App">
        <div className="background-app"></div>

        <Header dataUser={this.state} logOut={this.logOut} clearNotifications={this.clearNotifications} renderUser={this.renderUser} />
        <Main dataUser={this.state} changePhotoProfile={this.changePhotoProfile} retrieveUser={this.state.allDataUser} getNotifications={this.getNotifications} logIn={this.logIn} isLogged={this.state.isLogged} />
        {logic.isLogged() && <Footer />}

      </div>
    )
  }
}

export default App;
