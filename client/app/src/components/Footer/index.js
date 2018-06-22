import React from "react";
import { withRouter } from 'react-router-dom'
import './style.scss'


function Footer(props) {                
        return <h6>Dogger Copyright © {new Date().getFullYear()} by Dobospps.com, All Rights Reserved</h6>       
}

export default withRouter(Footer);

    
    