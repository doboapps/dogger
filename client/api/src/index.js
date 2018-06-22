'use strict'

const axios = require('axios')

const socialApi = {
    url: 'NO-URL',

    token: localStorage.getItem('token') ? localStorage.getItem('token') : 'NO-TOKEN',

    /**
     * 
     * @param {string} name 
     * @param {string} email 
     * @param {string} password 
     * 
     * @returns {Promise<boolean>}
     */
    registerUser(name,  email, password,city) {
        return Promise.resolve()
            .then(() => {
                if (typeof name !== 'string') throw Error('user name is not a string')

                if (!(name = name.trim()).length) throw Error('user name is empty or blank')

                if (typeof email !== 'string') throw Error('user email is not a string')

                if (!(email = email.trim()).length) throw Error('user email is empty or blank')

                if (typeof password !== 'string') throw Error('user password is not a string')

                if ((password = password.trim()).length === 0) throw Error('user password is empty or blank')

                if (typeof city !== 'string') throw Error('user city is not a string')

                if ((city = city.trim()).length === 0) throw Error('user city is empty or blank')

                return axios.post(`${this.url}/users`, { name, email,password,city })
                    .then(({ status, data }) => {
                        if (status !== 201 || data.status !== 'OK') throw Error(`unexpected response status ${status} (${data.status})`)

                        return true
                    })
                    .catch(err => {
                        if (err.code === 'ECONNREFUSED') throw Error('could not reach server')

                        if (err.response) {
                            const { response: { data: { error: message } } } = err

                            return message
                        } else return err
                    })
            })
    },

    /**
     * 
     * @param {string} email 
     * @param {string} password 
     * 
     * @returns {Promise<string>}
     */
    authenticateUser(email, password) {
        return Promise.resolve()
            .then(() => {
                if (typeof email !== 'string') throw Error('user email is not a string')

                if (!(email = email.trim()).length) throw Error('user email is empty or blank')

                if (typeof password !== 'string') throw Error('user password is not a string')

                if ((password = password.trim()).length === 0) throw Error('user password is empty or blank')

                return axios.post(`${this.url}/auth`, { email, password })
                    .then(({ status, data }) => {
                        if (status !== 200 || data.status !== 'OK') throw Error(`unexpected response status ${status} (${data.status})`)

                        const { data: { id, token } } = data

                        this.token = token
                       localStorage.setItem('token',token)

                        return data
                    })
                    .catch(err => {
                        if (err.code === 'ECONNREFUSED') throw Error('could not reach server')

                        if (err.response) {
                            const { response: { data: { error: message } } } = err

                            return message

                        } else return err
                    })
            })
    },

    /**
     * 
     * @param {string} id
     * 
     * @returns {Promise<User>} 
     */
    retrieveUser(id) {

        return Promise.resolve()
            .then(() => {
                if (typeof id !== 'string') throw Error('user id is not a string')

                if (!(id = id.trim()).length) throw Error('user id is empty or blank')

                return axios.get(`${this.url}/users/${id}`, { headers: { authorization: `Bearer ${this.token}` } })
                    .then(({ status, data }) => {
                        if (status !== 200 || data.status !== 'OK') throw Error(`unexpected response status ${status} (${data.status})`)
                        return data.data
                    })
                    .catch(err => {

                        if (err.code === 'ECONNREFUSED') throw Error('could not reach server')

                        if (err.response) {
                            const { response: { data: { error: message } } } = err

                            throw Error(message)
                        } else  throw err

                    })
            })
    },

    /**
     * 
     * @param {string} id 
     * @param {string} name 
     * @param {string} email 
     * @param {string} password 
     * @param {string} newEmail 
     * @param {string} newPassword 
     * @param {string} race 
     * @param {string} gender 
     * @param {string} description 
     * @param {string} photoProfile 
     * @param {Date} birthdate 
     * 
     * @returns {Promise<boolean>}
     */
    updateUser(id, name, email, password, newEmail, newPassword, race, gender, description, photoProfile, birthdate,city,zip) {

        return Promise.resolve()
            .then(() => {
                if (typeof id !== 'string') throw Error('user id is not a string')

                if (!(id = id.trim()).length) throw Error('user id is empty or blank')

                if (typeof name !== 'string') throw Error('user name is not a string')

                if (!(name = name.trim()).length) throw Error('user name is empty or blank')

                if (typeof email !== 'string') throw Error('user email is not a string')

                if (!(email = email.trim()).length) throw Error('user email is empty or blank')

                if (typeof password !== 'string') throw Error('user password is not a string')

                if ((password = password.trim()).length === 0) throw Error('user password is empty or blank')

                if (typeof newEmail !== 'string') throw Error('user newEmail is not a string')

                if ((newEmail = newEmail.trim()).length === 0) throw Error('user newEmail is empty or blank')

                if (typeof newPassword !== 'string') throw Error('user newPassword is not a string')

                if ((newPassword = newPassword.trim()).length === 0) throw Error('user newPassword is empty or blank')

                if (typeof race !== 'string') throw Error('333user race is not a string')

                if ((race = race.trim()).length === 0) throw Error('user race is empty or blank')

                if (typeof gender !== 'string') throw Error('user gender is not a string')

                if ((gender = gender.trim()).length === 0) throw Error('user gender is empty or blank')

                if (typeof description !== 'string') throw Error('user description is not a string')

                if ((description = description.trim()).length === 0) throw Error('user description is empty or blank')

                if (typeof photoProfile !== 'string') throw Error('user photoProfile is not a string')

                if ((photoProfile = photoProfile.trim()).length === 0) throw Error('user photoProfile is empty or blank')

                if (typeof birthdate !== 'object') throw Error('user birthdate is not a object')
                
                if (typeof city !== 'string') throw Error('user city is not a string')

                if ((city = city.trim()).length === 0) throw Error('user city is empty or blank')

                if (typeof zip !== 'string') throw Error('user zip is not a string')

                if ((zip = zip.trim()).length === 0) throw Error('user zip is empty or blank')


                return axios.patch(`${this.url}/users/${id}`, { name, email, password, newEmail, newPassword, race, gender, description, photoProfile, birthdate,city,zip }, { headers: { authorization: `Bearer ${this.token}` } })
                    .then(({ status, data }) => {
                        if (status !== 200 || data.status !== 'OK') throw Error(`unexpected response status ${status} (${data.status})`)

                        return true
                    })
                    .catch(err => {
                        if (err.code === 'ECONNREFUSED') throw Error('could not reach server')

                        if (err.response) {
                            const { response: { data: { error: message } } } = err

                            throw Error(message)
                        } else throw err
                    })
            })
    },

    /**
     * 
     * @param {string} id 
     * @param {string} email 
     * @param {string} password 
     * 
     * @returns {Promise<boolean>}
     */
    unregisterUser(id, email, password) {
        return Promise.resolve()
            .then(() => {
                if (typeof id !== 'string') throw Error('user id is not a string')

                if (!(id = id.trim()).length) throw Error('user id is empty or blank')

                if (typeof email !== 'string') throw Error('user email is not a string')

                if (!(email = email.trim()).length) throw Error('user email is empty or blank')

                if (typeof password !== 'string') throw Error('user password is not a string')

                if ((password = password.trim()).length === 0) throw Error('user password is empty or blank')

                return axios.delete(`${this.url}/users/${id}`, { headers: { authorization: `Bearer ${this.token}` }, data: { email, password } })
                    .then(({ status, data }) => {
                        if (status !== 200 || data.status !== 'OK') throw Error(`unexpected response status ${status} (${data.status})`)

                        return true
                    })
                    .catch(err => {
                        if (err.code === 'ECONNREFUSED') throw Error('could not reach server')

                        if (err.response) {
                            const { response: { data: { error: message } } } = err

                            throw Error(message)
                        } else throw err
                    })
            })
    },

    /**
     * 
     * @param {string} name 
     * @param {string} race 
     * @param {string} gender 
     * @param {string} city 
     * 
     * @returns {Promise<object>}
     */
    searchUser(name, race, gender,city) {
        return Promise.resolve()
        .then(() => {
            if (typeof name !== 'string' || !(name = name.trim()).length === 0) name=""
            else name="name="+name

            if (typeof race !== 'string' || (race = race.trim()).length === 0) race=""
            else race="&race="+race

            if (typeof gender !== 'string' || (gender = gender.trim()).length === 0) gender=""
            else gender="&gender="+gender

            if (typeof city !== 'string' || (city = city.trim()).length === 0) city=""
            else city="&city="+city

            
            
            return axios.get(`${this.url}/search/users?${name}${race}${gender}${city}`)
                .then(({ status, data }) => {
                    if (status !== 200 || data.status !== 'OK') throw Error(`unexpected response status ${status} (${data.status})`)

                    return data
                })
                .catch(err => {
                    if (err.code === 'ECONNREFUSED') throw Error('could not reach server')

                    if (err.response) {
                        const { response: { data: { error: message } } } = err

                        return message

                    } else return "e "+err
                })
        })
},


 /**
     * 
     * @param {string} email 
     * @param {string} password 
     * 
     * @returns {Promise<string>}
     */
    uploadImageProfile(userId, base64Image) {
        return Promise.resolve()
            .then(() => {
                if (typeof userId !== 'string') throw Error('user userId is not a string')

                if (!(userId = userId.trim()).length) throw Error('user userId is empty or blank')

                if (typeof base64Image !== 'string') throw Error('user base64Image is not a string')


                return axios.post(`${this.url}/upload-image-profile/${userId}`, { base64Image },{ headers: { authorization: `Bearer ${this.token}` } })
                    .then(({ status, data }) => {
                        if (status !== 200 || data.status !== 'OK') throw Error(`unexpected response status ${status} (${data.status})`)


                        return data
                    })
                    .catch(err => {
                        if (err.code === 'ECONNREFUSED') throw Error('could not reach server')

                        if (err.response) {
                            const { response: { data: { error: message } } } = err

                            return message

                        } else return err
                    })
            })
    },


    /**
     * 
     * @param {string} email 
     * @param {string} password 
     * @param {string} descriptionImg 
     * 
     * @returns {Promise<string>}
     */
    uploadImageUser(userId, base64Image,descriptionImg) {
        return Promise.resolve()
            .then(() => {
                if (typeof userId !== 'string') throw Error('user userId is not a string')

                if (!(userId = userId.trim()).length) throw Error('user userId is empty or blank')

                if (typeof base64Image !== 'string') throw Error('user base64Image is not a string')


                return axios.post(`${this.url}/upload-image-user/${userId}`, { base64Image,descriptionImg },{ headers: { authorization: `Bearer ${this.token}` } })
                    .then(({ status, data }) => {
                        if (status !== 200 || data.status !== 'OK') throw Error(`unexpected response status ${status} (${data.status})`)


                        return data
                    })
                    .catch(err => {
                        if (err.code === 'ECONNREFUSED') throw Error('could not reach server')

                        if (err.response) {
                            const { response: { data: { error: message } } } = err

                            return message

                        } else return err
                    })
            })
    },

    /**
     * 
     * @param {string} userId 
     * @param {string} friendId 
     * 
     * @returns {Promise<string>}
     */
    requestFriendship(userId, friendId) {

        return Promise.resolve()
            .then(() => {
                if (typeof userId !== 'string') throw Error('user userId is not a string')

                if (!(userId = userId.trim()).length) throw Error('user userId is empty or blank')

                if (typeof friendId !== 'string') throw Error('user friendId is not a string')

                if (!(friendId = friendId.trim()).length) throw Error('user friendId is empty or blank')


                return axios.post(`${this.url}/users/${userId}/friends`, { friendId },{ headers: { authorization: `Bearer ${this.token}` } })
                    .then(({ status, data }) => {

                        if (status !== 201 || data.status !== 'OK') throw Error(`unexpected response status ${status} (${data.status})`)


                        return data.status
                    })
                    .catch(err => {
                        if (err.code === 'ECONNREFUSED') throw Error('could not reach server')

                        if (err.response) {
                            const { response: { data: { error: message } } } = err

                            return message

                        } else return err
                    })
            })
    },


    /**
     * 
     * @param {string} userId 
     * @param {string} notification 
     * 
     * @returns {Promise<string>}
     */
    addNotification(userId, notification) {

        return Promise.resolve()
            .then(() => {
                if (typeof userId !== 'string') throw Error('user userId is not a string')

                if (!(userId = userId.trim()).length) throw Error('user userId is empty or blank')

                if (typeof notification !== 'string') throw Error('user notification is not a string')

                if (!(notification = notification.trim()).length) throw Error('user notification is empty or blank')


                return axios.post(`${this.url}/notification/${userId}`, { notification },{ headers: { authorization: `Bearer ${this.token}` } })
                    .then(({ status, data }) => {

                        if (status !== 200 || data.status !== 'OK') throw Error(`unexpected response status ${status} (${data.status})`)


                        return data.status
                    })
                    .catch(err => {
                        if (err.code === 'ECONNREFUSED') throw Error('could not reach server')

                        if (err.response) {
                            const { response: { data: { error: message } } } = err

                            return message

                        } else return err
                    })
            })
    },



     /**
     * 
     * @param {string} userId 
     * 
     * @returns {Promise<boolean>}
     */
    deleteNotifications(userId) {

        return Promise.resolve()
            .then(() => {
                if (typeof userId !== 'string') throw Error('user userId is not a string')

                if (!(userId = userId.trim()).length) throw Error('user userId is empty or blank')

    
                return axios.delete(`${this.url}/notification/${userId}`,{},{ headers: { authorization: `Bearer ${this.token}` } })
                    .then(({ status, data }) => {

                        if (status !== 200 || data.status !== 'OK') throw Error(`unexpected response status ${status} (${data.status})`)

                        return data.status
                    })
                    .catch(err => {
                        if (err.code === 'ECONNREFUSED') throw Error('could not reach server')

                        if (err.response) {
                            const { response: { data: { error: message } } } = err

                            return message

                        } else return err
                    })
            })
    },


}

module.exports = socialApi