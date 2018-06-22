import React, { Component } from "react"
import { withRouter } from 'react-router-dom'
import {ModalApp} from '../'
import logic from "../../logic"
import {Form, Input, Button, Container, Col} from 'reactstrap'
import background from '../../images/others/login-dogs-group.jpg'
import './style.scss'


class Login extends Component {

    state = {
        userEmail: "",
        password: "",
        activateModal: false,
        msgModal:undefined,
        titleModal:undefined
    }

    handleKeepEmail = ({target:{value:userEmail}}) => {
        this.setState({ userEmail })
    }

    handleKeepPassword = ({target:{value:password}}) => {
        this.setState({ password })
    }

    handleLogin = e => {

        e.preventDefault()
        logic.login(this.state.userEmail, this.state.password)
            .then(res => {

                if (res.status === 'OK') {
                    this.props.logIn() //change the state "isLogged" of app.js
                    this.props.history.push('/')
                }
            }).catch(e=>{
                if(e=="TypeError: Cannot read property 'id' of undefined")
                e="Credentials error"
                this.toggleModal("Error",e)
            })
    }


      toggleModal=(titleModal,msgModal,redirect)=> {

        if(!titleModal || !msgModal) titleModal = msgModal = ""

        this.setState({
            activateModal: !this.state.activateModal,
            titleModal,
            msgModal:msgModal.toString(),
            redirect
        })
      }

    

    render() {

        return (

            <div className="container-login" >
                <img src={background} alt="family-dog"/>
                <Container >
                    <Col sm={{ size: 10, offset: 1 }} md={{ size: 6, offset: 3 }}>
                        <Form className=" text-center  form-login p-3 pl-5 pr-5 rounded " onSubmit={this.handleLogin}>
                            <h3 >Login </h3>
                            <hr className="my-4"/>
                            <Input className="m-3" value={this.state.userEmail} onChange={this.handleKeepEmail} type="text" placeholder="Email" autoFocus={true} />
                            <Input  className="m-3" value={this.state.password} onChange={this.handleKeepPassword} type="password" placeholder="Password" />
                            <Button className="m-3" type="submit" > Log me in</Button>
                        </Form>
                    </Col>
                    <ModalApp headerMsg={this.state.titleModal} bodyMsg={this.state.msgModal} afterModal={null}  toggle={this.toggleModal} activate={this.state.activateModal}/>
                    <ModalApp headerMsg={this.state.titleModal} bodyMsg={this.state.msgModal}  modalRedirect={this.modalRedirect} toggle={this.toggleModal} activate={this.state.activateModal}/>
                </Container>
            </div>
        )
    }
}

export default withRouter(Login);