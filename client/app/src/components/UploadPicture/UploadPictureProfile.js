import React, { Component } from "react"
import { Container, Col, Row, CardImg, Button } from 'reactstrap'
import { withRouter } from 'react-router-dom'
import DropNCrop from '@synapsestudios/react-drop-n-crop'
import '@synapsestudios/react-drop-n-crop/lib/react-drop-n-crop.min.css'
import logic from "../../logic"
import profileDefault from '../../images/others/profile-user.jpg'
import { ModalApp, Loading } from '../'

class UploadPictureProfile extends Component {

  urlImageDefault = profileDefault

  state = {
    result: this.urlImageDefault,
    image: null,
    filename: null,
    filetype: null,
    src: null,
    error: null,
    loading: false
  }

  onChange = value => {
    this.setState(value)
  }

  clearImage = () => {
    this.setState({ result: this.urlImageDefault, image: "", filename: "", filetype: "", src: "", error: "" })
  }


  uploadHandler = (s) => {
    this.setState({
      loading: !this.state.loading
    })
    logic.uploadImageProfile(this.state.result, "descripción")
      .then((data) => {
        this.props.changePhotoProfile(data.urlImg)
        if (data.status === "OK") this.toggleModal("Success", "Congratulations! successfully loaded image", "/edit-profile")
        else this.toggleModal("Error", "Oopps! something went wrong, try again later")
       
        this.setState({ loading: !this.state.loading })

      }).catch( () => {
        this.toggleModal("Error", "Oopps! something went wrong, try again later")
        this.setState({loading: !this.state.loading })
      })
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

    return (this.state.loading) ? <Loading text="Loading..." />

      : <Container className="container-upload-img">
        <Row>
          <Col xs={{ size: 10, offset: 1 }} md={{ size: 4, offset: 1 }}>
            <DropNCrop maxFileSize={3145728} cropperOptions={{ aspectRatio: 1, guides: true, viewMode: 0, autoCropArea: 0 }} onChange={this.onChange} value={this.state} />
          </Col>
          <Col xs={{ size: 8, offset: 2 }} md={{ size: 3, offset: 2 }}>
            <CardImg className="rounded-circle" top width="100%" src={this.state.result} alt="Card image cap" />
            <Button outline onClick={this.clearImage} color="secondary"><i className="far fa-square"></i>clear</Button>{' '}
            <Button outline onClick={this.uploadHandler} color="secondary"><i className="fas fa-cloud-upload-alt"></i>Upload!</Button>
          </Col>
        </Row>
        <ModalApp headerMsg={this.state.titleModal} bodyMsg={this.state.msgModal} redirectState={this.state.redirect} modalRedirect={this.modalRedirect} toggle={this.toggleModal} activate={this.state.activateModal} />
      </Container>
  }
}

export default withRouter(UploadPictureProfile)