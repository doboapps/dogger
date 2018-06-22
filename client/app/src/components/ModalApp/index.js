import React from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'

class ModalApp extends React.Component {
 

  toggle= ()=> {
    this.props.toggle()
    if(this.props.redirectState) 
    this.props.modalRedirect(this.props.redirectState)
  }

  render() {

    return <div>        
        <Modal isOpen={this.props.activate} toggle={this.toggle} className={this.props.className}>
            <ModalHeader onClick={this.props.toggle}>{this.props.headerMsg}</ModalHeader>
            <ModalBody>
              {this.props.bodyMsg}
            </ModalBody>
            <ModalFooter>
              <Button outline color="secondary" onClick={this.toggle}>Ok</Button>
            </ModalFooter>
        </Modal>
      </div>
  }
}

export default ModalApp