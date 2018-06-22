import React, { Component } from "react";
import { Route, Switch } from 'react-router-dom';
import { Register, Login, Error404, Start, EditProfile,UploadPictureProfile,UploadPictureUser, User } from "../index";
import logic from "../../logic"
class Main extends Component {

    state = {
        renderUser: false,
    }


    render() {

        return logic.isLogged() ?
            <div>
                <Switch>
                    <Route exact path="/" render={props => <Start dataUser={this.props.dataUser} getNotifications={this.props.getNotifications}   retrieveUser={this.props.retrieveUser} isLogged={this.props.isLogged}/>} />
                    <Route exact path="/edit-profile" render={props => <EditProfile />} />               
                    <Route exact path="/upload-picture-profile" render={props => <UploadPictureProfile changePhotoProfile={this.props.changePhotoProfile}  />} />               
                    <Route exact path="/upload-picture-user" render={props => <UploadPictureUser />} />               
                    <Route path="/user" render={props => <User dataUser={this.props.dataUser}  getNotifications={this.props.getNotifications} />} />
                    <Route path='/' render={props => <Error404  />} />
                </Switch>
            </div>
            :
            <div>
                <Switch>
                <Route exact path="/" render={props => <Start isLogged={this.props.isLogged} />} />
                    <Route path="/register" render={props => <Register />} />
                    <Route path="/login" render={props => <Login logIn={this.props.logIn} />} />
                    <Route path='/' render={props => <Error404 />} />
                </Switch>
            </div>
    }
}

export default Main;