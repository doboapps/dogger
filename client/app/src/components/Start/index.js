import React from "react";
import { Landing, Home } from "../"
import { withRouter } from 'react-router-dom'
import logic from "../../logic"

function Start(props) {
                return props.isLogged ?  
                    <Home getNotifications={props.getNotifications} dataUser={props.dataUser} retrieveUser={props.retrieveUser} isLogged={props.isLogged} /> 
                    : !logic.isLogged() && <Landing />        
}
export default withRouter(Start)

    
    