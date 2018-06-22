'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var axios = require('axios');

var socialApi = {
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
    registerUser: function registerUser(name, email, password, city) {
        var _this = this;

        return Promise.resolve().then(function () {
            if (typeof name !== 'string') throw Error('user name is not a string');

            if (!(name = name.trim()).length) throw Error('user name is empty or blank');

            if (typeof email !== 'string') throw Error('user email is not a string');

            if (!(email = email.trim()).length) throw Error('user email is empty or blank');

            if (typeof password !== 'string') throw Error('user password is not a string');

            if ((password = password.trim()).length === 0) throw Error('user password is empty or blank');

            if (typeof city !== 'string') throw Error('user city is not a string');

            if ((city = city.trim()).length === 0) throw Error('user city is empty or blank');

            return axios.post(_this.url + '/users', { name: name, email: email, password: password, city: city }).then(function (_ref) {
                var status = _ref.status,
                    data = _ref.data;

                if (status !== 201 || data.status !== 'OK') throw Error('unexpected response status ' + status + ' (' + data.status + ')');

                return true;
            }).catch(function (err) {
                if (err.code === 'ECONNREFUSED') throw Error('could not reach server');

                if (err.response) {
                    var message = err.response.data.error;


                    return message;
                } else return err;
            });
        });
    },


    /**
     * 
     * @param {string} email 
     * @param {string} password 
     * 
     * @returns {Promise<string>}
     */
    authenticateUser: function authenticateUser(email, password) {
        var _this2 = this;

        return Promise.resolve().then(function () {
            if (typeof email !== 'string') throw Error('user email is not a string');

            if (!(email = email.trim()).length) throw Error('user email is empty or blank');

            if (typeof password !== 'string') throw Error('user password is not a string');

            if ((password = password.trim()).length === 0) throw Error('user password is empty or blank');

            return axios.post(_this2.url + '/auth', { email: email, password: password }).then(function (_ref2) {
                var status = _ref2.status,
                    data = _ref2.data;

                if (status !== 200 || data.status !== 'OK') throw Error('unexpected response status ' + status + ' (' + data.status + ')');

                var _data$data = data.data,
                    id = _data$data.id,
                    token = _data$data.token;


                _this2.token = token;
                localStorage.setItem('token', token);

                return data;
            }).catch(function (err) {
                if (err.code === 'ECONNREFUSED') throw Error('could not reach server');

                if (err.response) {
                    var message = err.response.data.error;


                    return message;
                } else return err;
            });
        });
    },


    /**
     * 
     * @param {string} id
     * 
     * @returns {Promise<User>} 
     */
    retrieveUser: function retrieveUser(id) {
        var _this3 = this;

        return Promise.resolve().then(function () {
            if (typeof id !== 'string') throw Error('user id is not a string');

            if (!(id = id.trim()).length) throw Error('user id is empty or blank');

            return axios.get(_this3.url + '/users/' + id, { headers: { authorization: 'Bearer ' + _this3.token } }).then(function (_ref3) {
                var status = _ref3.status,
                    data = _ref3.data;

                if (status !== 200 || data.status !== 'OK') throw Error('unexpected response status ' + status + ' (' + data.status + ')');
                return data.data;
            }).catch(function (err) {

                if (err.code === 'ECONNREFUSED') throw Error('could not reach server');

                if (err.response) {
                    var message = err.response.data.error;


                    throw Error(message);
                } else throw err;
            });
        });
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
    updateUser: function updateUser(id, name, email, password, newEmail, newPassword, race, gender, description, photoProfile, birthdate, city, zip) {
        var _this4 = this;

        return Promise.resolve().then(function () {
            if (typeof id !== 'string') throw Error('user id is not a string');

            if (!(id = id.trim()).length) throw Error('user id is empty or blank');

            if (typeof name !== 'string') throw Error('user name is not a string');

            if (!(name = name.trim()).length) throw Error('user name is empty or blank');

            if (typeof email !== 'string') throw Error('user email is not a string');

            if (!(email = email.trim()).length) throw Error('user email is empty or blank');

            if (typeof password !== 'string') throw Error('user password is not a string');

            if ((password = password.trim()).length === 0) throw Error('user password is empty or blank');

            if (typeof newEmail !== 'string') throw Error('user newEmail is not a string');

            if ((newEmail = newEmail.trim()).length === 0) throw Error('user newEmail is empty or blank');

            if (typeof newPassword !== 'string') throw Error('user newPassword is not a string');

            if ((newPassword = newPassword.trim()).length === 0) throw Error('user newPassword is empty or blank');

            if (typeof race !== 'string') throw Error('333user race is not a string');

            if ((race = race.trim()).length === 0) throw Error('user race is empty or blank');

            if (typeof gender !== 'string') throw Error('user gender is not a string');

            if ((gender = gender.trim()).length === 0) throw Error('user gender is empty or blank');

            if (typeof description !== 'string') throw Error('user description is not a string');

            if ((description = description.trim()).length === 0) throw Error('user description is empty or blank');

            if (typeof photoProfile !== 'string') throw Error('user photoProfile is not a string');

            if ((photoProfile = photoProfile.trim()).length === 0) throw Error('user photoProfile is empty or blank');

            if ((typeof birthdate === 'undefined' ? 'undefined' : _typeof(birthdate)) !== 'object') throw Error('user birthdate is not a object');

            if (typeof city !== 'string') throw Error('user city is not a string');

            if ((city = city.trim()).length === 0) throw Error('user city is empty or blank');

            if (typeof zip !== 'string') throw Error('user zip is not a string');

            if ((zip = zip.trim()).length === 0) throw Error('user zip is empty or blank');

            return axios.patch(_this4.url + '/users/' + id, { name: name, email: email, password: password, newEmail: newEmail, newPassword: newPassword, race: race, gender: gender, description: description, photoProfile: photoProfile, birthdate: birthdate, city: city, zip: zip }, { headers: { authorization: 'Bearer ' + _this4.token } }).then(function (_ref4) {
                var status = _ref4.status,
                    data = _ref4.data;

                if (status !== 200 || data.status !== 'OK') throw Error('unexpected response status ' + status + ' (' + data.status + ')');

                return true;
            }).catch(function (err) {
                if (err.code === 'ECONNREFUSED') throw Error('could not reach server');

                if (err.response) {
                    var message = err.response.data.error;


                    throw Error(message);
                } else throw err;
            });
        });
    },


    /**
     * 
     * @param {string} id 
     * @param {string} email 
     * @param {string} password 
     * 
     * @returns {Promise<boolean>}
     */
    unregisterUser: function unregisterUser(id, email, password) {
        var _this5 = this;

        return Promise.resolve().then(function () {
            if (typeof id !== 'string') throw Error('user id is not a string');

            if (!(id = id.trim()).length) throw Error('user id is empty or blank');

            if (typeof email !== 'string') throw Error('user email is not a string');

            if (!(email = email.trim()).length) throw Error('user email is empty or blank');

            if (typeof password !== 'string') throw Error('user password is not a string');

            if ((password = password.trim()).length === 0) throw Error('user password is empty or blank');

            return axios.delete(_this5.url + '/users/' + id, { headers: { authorization: 'Bearer ' + _this5.token }, data: { email: email, password: password } }).then(function (_ref5) {
                var status = _ref5.status,
                    data = _ref5.data;

                if (status !== 200 || data.status !== 'OK') throw Error('unexpected response status ' + status + ' (' + data.status + ')');

                return true;
            }).catch(function (err) {
                if (err.code === 'ECONNREFUSED') throw Error('could not reach server');

                if (err.response) {
                    var message = err.response.data.error;


                    throw Error(message);
                } else throw err;
            });
        });
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
    searchUser: function searchUser(name, race, gender, city) {
        var _this6 = this;

        return Promise.resolve().then(function () {
            if (typeof name !== 'string' || !(name = name.trim()).length === 0) name = "";else name = "name=" + name;

            if (typeof race !== 'string' || (race = race.trim()).length === 0) race = "";else race = "&race=" + race;

            if (typeof gender !== 'string' || (gender = gender.trim()).length === 0) gender = "";else gender = "&gender=" + gender;

            if (typeof city !== 'string' || (city = city.trim()).length === 0) city = "";else city = "&city=" + city;

            return axios.get(_this6.url + '/search/users?' + name + race + gender + city).then(function (_ref6) {
                var status = _ref6.status,
                    data = _ref6.data;

                if (status !== 200 || data.status !== 'OK') throw Error('unexpected response status ' + status + ' (' + data.status + ')');

                return data;
            }).catch(function (err) {
                if (err.code === 'ECONNREFUSED') throw Error('could not reach server');

                if (err.response) {
                    var message = err.response.data.error;


                    return message;
                } else return "e " + err;
            });
        });
    },


    /**
        * 
        * @param {string} email 
        * @param {string} password 
        * 
        * @returns {Promise<string>}
        */
    uploadImageProfile: function uploadImageProfile(userId, base64Image) {
        var _this7 = this;

        return Promise.resolve().then(function () {
            if (typeof userId !== 'string') throw Error('user userId is not a string');

            if (!(userId = userId.trim()).length) throw Error('user userId is empty or blank');

            if (typeof base64Image !== 'string') throw Error('user base64Image is not a string');

            return axios.post(_this7.url + '/upload-image-profile/' + userId, { base64Image: base64Image }, { headers: { authorization: 'Bearer ' + _this7.token } }).then(function (_ref7) {
                var status = _ref7.status,
                    data = _ref7.data;

                if (status !== 200 || data.status !== 'OK') throw Error('unexpected response status ' + status + ' (' + data.status + ')');

                return data;
            }).catch(function (err) {
                if (err.code === 'ECONNREFUSED') throw Error('could not reach server');

                if (err.response) {
                    var message = err.response.data.error;


                    return message;
                } else return err;
            });
        });
    },


    /**
     * 
     * @param {string} email 
     * @param {string} password 
     * @param {string} descriptionImg 
     * 
     * @returns {Promise<string>}
     */
    uploadImageUser: function uploadImageUser(userId, base64Image, descriptionImg) {
        var _this8 = this;

        return Promise.resolve().then(function () {
            if (typeof userId !== 'string') throw Error('user userId is not a string');

            if (!(userId = userId.trim()).length) throw Error('user userId is empty or blank');

            if (typeof base64Image !== 'string') throw Error('user base64Image is not a string');

            return axios.post(_this8.url + '/upload-image-user/' + userId, { base64Image: base64Image, descriptionImg: descriptionImg }, { headers: { authorization: 'Bearer ' + _this8.token } }).then(function (_ref8) {
                var status = _ref8.status,
                    data = _ref8.data;

                if (status !== 200 || data.status !== 'OK') throw Error('unexpected response status ' + status + ' (' + data.status + ')');

                return data;
            }).catch(function (err) {
                if (err.code === 'ECONNREFUSED') throw Error('could not reach server');

                if (err.response) {
                    var message = err.response.data.error;


                    return message;
                } else return err;
            });
        });
    },


    /**
     * 
     * @param {string} userId 
     * @param {string} friendId 
     * 
     * @returns {Promise<string>}
     */
    requestFriendship: function requestFriendship(userId, friendId) {
        var _this9 = this;

        return Promise.resolve().then(function () {
            if (typeof userId !== 'string') throw Error('user userId is not a string');

            if (!(userId = userId.trim()).length) throw Error('user userId is empty or blank');

            if (typeof friendId !== 'string') throw Error('user friendId is not a string');

            if (!(friendId = friendId.trim()).length) throw Error('user friendId is empty or blank');

            return axios.post(_this9.url + '/users/' + userId + '/friends', { friendId: friendId }, { headers: { authorization: 'Bearer ' + _this9.token } }).then(function (_ref9) {
                var status = _ref9.status,
                    data = _ref9.data;


                if (status !== 201 || data.status !== 'OK') throw Error('unexpected response status ' + status + ' (' + data.status + ')');

                return data.status;
            }).catch(function (err) {
                if (err.code === 'ECONNREFUSED') throw Error('could not reach server');

                if (err.response) {
                    var message = err.response.data.error;


                    return message;
                } else return err;
            });
        });
    },


    /**
     * 
     * @param {string} userId 
     * @param {string} notification 
     * 
     * @returns {Promise<string>}
     */
    addNotification: function addNotification(userId, notification) {
        var _this10 = this;

        return Promise.resolve().then(function () {
            if (typeof userId !== 'string') throw Error('user userId is not a string');

            if (!(userId = userId.trim()).length) throw Error('user userId is empty or blank');

            if (typeof notification !== 'string') throw Error('user notification is not a string');

            if (!(notification = notification.trim()).length) throw Error('user notification is empty or blank');

            return axios.post(_this10.url + '/notification/' + userId, { notification: notification }, { headers: { authorization: 'Bearer ' + _this10.token } }).then(function (_ref10) {
                var status = _ref10.status,
                    data = _ref10.data;


                if (status !== 200 || data.status !== 'OK') throw Error('unexpected response status ' + status + ' (' + data.status + ')');

                return data.status;
            }).catch(function (err) {
                if (err.code === 'ECONNREFUSED') throw Error('could not reach server');

                if (err.response) {
                    var message = err.response.data.error;


                    return message;
                } else return err;
            });
        });
    },


    /**
    * 
    * @param {string} userId 
    * 
    * @returns {Promise<boolean>}
    */
    deleteNotifications: function deleteNotifications(userId) {
        var _this11 = this;

        return Promise.resolve().then(function () {
            if (typeof userId !== 'string') throw Error('user userId is not a string');

            if (!(userId = userId.trim()).length) throw Error('user userId is empty or blank');

            return axios.delete(_this11.url + '/notification/' + userId, {}, { headers: { authorization: 'Bearer ' + _this11.token } }).then(function (_ref11) {
                var status = _ref11.status,
                    data = _ref11.data;


                if (status !== 200 || data.status !== 'OK') throw Error('unexpected response status ' + status + ' (' + data.status + ')');

                return data.status;
            }).catch(function (err) {
                if (err.code === 'ECONNREFUSED') throw Error('could not reach server');

                if (err.response) {
                    var message = err.response.data.error;


                    return message;
                } else return err;
            });
        });
    }
};

module.exports = socialApi;
