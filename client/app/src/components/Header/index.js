import React from "react"
import {Link,withRouter} from "react-router-dom"
import { NavBarDisconnection, Notifications } from "../index"
import { CardImg,  Navbar,  NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap'
import logo from "../../images/others/logo.png"
import logic from "../../logic"
import './style.scss'


class Header extends React.Component {

    state = {
        isOpen: false,
    }
 
    toggle=() =>{
        this.setState({
            isOpen: !this.state.isOpen
        })
    }

    isHome(){
       return (this.props.location.pathname==="/") ? true : false
    }

    goBack=()=>{
        if(!this.isHome())   this.props.history.goBack();
    }

    render() {
        
        let btnRetrun = "return" 
        if(this.isHome()) btnRetrun="return-disable"

        if(logic.isLogged()) return (
            <div>
                <Navbar className="navbar-logged" color="light" light expand="md">
                    <i  onClick={this.goBack} className={`${btnRetrun} fas  fa-long-arrow-alt-left fa-2x`}></i>
                    <NavbarBrand className="logo zi-1" tag={Link}  to="/" >
                    <img src={logo} alt="logo"/>
                    </NavbarBrand>
                        {logic.isLogged() ? <Nav className="ml-auto"  navbar>
                            <ul className="zi-1">
                                <li>
                                    <NavLink  onClick={this.props.logOut} tag={Link}  to="/" ><i className="fas logout-icon fa-sign-out-alt "></i><span className="logout-text">LogOut</span></NavLink>
                                </li>
                                <li>
                                <NavLink  tag={Link}  to={`/user/${localStorage.getItem("id-app")}`} >
                                    <span className="span-name-user">{this.props.dataUser.name} </span>
                                    <CardImg className="rounded-circle" top src={this.props.dataUser.photoProfile} alt="Card image cap" />
                                </NavLink>
                                </li>
                                <li>
                                <Notifications  notifications={this.props.dataUser.newNotifications} accept={this.handlerAcceptFriendship} ignore={this.handlerIgnoreFriendship} clearNotifications={this.props.clearNotifications} renderUser={this.props.renderUser}  />
                                </li>
                            </ul>
                        </Nav>
                        :
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <NavLink tag={Link} to="/Login">Login</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink tag={Link} to="/register">register</NavLink>
                            </NavItem>
                        </Nav>
                        }
                </Navbar>
            </div>
        )
        else return (<NavBarDisconnection/>)
    }
}

export default withRouter(Header);
