import React from "react";
import img404 from '../../images/others/404.png'
import './style.scss'
import { Row,Col} from 'reactstrap'

function Error404() {

    return <div className="page404">
                <Row>
                    <Col xs="12" sm={{size:4, offset:4}}>
                        <img src={img404} alt="error 404"/>
                    </Col>
                </Row>
            </div>
}
export default Error404;