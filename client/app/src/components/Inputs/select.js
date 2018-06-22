import React, { Component } from "react";
import {Button} from 'reactstrap'

class Select extends Component {

    state = {
        edit: false
    }

    handleEdit = (edit) => {
        this.setState({edit })
    }

    render() {

       if (!this.state.edit) return (<p>{this.props.data} <Button  onClick={()=>{this.handleEdit(true)}} outline color="info">Edit</Button>{' '}</p>)
       else  return (<div><input onChange={this.props.handleKeep} type="text" value={this.props.data} autoFocus /><Button onClick={()=>{this.handleEdit(false)}} outline color="info">ok</Button></div>)       
    }
}

export default Select;