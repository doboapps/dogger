const express = require('express')
const bodyParser = require('body-parser')
const logic = require('logic')
const jwt = require('jsonwebtoken')
const jwtValidation = require('./utils/jwt-validation')

const router = express.Router()

const { env: { TOKEN_SECRET, TOKEN_EXP } } = process

const jwtValidator = jwtValidation(TOKEN_SECRET)

const jsonBodyParser = bodyParser.json({ limit:'3600kb'})

router.post('/users', jsonBodyParser, (req, res) => {
    const { body: { name, email, password, city } } = req

    logic.registerUser(name, email, password, city)
        .then(() => {
            res.status(201)
            res.json({ status: 'OK' })
        })
        .catch(({ message }) => {
            res.status(400)
            res.json({ status: 'KO', error: message })
        })
})

router.post('/auth', jsonBodyParser, (req, res) => {
    const { body: { email, password } } = req

    logic.authenticateUser(email, password)
        .then(id => {
            const token = jwt.sign({ id }, TOKEN_SECRET, { expiresIn: TOKEN_EXP })

            res.status(200)
            res.json({ status: 'OK', data: { id, token } })
        })
        .catch(({ message }) => {
            res.status(400)
            res.json({ status: 'KO', error: message })
        })
})

router.get('/users/:userId', (req, res) => {
   
    const { params: { userId } } = req

    return logic.retrieveUser(userId)
        .then(user => {
            res.status(200)
            res.json({ status: 'OK', data: user })
        })
        .catch(({ message }) => {
            res.status(400)
            res.json({ status: 'KO', error: message })
        })

})

router.patch('/users/:userId', [jwtValidator, jsonBodyParser], (req, res) => {
    const { params: { userId }, body: {  name, email, password,newEmail, newPassword, race, gender, description, photoProfile, birthdate,city,zip } } = req
    const birthdateObject = new Date(birthdate)

    logic.updateUser(userId, name,  email,password,newEmail, newPassword, race, gender, description, photoProfile, birthdateObject,city,zip)
        .then(() => {
            res.status(200)
            res.json({ status: 'OK' })
        })
        .catch(({ message }) => {
            res.status(400)
            res.json({ status: 'KO', error: message })
        })
})

router.get('/search/users', (req, res) => {

    const { query:{name,race,gender,city}} = req

    logic.filterUsers(name,race,gender,city)
        .then((users) => {
            res.status(200)
            res.json({ status: 'OK',
                        users })
        })
        .catch(({ message }) => {
            res.status(400)
            res.json({ status: 'KO', error: message })
        })
})


router.post('/notification/:userId',jsonBodyParser, (req, res) => {

    const {params: { userId } ,body:{notification}} = req

    logic.addNotification(userId,notification)
        .then((notifications) => {
            res.status(200)
            res.json({ status: 'OK',
                       notifications })
        })
        .catch(({ message }) => {
            res.status(400)
            res.json({ status: 'KO', error: message })
        })
})


router.delete('/notification/:userId',jsonBodyParser, (req, res) => {

const {params: { userId } } = req

logic.deleteNotifications(userId)
    .then((notifications) => {
        res.status(200)
        res.json({ status: 'OK' })
    })
    .catch(({ message }) => {
        res.status(400)
        res.json({ status: 'KO', error: message })
    })
})



router.delete('/users/:userId', [jwtValidator, jsonBodyParser], (req, res) => {
    const { params: { userId }, body: { email, password } } = req

    logic.unregisterUser(userId, email, password)
        .then(() => {
            res.status(200)
            res.json({ status: 'OK' })
        })
        .catch(({ message }) => {
            res.status(400)
            res.json({ status: 'KO', error: message })
        })
})


router.post('/users/:userId/friends',  [jwtValidator, jsonBodyParser], (req, res) => {
    const { params: { userId }, body: { friendId } } = req

    logic.addFriend(userId, friendId)
        .then(friends => {
            res.status(201)
            res.json({ status: 'OK', data: { friends } })
        })
        .catch(({ message }) => {
            res.status(400)
            res.json({ status: 'KO', error: message })
        })
})


router.post('/users/:userId/loves', [jwtValidator, jsonBodyParser], (req, res) => {
    const { params: { userId }, body: { loveId } } = req

    logic.addLove(userId, loveId)
        .then(loves => {
            res.status(201)
            res.json({ status: 'OK', data: { loves } })
        })
        .catch(({ message }) => {
            res.status(400)
            res.json({ status: 'KO', error: message })
        })
})


router.delete('/users/:userId/friends/:friendId', jwtValidator, (req, res) => {
    const { params: { userId, friendId } } = req

    logic.removeFriend(userId, friendId)
        .then(friends => {
            res.status(201)
            res.json({ status: 'OK', data: { friends } })
        })
        .catch(({ message }) => {
            res.status(400)
            res.json({ status: 'KO', error: message })
        })
})


router.delete('/users/:userId/loves/:lovesId', jwtValidator, (req, res) => {
    const { params: { userId, lovesId } } = req

    logic.removeLove(userId, lovesId)
        .then(loves => {
            res.status(201)
            res.json({ status: 'OK', data: { loves } })
        })
        .catch(({ message }) => {
            res.status(400)
            res.json({ status: 'KO', error: message })
        })
})


router.post('/parks', jsonBodyParser, (req, res) => {
    const { body: { name, creator, city, zip, location } } = req

    logic.createPark(name, creator, city, zip, location)
        .then(() => {
            res.status(201)
            res.json({ status: 'OK' })
        })
        .catch(({ message }) => {
            res.status(400)
            res.json({ status: 'KO', error: message })
        })
})


router.get('/parks/:idPark', (req, res) => {
    const { params: { idPark } } = req

    return logic.retrivePark(idPark)
        .then(park => {
            res.status(200)
            res.json({ status: 'OK', park })
        })
        .catch(({ message }) => {
            res.status(400)
            res.json({ status: 'KO', error: message })
        })

})


router.delete('/parks/:parkId/user/:userId', [jwtValidator, jsonBodyParser], (req, res) => {
    const { params: { parkId,userId } } = req

    logic.removePark(parkId)
        .then(() => {
            res.status(200)
            res.json({ parkId: 'OK' })
        })
        .catch(({ message }) => {
            res.status(400)
            res.json({ status: 'KO', error: message })
        })
})


router.post('/upload-image-profile/:userId', jsonBodyParser, (req, res) => {
    const { params: { userId }, body: { base64Image } } = req

    logic.saveImageProfile(userId, base64Image)
        .then((urlImg) => {
            res.status(200)
            res.json({ status: 'OK',urlImg })
        })
        .catch(({ message }) => {
            res.status(400)
            res.json({ status: 'KO', error: message })
        })
})


router.post('/upload-image-user/:userId', jsonBodyParser, (req, res) => {
    const { params: { userId }, body: { base64Image,descriptionImg } } = req

    logic.saveImagesUser(userId, base64Image,descriptionImg)
        .then((urlImg) => {
            res.status(200)
            res.json({ status: 'OK',urlImg })
        })
        .catch(({ message }) => {
            res.status(400)
            res.json({ status: 'KO', error: message })
        })
})

module.exports = router