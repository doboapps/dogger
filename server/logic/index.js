'use strict'

const { models: { User, Park, Image, Note } } = require('data')
// const fs = require('file-system')
const cloudinary = require('cloudinary');


cloudinary.config({
    cloud_name: 'dpkyftge9',
    api_key: '936697417297718',
    api_secret: 'lmBzXsTcd8gmgsr3idgRnbPepMo'
});



const logic = {
    /**
     * 
     * @param {string} name 
     * @param {string} email 
     * @param {string} password 
     * 
     * @returns {Promise<boolean>}
     */
    registerUser(name, email, password, city) {
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

                return User.findOne({ email })
                    .then(user => {
                        if (user) throw Error(`user with email ${email} already exists`)

                        return User.create({ name, email, password, city })
                            .then(() => true)
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

                return User.findOne({ email, password })
            })
            .then(user => {
                if (!user) throw Error('wrong credentials')

                return user.id
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

                return User.findById(id).select({ _id: 0, name: 1, email: 1, race: 1, gender: 1, city: 1, photoProfile: 1, images: 1, description: 1, birthdate: 1, zip: 1, friends: 1, loves: 1, notifications: 1 })
            })
            .then(user => {
                if (!user) throw Error(`no user found with id ${id}`)

                return user
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
    updateUser(id, name, email, password, newEmail, newPassword, race, gender, description, photoProfile, birthdate, city, zip) {

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

                if (typeof race !== 'string') throw Error('user race is not a string')

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

                return User.findOne({ email, password })
            })
            .then(user => {
                if (!user) throw Error('wrong credentials')

                if (user.id !== id) throw Error(`no user found with id ${id} for given credentials`)

                if (newEmail) {
                    return User.findOne({ email: newEmail })
                        .then(_user => {
                            if (_user && _user.id !== id) throw Error(`user with email ${newEmail} already exists`)

                            return user
                        })
                }

            })
            .then(user => {
                user.name = name
                user.email = newEmail ? newEmail : email
                user.password = newPassword ? newPassword : password
                user.race = race
                user.gender = gender
                user.description = description
                user.photoProfile = photoProfile
                user.birthdate = birthdate
                user.city = city
                user.zip = zip

                return user.save()
            })
            .then(() => true)
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

                return User.findOne({ email, password })
            })
            .then(user => {
                if (!user) throw Error('wrong credentials')

                if (user.id !== id) throw Error(`no user found with id ${id} for given credentials`)

                return user.remove()
            })
            .then(() => true)
    },

    /**
     * 
     * @param {string} name 
     * @param {string} race 
     * @param {string} gender 
     * @param {string} city 
     * 
     * @returns {Promise<Array>}
     */
    filterUsers(name, race, gender, city) {

        let query = {}

        return Promise.resolve()
            .then(() => {
                if (typeof name !== 'string' && name !== undefined) throw Error('user name is not a string or undefined')
                if (typeof race !== 'string' && race !== undefined) throw Error('user race is not a string or undefined')
                if (typeof gender !== 'string' && gender !== undefined) throw Error('user gender is not a string or undefined')
                if (typeof city !== 'string' && city !== undefined) throw Error('user city is not a string or undefined')

                if (name) query.name = name
                if (race) query.race = race
                if (gender) query.gender = gender
                if (city) query.city = city

                return User.find(query)
            })
            .then(users => users)
    },


    /**
    * 
    * @param {string} name 
    * @param {string} city 
    * @param {string} zip 
    * 
    * @returns {Promise<Array>}
    */
    filterParks(name, city, zip) {

        let query = {}

        return Promise.resolve()
            .then(() => {
                if (typeof name !== 'string' && name !== undefined) throw Error('park name is not a string or undefined')
                if (typeof city !== 'string' && city !== undefined) throw Error('park city is not a string or undefined')
                if (typeof zip !== 'string' && zip !== undefined) throw Error('park zip is not a string or undefined')

                if (name) query.name = name
                if (city) query.city = city
                if (zip) query.zip = zip

                return Park.find(query)
            })
            .then(parks => parks)
    },

    /**
     * 
     * @param {string} id 
     * @param {string} notification 
     * 
     * @returns {Promise<Array>}
     */
    addNotification(id, notification) {
        return Promise.resolve()
            .then(() => {
                if (typeof id !== 'string') throw Error('user id is not a string')

                if (!(id = id.trim()).length) throw Error('user id is empty or blank')

                if (typeof notification !== 'string') throw Error('notification is not a string')

                if (!(notification = notification.trim()).length) throw Error('notification is empty or blank')


                return User.findById(id)
            })
            .then(user => {
                if (!user) throw Error('wrong credentials')

                if (user.id !== id) throw Error(`no user found with id ${id} for given credentials`)

                user.notifications.push(notification)

                return user.save()
            })
            .then(user => user.notifications)
    },

    /**
  * 
  * @param {string} id 
  * 
  * @returns {Promise<boolean>}
  */
    deleteNotifications(id) {
        return Promise.resolve()
            .then(() => {
                if (typeof id !== 'string') throw Error('user id is not a string')

                if (!(id = id.trim()).length) throw Error('user id is empty or blank')


                return User.findById(id)
            })
            .then(user => {

                if (!user) throw Error('wrong credentials')

                if (user.id !== id) throw Error(`no user found with id ${id} for given credentials`)

                user.notifications = []

                return user.save()
            })
            .then(res => {
                return true
            })
    },


    /**
     * 
     * @param {string} userId
     * @param {string} friendId 
     * 
     * @returns {Promise<Array>}
     */

    addFriend(userId, friendId) {
        return Promise.resolve()
            .then(() => {

                if (typeof userId !== 'string') throw Error('user id is not a string')

                if (!(userId = userId.trim()).length) throw Error('user id is empty or blank')

                if (typeof friendId !== 'string') throw Error('friendId is not a string')

                if ((friendId = friendId.trim()).length === 0) throw Error('friendId is empty or blank')


                return User.findById(friendId)
                    .then(user => {

                        if (!user) throw Error(`no user found with id ${friendId}`)

                        const friend = user.friends.find((element) => {

                            return element == userId
                        })

                        if (friend) throw Error("this user already exists")
                        user.friends.push(userId)

                        return user.save()
                            .then(() => {
                                return true
                            })
                            .then((saveFirstUser) => {

                                if (!saveFirstUser === true) throw Error("error to save first user")

                                return User.findById(userId)

                            }).then(user => {

                                if (!user) throw Error(`no user found with id ${userId}`)

                                const friend = user.friends.find((element) => {
                                    return element == friendId
                                })

                                if (friend) throw Error("this user already exists")
                                user.friends.push(friendId)

                                return user.save()
                                    .then((user) => {
                                        return user.friends
                                    })
                            })
                    })

            })
    },


    /**
     * 
     * @param {string} userId
     * @param {string} loverId 
     * 
     * @returns {Promise<Array>}
     */
    addLove(userId, loveId) {
        return Promise.resolve()
            .then(() => {

                if (typeof userId !== 'string') throw Error('user id is not a string')

                if (!(userId = userId.trim()).length) throw Error('user id is empty or blank')

                if (typeof loveId !== 'string') throw Error('loveId is not a string')

                if ((loveId = loveId.trim()).length === 0) throw Error('loveId is empty or blank')


                return User.findById(userId)
                    .then(user => {

                        if (!user) throw Error(`no user found with id ${userId}`)

                        const love = user.loves.find((element) => {

                            return element == loveId
                        })

                        if (love) throw Error("this user already exists")
                        user.loves.push(loveId)

                        return user.save()
                            .then((user) => {
                                return user.loves
                            })
                    })
            })
    },



    /**
    * 
    * @param {string} userId
    * @param {string} friendId 
    * 
    * @returns {Promise<object>}
    */
    removeFriend(userId, friendId) {
        return Promise.resolve()
            .then(() => {
                if (typeof userId !== 'string') throw Error('user id is not a string')

                if (!(userId = userId.trim()).length) throw Error('user id is empty or blank')

                if (typeof friendId !== 'string') throw Error('friendId is not a string')

                if (!(friendId = friendId.trim())) throw Error('friendId is empty or blank')

                return User.findById(userId)
                    .then(user => {
                        if (!user) throw Error(`no user found with id ${userId}`)

                        let indexFriendToRemove;

                        for (let i = 0; i < user.friends.length; i++) {
                            if (user.friends[i].toString() === friendId) {
                                indexFriendToRemove = i
                                break
                            }
                        }

                        if (indexFriendToRemove >= 0) user.friends.splice(indexFriendToRemove, 1)

                        else throw Error(`no friend found with id ${friendId}`)

                        return user.save()
                    })
                    .then(({ friends }) => friends)
            })
    },

    /**
    * 
    * @param {string} userId
    * @param {string} loveId 
    * 
    * @returns {Promise<object>}
    */
    removeLove(userId, loveId) {
        return Promise.resolve()
            .then(() => {
                if (typeof userId !== 'string') throw Error('user id is not a string')

                if (!(userId = userId.trim()).length) throw Error('user id is empty or blank')

                if (typeof loveId !== 'string') throw Error('loveId is not a string')

                if (!(loveId = loveId.trim())) throw Error('loveId is empty or blank')

                return User.findById(userId)
                    .then(user => {
                        if (!user) throw Error(`no user found with id ${userId}`)

                        let indexFriendToRemove;

                        for (let i = 0; i < user.loves.length; i++) {
                            if (user.loves[i].toString() === loveId) {
                                indexFriendToRemove = i
                                break
                            }
                        }

                        if (indexFriendToRemove >= 0) user.loves.splice(indexFriendToRemove, 1)

                        else throw Error(`no love found with id ${loveId}`)


                        return user.save()
                    })
                    .then(({ loves }) => loves)
            })
    },

    /**
    * 
    * @param {string} userId
    * @param {string} creator 
    * @param {string} city 
    * @param {string} zip
    * @param {string} location 
    * 
    * @returns {Promise<boolean>}
    */
    createPark(name, creator, city, zip, location) {
        return Promise.resolve()
            .then(() => {

                if (typeof name !== 'string') throw Error('name is not a string')

                if (!(name = name.trim()).length) throw Error('name is empty or blank')

                if (typeof creator !== 'string') throw Error('creator is not a string')

                if (!(creator = creator.trim()).length) throw Error('creator is empty or blank')

                if (typeof city !== 'string') throw Error('city is not a string')

                if ((city = city.trim()).length === 0) throw Error('city is empty or blank')

                if (typeof zip !== 'string') throw Error('zip is not a string')

                if ((zip = zip.trim()).length === 0) throw Error('zip is empty or blank')

                if (typeof location !== 'string') throw Error('location is not a string')

                if ((location = location.trim()).length === 0) throw Error('location is empty or blank')

                return Park.findOne({ name })
                    .then(park => {
                        if (park) throw Error(`park with name ${name} already exists`)

                        return Park.create({ name, creator, city, zip, location })
                            .then((park) => {
                                park.users.push(creator)
                                return park.save()
                            }).then(({ id, creator }) => {

                                return User.findByIdAndUpdate(creator, { $push: { parks: id } }, { new: true })
                                    .then(user => {
                                        if (!user) throw Error(`no user found with id ${id}`)

                                        return true
                                    })
                            })
                    })
            })

    },


    /**
    * 
    * @param {string} idPark 
    * 
    * @returns {Promise<object>}
    */
    retrivePark(idPark) {
        return Promise.resolve()
            .then(() => {

                if (typeof idPark !== 'string') throw Error('idPark is not a string')

                if (!(idPark = idPark.trim()).length) throw Error('idPark is empty or blank')

                return Park.findById(idPark)
                    .then(park => {

                        if (!park) throw Error(`park with idPark ${idPark} already exists`)

                        return park
                    })
            })

    },


    /**
    * 
    * @param {string} idPark
    * 
    * @returns {Promise<boolean>}
    */
    removePark(idPark) {
        return Promise.resolve()
            .then(() => {

                if (typeof idPark !== 'string') throw Error('idPark is not a string')

                if (!(idPark = idPark.trim()).length) throw Error('idPark is empty or blank')

                return Park.findByIdAndRemove(idPark)
                    .then(park => {
                        if (!park) throw Error(`park with idPark ${idPark} already exists`)

                        return true
                    })
            })

    },


    /**
    * 
    * @param {string} idUser
    * @param {string} base64Image
    * 
    * @returns {Promise<string>}
    */
    saveImageProfile(idUser, base64Image) {

        return Promise.resolve()
            .then(() => {
                if (typeof idUser !== 'string') throw Error('idUser is not a string')

                if (!(idUser = idUser.trim()).length) throw Error('idUser is empty or blank')

                if (typeof base64Image !== 'string') throw Error('base64Image is not a string')

                return new Promise((resolve, reject) => {
                    return cloudinary.v2.uploader.upload(base64Image, function (err, data) {
                        if (err) return reject(err)
                        resolve(data.url)
                    })
                })
                .then(urlCloudinary => {
                        return User.findByIdAndUpdate(idUser, { photoProfile: urlCloudinary }, {new: true})
                            .then(user => {
                                return user.photoProfile
                        })
                })
            })
    },



/**
* 
* @param {string} idUser
* @param {string} base64Image
* @param {string} descriptionImg
* 
* @returns {Promise<string>}
*/
    saveImagesUser(idUser, base64Image, descriptionImg) {
        let url = ""

            return Promise.resolve()
            .then(() => {
                if (typeof idUser !== 'string') throw Error('idUser is not a string')

                if (!(idUser = idUser.trim()).length) throw Error('idUser is empty or blank')

                if (typeof base64Image !== 'string') throw Error('base64Image is not a string')

                return new Promise((resolve, reject) => {
                    return cloudinary.v2.uploader.upload(base64Image, function (err, data) {
                        if (err) return reject(err)
                        resolve(data.url)
                    })
                })
                .then(urlCloudinary => {

                    url=urlCloudinary
                    const image = new Image({
                        route: urlCloudinary
                        , description: descriptionImg,
                        likes: []
                    })

                    return User.findByIdAndUpdate(idUser, { $push: { images: image } }, { new: true })
                            .then(() => {
                                return url
                            })
                    })
            })
    }
}

module.exports = logic