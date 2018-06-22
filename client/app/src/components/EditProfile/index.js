import React, { Component } from "react";
import { withRouter,Link} from 'react-router-dom'
import logic from "../../logic"
import {Text} from "../"
import {Container,CardImg,Col,NavLink,Button, Row, Input } from 'reactstrap'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import './style.scss'
import profileDefault from '../../images/others/profile-user.jpg'
import 'react-datepicker/dist/react-datepicker.css'
import {ModalApp} from '../'

class EditProfile extends Component {

    state = {
        firstEmail:undefined,
        user: undefined,
        email: undefined,
        password:"",
        race: undefined,
        gender: undefined,
        description:"",
        photoProfile:"",
        birthdate:undefined,
        city: undefined,
        zip:"",
    }

    handleKeepName = ({target:{value:name}}) => {
        this.setState({ name })
    }

    getUser = () => {
        const userId=localStorage.getItem("id-app")
        
        logic.retrieveUser(userId).then(({name,email,race,gender,city,photoProfile,zip,description,birthdate})=>{
            if(!photoProfile)photoProfile=profileDefault
            if(typeof birthdate ==="object") birthdate =moment()
            birthdate= moment(birthdate)
            this.setState({firstEmail:email,name,email,race,gender,city,photoProfile,description,zip,birthdate})
        })
    }

    handleKeepEmail = ({target:{value:email}}) => {
        this.setState({ email })
    }

    handleKeepPassword = ({target:{value:password}}) => {
        this.setState({ password })
    }

    handleKeepRace = ({target:{value:race}})  => {
        this.setState({ race })
    }   
    
    getRaces = () => {
        return logic.races.map((race,index) => <option key={"select_race"+index} value={race}>{race}</option>)
    }

    handleKeepGender = ({target:{value:gender}}) => {
        this.setState({ gender })
    }

    handleKeepDescription = ({target:{value:description}}) => {
        this.setState({ description })
    }

    handleKeepBirthdate = ({target:{value:birthdate}}) => {
        this.setState({ birthdate })
    }

    handleChange =(date) =>{
        this.setState({birthdate: date});
      }
    
    handleKeepCity = ({target:{value:city}})=> {
        this.setState({ city })
    }

    handleKeepZip =  ({target:{value:zip}}) => {
        this.setState({ zip })
    }

    getCities = () => {
        return logic.cities.map((city,index) => <option key={"select_city"+index} value={city}>{city}</option>)
    }

    handleSaveDB = () =>{
        logic.updateUser(this.state.name, this.state.firstEmail,this.state.email, this.state.password, this.state.race, this.state.gender, this.state.description, this.state.photoProfile, this.state.birthdate,this.state.city,this.state.zip)
        .then(()=>{
            this.toggleModal("Success","Congratulations! correctly updated data")
        })
        .catch((res)=>{
             this.toggleModal("Error",res)
        })
    }

    componentDidMount(){
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

            <Container className="container-edit-profile">
                <Col xs={{ size: 8, offset: 2 }} sm={{ size: 6, offset: 3 }} md={{ size: 4, offset: 4 }}>
                    <NavLink tag={Link} to="/upload-picture-profile">
                        <CardImg className="rounded-circle" top width="100%" src={this.state.photoProfile} alt="Card image cap" />
                        <i className="fas fa-cloud-upload-alt fa-2x"></i> Change Picture
                    </NavLink >
                </Col>
                <Row>
                    <Col xs={{ size: 10, offset: 1 }}  sm={{ size: 6, offset: 0 }} >
                        <Text data={this.state.name} default={"Edit name"}   handleKeep={this.handleKeepName}/>
                    </Col>
                    <Col xs={{ size: 10, offset: 1 }}  sm={{ size: 6, offset: 0 }} >
                        <Text data={this.state.email}  default={"Edit email"}  handleKeep={this.handleKeepEmail}/>
                    </Col>
                    <Col xs={{ size: 10, offset: 1 }}  sm={{ size: 6, offset: 0 }} >
                        <Text data={this.state.description} default={"Edit description"}   handleKeep={this.handleKeepDescription}/>
                    </Col>
                    <Col xs={{ size: 10, offset: 1 }}  sm={{ size: 6, offset: 0 }} >
                        <Text data={this.state.zip} default={"Edit Zip"}  handleKeep={this.handleKeepZip}/>
                    </Col>
                    <Col xs={{ size: 10, offset: 1 }}  sm={{ size: 6, offset: 0 }} >
                        <select className="form-control" value={this.state.city}  onChange={this.handleKeepCity} type="text" placeholder="City">{this.getCities()}</select>
                    </Col>
                    <Col xs={{ size: 10, offset: 1 }}  sm={{ size: 6, offset: 0 }} >
                        <select className="form-control"  value={this.state.gender} onChange={this.handleKeepGender} type="text" placeholder="Gender">
                            <option value="undefined">Undefined</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>   
                    </Col>
                    <Col xs={{ size: 10, offset: 1 }}  sm={{ size: 6, offset: 0 }} >
                        <select className="form-control" value={this.state.race} defaultValue={"Others"}  onChange={this.handleKeepRace} type="text" placeholder="race">{this.getRaces()}</select>
                    </Col>
                    <Col xs={{ size: 10, offset: 1 }}  sm={{ size: 6, offset: 0 }} >
                        <DatePicker className="form-control data-pick"   selected={this.state.birthdate} onChange={this.handleChange}/>
                    </Col>
                    <Col xs={{ size: 10, offset: 1 }}  sm={{ size: 6, offset: 0 }} >
                        <Input  onChange={this.handleKeepPassword} value={this.state.password} type="password" placeholder="Enter the password to save"/>
                    </Col>
                    <Col xs={{ size: 10, offset: 1 }}  sm={{ size: 6, offset: 0 }} >
                        <Button onClick={this.handleSaveDB} outline color="secondary"><i className="far fa-save"></i> Save</Button>
                    </Col>
                </Row>
                <ModalApp headerMsg={this.state.titleModal} bodyMsg={this.state.msgModal} redirectState={this.state.redirect} modalRedirect={this.modalRedirect} toggle={this.toggleModal} activate={this.state.activateModal}/>
            </Container>
        )
    }
}
export default withRouter(EditProfile);