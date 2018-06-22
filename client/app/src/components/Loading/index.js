import React from "react";
import {Row, Col } from 'reactstrap'
import img from '../../images/others/loading.gif'
import './style.scss'

function Loading(props) {
    
                return  <Row className="text-center loading">
                                <Col xs="12">
                                <img  src={img} alt="loading"/>
                                <h3>{props.text}</h3>
                                </Col>
                        </Row>   
}

export default Loading

    
    