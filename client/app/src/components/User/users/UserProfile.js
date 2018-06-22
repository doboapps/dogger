import React, { Component } from "react"
import { withRouter, Link } from 'react-router-dom'
import logic from "../../../logic"
import {Row, Col, Jumbotron,Container, Button, CardImg } from 'reactstrap'
import Gallery  from '../gallery/'
import profileDefault from '../../../images/others/profile-user.jpg'


class UserProfile extends Component {

    state = {
        user: undefined,
        email: undefined,
        race: undefined,
        gender: undefined,
        description: undefined,
        photoProfile: profileDefault,
        city: undefined,
        zip: undefined,
        images:[],
        friends: [],
        loves: [],
        notifications: [],
        newNotifications:this.props.getNotifications(),
        requestAlreadySent: false
    }


    getUserIdParams = () => {
        let { pathname: idUser } = this.props.location
        idUser = idUser.substr(6)

        return idUser
    }

    getUser = () => {

        logic.retrieveUser(localStorage.getItem("id-app")).then((user) => {
            this.setState(user)
        })
    }


    requestAlreadySent = () => {

        let AlreadySent = false

        if (this.state.newNotifications.find(n => n.id === localStorage.getItem("id-app")))
            return true
        if (this.state.friends.find(n => n === localStorage.getItem("id-app")))
            return true

        return AlreadySent
    }


    showInProfile() {
        if (localStorage.getItem("id-app") === this.getUserIdParams())
            return true
    }

    showIfAreFriends() {

        return this.state.friends.find((friend)=>{
            if(localStorage.getItem("id-app") === friend)
            return true
            else return false
        })
    }

     getImagesUser = ()=>{
        return this.state.images.map((img,i) =><Col key={"col-i-"+i} xs="6" md="4" ><img key={"img-"+i} src={img.route} alt="dog" /></Col>
        )
    }

    componentDidMount() {
        this.getUser()

    }

    render() {
        return (

            <Container className="container-info-profile">                
                        <Jumbotron>
                            <Row>
                                <Col  xs="4">
                                    <CardImg className="rounded-circle" top src={this.state.photoProfile} alt="Card image cap" />
                                </Col>
                                <Col xs={{ size: 7,  offset: 1 }} >
                                    <div>
                                        <h1 className="display-5 text-capitalize ">{this.state.name}</h1>
                                        <Button tag={Link} to={`/edit-profile`}  outline color="secondary"><i className="far fa-sun"></i><span className="hidden-mov">Edit Profile</span></Button>
                                    </div>
                                    <h5 className="text-capitalize"><i className="fas fa-paw "></i> {this.state.race}</h5>
                                    <h5 className="text-capitalize"><i className="fas fa-transgender"></i> {this.state.gender}</h5>
                                    <h5 className="text-capitalize"><i className="fas fa-building"></i> {this.state.city}</h5>
                                    <h5 className="text-capitalize"><i className="fas fa-birthday-cake"></i> {logic.getAge(this.state.birthdate)}</h5>
                                    <h5 className="text-capitalize"><i className="fas fa-heart"></i> {this.state.friends.length} friends</h5>
                                    <hr className="my-2" />
                                    <p><i className="fas fa-align-justify"></i> {this.state.description}</p>
                                    <p className="lead"></p>
                                </Col>
                            </Row>
                        </Jumbotron>
                  
                <div className="content-gallery-user">
                    <Button tag={Link} to="/upload-picture-user"  outline color="secondary"><i className="far fa-images"></i> Upload a picture</Button>
                    <Gallery images={this.getImagesUser()} />
                </div>
            </Container>
        )
    }
}

export default withRouter(UserProfile)
    