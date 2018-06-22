import React from "react"
import {Row } from 'reactstrap'
import {Animated} from "react-animated-css"

function Gallery(props) {
        return <div>
                <Animated animationIn="pulse" animationOut="jello" isVisible={true}>
                        <Row>
                                {(props.images.length>0)?props.images:<h2>No uploaded images</h2>}
                        </Row>
                </Animated>
         </div>      
}
export default (Gallery)

    
    