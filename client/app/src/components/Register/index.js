import React, { Component } from "react";
import { withRouter } from 'react-router-dom'
import logic from "../../logic"
import { ModalApp } from '../'
import { Form, Input, Button, Container, Col } from 'reactstrap'
import background from '../../images/others/register-family-golden.jpg'
import './style.scss'

class Register extends Component {

    state = {
        userName: "",
        userEmail: "",
        password: "",
        repeatPassword: "",
        userCity: "",
        activateModal: false,
        msgModal: undefined,
        titleModal: undefined,
        RegisterFailedMessage: "",
        redirect: undefined
    }

    comparePassword(pass, repeatPass) {

        if ((pass !== repeatPass)) {
            this.setState({
                notMatchingMessage: "Passwords don't match"
            })
        } else {
            this.setState({
                notMatchingMessage: ""
            })
        }
    }


    handleKeepName = ({target:{value:userName}}) => {
        this.setState({ userName })
    }


    handleKeepEmail = ({target:{value:userEmail}})=> {
        this.setState({ userEmail })
    }

    handleKeepCity = ({target:{value:userCity}}) => {
        this.setState({ userCity })
    }

    handleKeepPassword = ({target:{value:password}}) => {
        this.setState({ password })
        this.comparePassword(password, this.state.repeatPassword)
    }

    handleKeepRepeatPassword =  ({target:{value:repeatPassword}}) => {
        this.setState({ repeatPassword })
        this.comparePassword(this.state.password, repeatPassword)
    }

    handleRegister = (e) => {
        e.preventDefault();
        if (this.state.notMatchingMessage === '') {

            logic.registerUser(this.state.userName, this.state.userEmail, this.state.password, this.state.userCity)
                .then(res => {
                    if (res === true) {
                        this.toggleModal("Success", "Congratulations! Successful registration", "/login")
                    }
                    else {
                        this.toggleModal("Error", res)
                    }
                }).catch(e => { this.toggleModal("Error", e) })
        } else {
            this.toggleModal("Error", "Passwords do not match")
        }
    }

    getCities = () => {
        return logic.cities.map((city, i) => <option key={"c-" + i} value={city}>{city}</option>)
    }


    toggleModal = (titleModal, msgModal, redirect) => {

        if (!titleModal || !msgModal) titleModal = msgModal = ""

        this.setState({
            activateModal: !this.state.activateModal,
            titleModal,
            msgModal: msgModal.toString(),
            redirect
        })
    }

    modalRedirect = (route) => {
        this.props.history.push(route)
    }


    render() {

        return (<div className="container-register" >
            <img src={background} alt="family-dog" />
            <Container >

                <Col sm={{ size: 10, offset: 1 }} md={{ size: 6, offset: 3 }}>

                    <Form className=" text-center  form-register p-3 pl-5 pr-5 rounded " onSubmit={this.handleRegister}>
                        <h3>Register </h3>
                        <hr className="my-4" />
                        <Input className="m-3" value={this.state.userName} onChange={this.handleKeepName} type="text" placeholder="Name" autoFocus={true} />
                        <Input className="m-3" value={this.state.UserEmail} onChange={this.handleKeepEmail} type="text" placeholder="Email" />
                        <select className="form-control" value={this.state.UserCity} onChange={this.handleKeepCity} type="text" placeholder="City"><option key="c-first" value={null}>Select city</option>{this.getCities()}</select>
                        <Input className="m-3" value={this.state.password} onChange={this.handleKeepPassword} type="password" placeholder="Password" />
                        <Input className="m-3" value={this.state.repeatPassword} onChange={this.handleKeepRepeatPassword} type="password" placeholder="Repeat Password" />
                        <p>{this.state.notMatchingMessage}</p>

                        <Button className="m-2" type="submit" > Register</Button>
                    </Form>
                </Col>
                <ModalApp headerMsg={this.state.titleModal} bodyMsg={this.state.msgModal} redirectState={this.state.redirect} modalRedirect={this.modalRedirect} toggle={this.toggleModal} activate={this.state.activateModal} />

            </Container>
        </div>
        )
    }
}

export default withRouter(Register);


