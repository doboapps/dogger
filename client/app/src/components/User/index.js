import React, { Component } from "react";
import { withRouter } from 'react-router-dom'
import OtherUser  from './users/OtherUser'
import UserProfile  from './users/UserProfile'
import './style.scss';

class User extends Component {

    state = {
        userIdParams:""
    }

    getUserIdParams = () => {
        let { pathname: idUser } = this.props.location
        idUser = idUser.substr(6)

        return idUser;
    }

    profileRegister() {
        if (localStorage.getItem("id-app") === this.getUserIdParams())  return true
        else return false
    }


    componentDidMount(){
        this.props.getNotifications()
    }
  
    render() {
        return  <div>
                     {this.profileRegister() ? <UserProfile getNotifications={this.props.getNotifications}  dataUser={this.props.dataUser}/>  :   <OtherUser     getNotifications= { this.props.getNotifications} dataUser={this.props.dataUser} getUserIdParams={this.getUserIdParams} />}
                </div>
    }
}

export default withRouter(User);