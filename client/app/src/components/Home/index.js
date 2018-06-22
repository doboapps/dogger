import React, { Component } from "react"
import { withRouter } from 'react-router-dom'
import logic from "../../logic"
import { CardUser, Loading } from '../'
import { Container, Col, Row } from 'reactstrap'
import './style.scss'

class Home extends Component {

    state = {
        users: [],
        cityToSearch: undefined,
        genderToSearch: undefined,
        raceToSearch: undefined,
        newNotifications: this.props.getNotifications(),
        loading: false
    }

    handleKeepGender = ({ target: { value: genderToSearch } }) => {
        this.handleSearch(this.state.raceToSearch, genderToSearch, this.state.cityToSearch)
    }


    handleKeepRace = ({ target: { value: raceToSearch } }) => {
        this.handleSearch(raceToSearch, this.state.genderToSearch, this.state.cityToSearch)
    }

    getRaces = () => {
        return logic.races.map((race, i) => <option key={"r-" + i} value={race}>{race}</option>)
    }


    handleKeepCity = ({ target: { value: cityToSearch } }) => {
        this.handleSearch(this.state.raceToSearch, this.state.genderToSearch, cityToSearch)
    }

    getCities = () => {
        return logic.cities.map((city, i) => <option key={"c-" + i} value={city}>{city}</option>)
    }


    getUsersByCity = () => {

        logic.retrieveUser(this.props.dataUser.idUser).then(({ city }) => {

            this.setState({
                loading: !this.state.loading
            })

            logic.search(undefined, undefined, undefined, city)
                .then(({ users }) => {

                    this.setState({
                        loading: !this.state.loading,
                        users,
                        cityToSearch: city
                    })
                })
        })
    }

    handleSearch = (raceToSearch, genderToSearch, cityToSearch) => {

        this.setState({
            loading: !this.state.loading,
            users: []
        })


        logic.search(undefined, raceToSearch, genderToSearch, cityToSearch)
            .then(({ users }) => {

                this.setState({
                    loading: !this.state.loading,
                    users,
                    cityToSearch,
                    genderToSearch,
                    raceToSearch,
                })
            })
    }


    componentDidMount() {
        this.getUsersByCity()
    }


    render() {

        return <Container className="container-home">
                <form >
                    <Row>
                        <Col sm="4" >
                            <select className="form-control mb-3" value={this.state.cityToSearch} onChange={this.handleKeepCity} type="text" placeholder="City">
                                <option key={"c-first"} value="All">All</option>
                                {this.getCities()}</select>
                        </Col>
                        <Col sm="4" >
                            <select className="form-control mb-3" value={this.state.raceToSearch} onChange={this.handleKeepRace} type="text" placeholder="Race">
                                <option key={"r-first"} value="All">All</option>
                                {this.getRaces()}
                            </select>
                        </Col>
                        <Col sm="4" >
                            <select className="form-control mb-3" value={this.state.genderToSearch} onChange={this.handleKeepGender} type="text" placeholder="Gender">
                                <option key={"g-0"} value="All">All</option>
                                <option key={"g-1"} value="male">Male</option>
                                <option key={"g-2"} value="female">Female</option>
                            </select>
                        </Col>
                    </Row>
                </form>

                <h3>Near you...</h3><br/>
                {this.state.loading ? <Loading text="Loading..." /> 
                :                 
                <Row>
                    {this.state.users.map((user, i) => {
                        if (user._id !== this.props.dataUser.idUser)
                            return <CardUser key={i + "-" + user.id} user={user} />
                        else return undefined
                    })}
                </Row>}
            </Container>
    }
}
export default withRouter(Home)