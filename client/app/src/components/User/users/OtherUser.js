import React, { Component } from "react"
import { withRouter } from 'react-router-dom'
import logic from "../../../logic"
import {Row, Col, Jumbotron,Container, Button, CardImg } from 'reactstrap'
import Gallery  from '../gallery/'
import {ModalApp} from '../../'
// import img  from '../gallery/'
import imgProfile from '../../../images/others/profile-user.jpg'

class OtherUser extends Component {

    state = {
        user: undefined,
        email: undefined,
        race: undefined,
        gender: undefined,
        description: undefined,
        photoProfile: imgProfile,
        city: undefined,
        zip: undefined,
        images:[],
        friends: [],
        loves: [],
        notifications: [],
        newNotifications: [],
        requestAlreadySent: false,
        newNotification:this.props.getNotifications()
    }

    getUser = () => {

        logic.retrieveUser(this.props.getUserIdParams()).then((user) => {
            this.setState(user)
            
            if (this.requestAlreadySent())
                this.setState({ requestAlreadySent: true })

        })
    }


    handlerButtonFriendShip = () => {

        logic.sendNotifactionRelationship(this.props.getUserIdParams(), localStorage.getItem("id-app"), 'friendship:')
            .then((res) => {
                this.toggleModal("Success","Congratulations! correctly sent request")
                this.setState({ requestAlreadySent: true })
            }).catch(e=>{
                this.toggleModal("Error",e)
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


    showIfAreFriends() {

        return this.state.friends.find((friend)=>{
            
           return (localStorage.getItem("id-app") === friend)? true: false
        })
    }

    getImagesUser = ()=>{

        return this.state.images.map((img,i) =><Col key={"c-i-"+i} xs="6" md="4" ><img key={"img-"+i} src={img.route} alt="dog" /></Col>
        )
    }


    componentDidMount() {
        this.getUser()
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
    
      modalRedirect=(route)=>{
        this.props.history.push(route)

    }

    render() {

        return (
            <Container className="container-info-user">
                <Jumbotron>
                    <Row>
                        <Col xs="4">
                            <CardImg className="rounded-circle" top src={this.state.photoProfile} alt="Card image cap" />
                        </Col>
                        <Col xs={{ size: 7,  offset: 1 }} >

                            <h1 className="display-5 text-capitalize ">{this.state.name}</h1>
                            <h5 className="text-capitalize"><i className="fas fa-paw"></i> {this.state.race}</h5>
                            <h5 className="text-capitalize"><i className="fas fa-transgender"></i> {this.state.gender}</h5>
                            <h5 className="text-capitalize"><i className="fas fa-building"></i> {this.state.city}</h5>
                            <h5 className="text-capitalize"><i className="fas fa-birthday-cake"></i> {logic.getAge(this.state.birthdate)}</h5>
                            <h5 className="text-capitalize"><i className="fas fa-heart"></i> {this.state.friends.length} friends</h5>
                            
                            {this.showIfAreFriends() && <a target="_blank" href={`mailto:${this.state.email}`}><h5><i className="fas fa-at"></i> {this.state.email}</h5></a>}
                            
                            <hr className="my-2" />
                            <p><i className="fas fa-align-justify"></i> {this.state.description}</p>
                            {(!this.showIfAreFriends() && !this.state.requestAlreadySent) && <Button onClick={this.handlerButtonFriendShip} outline color="secondary"><i className="far fa-heart"></i> Request friendship</Button>}
                        </Col>
                    </Row>
                </Jumbotron>

                {this.showIfAreFriends() &&<Gallery images={this.getImagesUser()} />}

                <ModalApp headerMsg={this.state.titleModal} bodyMsg={this.state.msgModal} redirectState={this.state.redirect} modalRedirect={this.modalRedirect} toggle={this.toggleModal} activate={this.state.activateModal}/>
            </Container>
        )
    }
}

export default withRouter(OtherUser)