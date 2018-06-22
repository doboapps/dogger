'use strict'

require('dotenv').config()

const { mongoose, models: { User, Park } } = require('data')
const { expect } = require('chai')
const socialApi = require('.')
const sinon = require('sinon')
const axios = require('axios')
const jwt = require('jsonwebtoken')

const { env: { DB_URL, API_URL, TOKEN_SECRET } } = process

socialApi.url = API_URL

describe('logic (social api)', () => {
    const birthdate = new Date()
    const userData = { name: 'John', email: 'ja@mail.com', password: '123', race: "pug", gender: "female", description: "a dog", photoProfile: "/image.jpg", birthdate, city: "madrid", zip: "123456" }
    const otherUserData = { name: 'Jack', email: 'jz@mail.com', password: '456' }
    const fakeUserId = '123456781234567812345678'
    const indexes = []

    before(() => mongoose.connect(DB_URL))

    beforeEach(() => {
        let count = 10 + Math.floor(Math.random() * 10)
        indexes.length = 0
        while (count--) indexes.push(count)

        return Promise.all([User.deleteMany()])
    })

    describe('register user', () => {
        it('should succeed on correct dada', () =>
            socialApi.registerUser('John', 'ja@mail.com', '123')
                .then(res => expect(res).to.be.true)
        )

        it('should fail on already registered user', () =>
            User.create(userData)
                .then(() => {
                    const { name, email, password } = userData

                    return socialApi.registerUser(name, email, password)
                })
                .catch(({ message }) => {
                    expect(message).to.equal(`user with email ${userData.email} already exists`)
                })
        )

        it('should fail on no user name', () =>
            socialApi.registerUser()
                .catch(({ message }) => expect(message).to.equal('user name is not a string'))
        )

        it('should fail on empty user name', () =>
            socialApi.registerUser('')
                .catch(({ message }) => expect(message).to.equal('user name is empty or blank'))
        )

        it('should fail on blank user name', () =>
            socialApi.registerUser('     ')
                .catch(({ message }) => expect(message).to.equal('user name is empty or blank'))
        )

        it('should fail on no user email', () =>
            socialApi.registerUser(userData.name)
                .catch(({ message }) => expect(message).to.equal('user email is not a string'))
        )

        it('should fail on empty user email', () =>
            socialApi.registerUser(userData.name, '')
                .catch(({ message }) => expect(message).to.equal('user email is empty or blank'))
        )

        it('should fail on blank user email', () =>
            socialApi.registerUser(userData.name, '     ')
                .catch(({ message }) => expect(message).to.equal('user email is empty or blank'))
        )

        it('should fail on no user password', () =>
            socialApi.registerUser(userData.name, userData.email)
                .catch(({ message }) => expect(message).to.equal('user password is not a string'))
        )

        it('should fail on empty user password', () =>
            socialApi.registerUser(userData.name, userData.email, '')
                .catch(({ message }) => expect(message).to.equal('user password is empty or blank'))
        )

        it('should fail on blank user password', () =>
            socialApi.registerUser(userData.name, userData.email, '     ')
                .catch(({ message }) => expect(message).to.equal('user password is empty or blank'))
        )

        it('should fail on no user city', () =>
            socialApi.registerUser(userData.name, userData.email, userData.password)
                .catch(({ message }) => expect(message).to.equal('user city is not a string'))
        )

        it('should fail on empty user city', () =>
            socialApi.registerUser(userData.name, userData.email, userData.password, '')
                .catch(({ message }) => expect(message).to.equal('user city is empty or blank'))
        )

        it('should fail on blank user city', () =>
            socialApi.registerUser(userData.name, userData.email, userData.password, '     ')
                .catch(({ message }) => expect(message).to.equal('user city is empty or blank'))
        )


        describe('on unexpected server behavior', () => {
            let sandbox

            beforeEach(() => sandbox = sinon.createSandbox())

            afterEach(() => sandbox.restore())

            it('should fail on response status hacked', () => {
                const resolved = new Promise((resolve, reject) => {
                    resolve({ status: 201, data: { status: 'KO' } })
                })

                sandbox.stub(axios, 'post').returns(resolved)

                const { name, email, password } = userData

                return socialApi.registerUser(name, email, password)
                    .catch(({ message }) => {
                        expect(message).to.equal(`unexpected response status 201 (KO)`)
                    })
            })

            it('should fail on email hacked', () => {
                const resolved = new Promise((resolve, reject) => {
                    reject({ response: { data: { error: 'email is not a string' } } })
                })

                sandbox.stub(axios, 'post').returns(resolved)

                const { name, email, password } = userData

                return socialApi.registerUser(name, email, password)
                    .catch(({ message }) => {
                        expect(message).to.equal('email is not a string')
                    })
            })

            it('should fail on server down', () => {
                const resolved = new Promise((resolve, reject) => {
                    reject({ code: 'ECONNREFUSED' })
                })

                sandbox.stub(axios, 'post').returns(resolved)

                const { name, email, password } = userData

                return socialApi.registerUser(name, email, password)
                    .catch(({ message }) => {
                        expect(message).to.equal('could not reach server')
                    })
            })
        })
    })

    describe('authenticate user', () => {
        it('should succeed on correct data', () =>
            User.create(userData)
                .then(() =>
                    socialApi.authenticateUser('ja@mail.com', '123')
                        .then(id => {
                            expect(id).to.exist

                            expect(socialApi.token).not.to.equal('NO-TOKEN')
                        })
                )
        )

        it('should fail on no user email', () =>
            socialApi.authenticateUser()
                .catch(({ message }) => expect(message).to.equal('user email is not a string'))
        )

        it('should fail on empty user email', () =>
            socialApi.authenticateUser('')
                .catch(({ message }) => expect(message).to.equal('user email is empty or blank'))
        )

        it('should fail on blank user email', () =>
            socialApi.authenticateUser('     ')
                .catch(({ message }) => expect(message).to.equal('user email is empty or blank'))
        )

        it('should fail on no user password', () =>
            socialApi.authenticateUser(userData.email)
                .catch(({ message }) => expect(message).to.equal('user password is not a string'))
        )

        it('should fail on empty user password', () =>
            socialApi.authenticateUser(userData.email, '')
                .catch(({ message }) => expect(message).to.equal('user password is empty or blank'))
        )

        it('should fail on blank user password', () =>
            socialApi.authenticateUser(userData.email, '     ')
                .catch(({ message }) => expect(message).to.equal('user password is empty or blank'))
        )

        describe('on unexpected server behavior', () => {
            let sandbox

            beforeEach(() => sandbox = sinon.createSandbox())

            afterEach(() => sandbox.restore())

            it('should fail on response status hacked', () => {
                const resolved = new Promise((resolve, reject) => {
                    resolve({ status: 200, data: { status: 'KO' } })
                })

                sandbox.stub(axios, 'post').returns(resolved)

                const { email, password } = userData

                return socialApi.authenticateUser(email, password)
                    .catch(({ message }) => {
                        expect(message).to.equal(`unexpected response status 200 (KO)`)
                    })
            })

            it('should fail on email hacked', () => {
                const resolved = new Promise((resolve, reject) => {
                    reject({ response: { data: { error: 'email is not a string' } } })
                })

                sandbox.stub(axios, 'post').returns(resolved)

                const { email, password } = userData

                return socialApi.authenticateUser(email, password)
                    .catch(({ message }) => {
                        expect(message).to.equal('email is not a string')
                    })
            })

            it('should fail on server down', () => {
                const resolved = new Promise((resolve, reject) => {
                    reject({ code: 'ECONNREFUSED' })
                })

                sandbox.stub(axios, 'post').returns(resolved)

                const { email, password } = userData

                return socialApi.authenticateUser(email, password)
                    .catch(({ message }) => {
                        expect(message).to.equal('could not reach server')
                    })
            })
        })
    })

    describe('retrieve user', () => {
        it('should succeed on correct data', () =>
            User.create(userData)
                .then(({ id }) => {
                    const token = jwt.sign({ id }, TOKEN_SECRET)

                    socialApi.token = token

                    return socialApi.retrieveUser(id)
                })
                .then(user => {
                    expect(user).to.exist

                    const { name, email, _id, password } = user

                    expect(name).to.equal('John')
                    expect(email).to.equal('ja@mail.com')

                    expect(_id).to.be.undefined
                    expect(password).to.be.undefined
                })
        )

        it('should fail on no user id', () =>
            socialApi.retrieveUser()
                .catch(({ message }) => expect(message).to.equal('user id is not a string'))
        )

        it('should fail on empty user id', () =>
            socialApi.retrieveUser('')
                .catch(({ message }) => expect(message).to.equal('user id is empty or blank'))
        )

        it('should fail on blank user id', () =>
            socialApi.retrieveUser('     ')
                .catch(({ message }) => expect(message).to.equal('user id is empty or blank'))
        )

        describe('on unexpected server behavior', () => {
            let sandbox

            beforeEach(() => sandbox = sinon.createSandbox())

            afterEach(() => sandbox.restore())

            it('should fail on response status hacked', () => {
                const resolved = new Promise((resolve, reject) => {
                    resolve({ status: 200, data: { status: 'KO' } })
                })

                sandbox.stub(axios, 'get').returns(resolved)

                return socialApi.retrieveUser(fakeUserId)
                    .catch(({ message }) => {
                        expect(message).to.equal(`unexpected response status 200 (KO)`)
                    })
            })

            it('should fail on id hacked', () => {
                const resolved = new Promise((resolve, reject) => {
                    reject({ response: { data: { error: 'user id is not a string' } } })
                })

                sandbox.stub(axios, 'get').returns(resolved)

                return socialApi.retrieveUser(fakeUserId)
                    .catch(({ message }) => {
                        expect(message).to.equal('user id is not a string')
                    })
            })

            it('should fail on server down', () => {
                const resolved = new Promise((resolve, reject) => {
                    reject({ code: 'ECONNREFUSED' })
                })

                sandbox.stub(axios, 'get').returns(resolved)

                return socialApi.retrieveUser(fakeUserId)
                    .catch(({ message }) => {
                        expect(message).to.equal('could not reach server')
                    })
            })
        })
    })

    describe('udpate user', () => {
        it('should succeed on correct data', () =>
            User.create(userData)
                .then(({ id }) => {
                    const token = jwt.sign({ id }, TOKEN_SECRET)

                    socialApi.token = token

                    const { name, email, password, race, gender, description, photoProfile, birthdate, city, zip } = userData

                    return socialApi.updateUser(id, 'Jack', 'ja@mail.com', '123', 'jw@mail.com', '456', "pug", "female", "a dog", "/img", birthdate, "madrid", "890098")
                        .then(res => {
                            expect(res).to.be.true

                            return User.findById(id)
                        })
                        .then(user => {
                            expect(user).to.exist

                            const { name, email, password, race, gender, description, photoProfile, birthdate, city, zip } = user

                            expect(user.id).to.equal(id)
                            expect(name).to.equal('Jack')
                            expect(email).to.equal('jw@mail.com')
                            expect(password).to.equal('456')
                            expect(race).to.equal('pug')
                            expect(gender).to.equal('female')
                            expect(description).to.equal('a dog')
                            expect(photoProfile).to.equal('/img')
                            expect(city).to.equal('madrid')
                            expect(zip).to.equal('890098')



                        })
                })
        )

        it('should fail on changing email to an already existing user\'s email', () =>
            Promise.all([
                User.create(userData),
                User.create(otherUserData)
            ])
                .then(([{ id: id1 }, { id: id2 }]) => {
                    const token = jwt.sign({ id: id1 }, TOKEN_SECRET)

                    socialApi.token = token

                    const { name, email, password, race, gender, description, photoProfile, birthdate, city, zip } = userData

                    return socialApi.updateUser(id1, name, email, password, otherUserData.email, "123", race, gender, description, photoProfile, birthdate, city, zip)
                })
                .catch(({ message }) => expect(message).to.equal(`user with email ${otherUserData.email} already exists`))
        )

        it('should fail on no user id', () =>
            socialApi.updateUser()
                .catch(({ message }) => expect(message).to.equal('user id is not a string'))
        )

        it('should fail on empty user id', () =>
            socialApi.updateUser('')
                .catch(({ message }) => expect(message).to.equal('user id is empty or blank'))
        )

        it('should fail on blank user id', () =>
            socialApi.updateUser('     ')
                .catch(({ message }) => expect(message).to.equal('user id is empty or blank'))
        )

        it('should fail on no user name', () =>
            socialApi.updateUser(fakeUserId)
                .catch(({ message }) => expect(message).to.equal('user name is not a string'))
        )

        it('should fail on empty user name', () =>
            socialApi.updateUser(fakeUserId, '')
                .catch(({ message }) => expect(message).to.equal('user name is empty or blank'))
        )

        it('should fail on blank user name', () =>
            socialApi.updateUser(fakeUserId, '     ')
                .catch(({ message }) => expect(message).to.equal('user name is empty or blank'))
        )

        it('should fail on no user email', () =>
            socialApi.updateUser(fakeUserId, userData.name)
                .catch(({ message }) => expect(message).to.equal('user email is not a string'))
        )

        it('should fail on empty user email', () =>
            socialApi.updateUser(fakeUserId, userData.name, '')
                .catch(({ message }) => expect(message).to.equal('user email is empty or blank'))
        )

        it('should fail on blank user email', () =>
            socialApi.updateUser(fakeUserId, userData.name, '     ')
                .catch(({ message }) => expect(message).to.equal('user email is empty or blank'))
        )

        it('should fail on no user password', () =>
            socialApi.updateUser(fakeUserId, userData.name, userData.email)
                .catch(({ message }) => expect(message).to.equal('user password is not a string'))
        )

        it('should fail on empty user password', () =>
            socialApi.updateUser(fakeUserId, userData.name, userData.email, '')
                .catch(({ message }) => expect(message).to.equal('user password is empty or blank'))
        )

        it('should fail on blank user password', () =>
            socialApi.updateUser(fakeUserId, userData.name, userData.email, '     ')
                .catch(({ message }) => expect(message).to.equal('user password is empty or blank'))
        )

        it('should fail on no user newEmail', () =>
            socialApi.updateUser(fakeUserId, userData.name, userData.email, userData.password)
                .catch(({ message }) => expect(message).to.equal('user newEmail is not a string'))
        )

        it('should fail on empty user newEmail', () =>
            socialApi.updateUser(fakeUserId, userData.name, userData.email, userData.password, '')
                .catch(({ message }) => expect(message).to.equal('user newEmail is empty or blank'))
        )

        it('should fail on blank user newEmail', () =>
            socialApi.updateUser(fakeUserId, userData.name, userData.email, userData.password, '     ')
                .catch(({ message }) => expect(message).to.equal('user newEmail is empty or blank'))
        )


        it('should fail on no user newPassword', () =>
            socialApi.updateUser(fakeUserId, userData.name, userData.email, userData.password, otherUserData.email)
                .catch(({ message }) => expect(message).to.equal('user newPassword is not a string'))
        )

        it('should fail on empty user newPassword', () =>
            socialApi.updateUser(fakeUserId, userData.name, userData.email, userData.password, otherUserData.email, '')
                .catch(({ message }) => expect(message).to.equal('user newPassword is empty or blank'))
        )

        it('should fail on blank user newPassword', () =>
            socialApi.updateUser(fakeUserId, userData.name, userData.email, userData.password, otherUserData.email, '     ')
                .catch(({ message }) => expect(message).to.equal('user newPassword is empty or blank'))
        )

        it('should fail on no user race', () =>
            socialApi.updateUser(fakeUserId, userData.name, userData.email, userData.password, otherUserData.email, otherUserData.password)
                .catch(({ message }) => expect(message).to.equal('user race is not a string'))
        )

        it('should fail on empty user race', () =>
            socialApi.updateUser(fakeUserId, userData.name, userData.email, userData.password, otherUserData.email, otherUserData.password, '')
                .catch(({ message }) => expect(message).to.equal('user race is empty or blank'))
        )

        it('should fail on blank user race', () =>
            socialApi.updateUser(fakeUserId, userData.name, userData.email, userData.password, otherUserData.email, otherUserData.password, '     ')
                .catch(({ message }) => expect(message).to.equal('user race is empty or blank'))
        )

        it('should fail on no user gender', () =>
            socialApi.updateUser(fakeUserId, userData.name, userData.email, userData.password, otherUserData.email, otherUserData.password, userData.race)
                .catch(({ message }) => expect(message).to.equal('user gender is not a string'))
        )

        it('should fail on empty user gender', () =>
            socialApi.updateUser(fakeUserId, userData.name, userData.email, userData.password, otherUserData.email, otherUserData.password, userData.race, '')
                .catch(({ message }) => expect(message).to.equal('user gender is empty or blank'))
        )

        it('should fail on blank user gender', () =>
            socialApi.updateUser(fakeUserId, userData.name, userData.email, userData.password, otherUserData.email, otherUserData.password, userData.race, '     ')
                .catch(({ message }) => expect(message).to.equal('user gender is empty or blank'))
        )

        it('should fail on no user description', () =>
            socialApi.updateUser(fakeUserId, userData.name, userData.email, userData.password, otherUserData.email, otherUserData.password, userData.race, userData.gender)
                .catch(({ message }) => expect(message).to.equal('user description is not a string'))
        )

        it('should fail on empty user description', () =>
            socialApi.updateUser(fakeUserId, userData.name, userData.email, userData.password, otherUserData.email, otherUserData.password, userData.race, userData.gender, '')
                .catch(({ message }) => expect(message).to.equal('user description is empty or blank'))
        )

        it('should fail on blank user description', () =>
            socialApi.updateUser(fakeUserId, userData.name, userData.email, userData.password, otherUserData.email, otherUserData.password, userData.race, userData.gender, '     ')
                .catch(({ message }) => expect(message).to.equal('user description is empty or blank'))
        )


        it('should fail on no user photoProfile', () =>
            socialApi.updateUser(fakeUserId, userData.name, userData.email, userData.password, otherUserData.email, otherUserData.password, userData.race, userData.gender, userData.description)
                .catch(({ message }) => expect(message).to.equal('user photoProfile is not a string'))
        )

        it('should fail on empty user photoProfile', () =>
            socialApi.updateUser(fakeUserId, userData.name, userData.email, userData.password, otherUserData.email, otherUserData.password, userData.race, userData.gender, userData.description, '')
                .catch(({ message }) => expect(message).to.equal('user photoProfile is empty or blank'))
        )

        it('should fail on blank user photoProfile', () =>
            socialApi.updateUser(fakeUserId, userData.name, userData.email, userData.password, otherUserData.email, otherUserData.password, userData.race, userData.gender, userData.description, '     ')
                .catch(({ message }) => expect(message).to.equal('user photoProfile is empty or blank'))
        )

        it('should fail on no user birthdate', () =>
            socialApi.updateUser(fakeUserId, userData.name, userData.email, userData.password, otherUserData.email, otherUserData.password, userData.race, userData.gender, userData.description, userData.photoProfile, 0)
                .catch(({ message }) => expect(message).to.equal('user birthdate is not a object'))
        )

        it('should fail on no user city', () =>
            socialApi.updateUser(fakeUserId, userData.name, userData.email, userData.password, otherUserData.email, otherUserData.password, userData.race, userData.gender, userData.description, userData.photoProfile, birthdate)
                .catch(({ message }) => expect(message).to.equal('user city is not a string'))
        )

        it('should fail on empty user city', () =>
            socialApi.updateUser(fakeUserId, userData.name, userData.email, userData.password, otherUserData.email, otherUserData.password, userData.race, userData.gender, userData.description, userData.photoProfile, birthdate, '')
                .catch(({ message }) => expect(message).to.equal('user city is empty or blank'))
        )

        it('should fail on blank user city', () =>
            socialApi.updateUser(fakeUserId, userData.name, userData.email, userData.password, otherUserData.email, otherUserData.password, userData.race, userData.gender, userData.description, userData.photoProfile, birthdate, '     ')
                .catch(({ message }) => expect(message).to.equal('user city is empty or blank'))
        )

        it('should fail on no user zip', () =>
            socialApi.updateUser(fakeUserId, userData.name, userData.email, userData.password, otherUserData.email, otherUserData.password, userData.race, userData.gender, userData.description, userData.photoProfile,birthdate, userData.city)
                .catch(({ message }) => expect(message).to.equal('user zip is not a string'))
        )

        it('should fail on empty user zip', () =>
            socialApi.updateUser(fakeUserId, userData.name, userData.email, userData.password, otherUserData.email, otherUserData.password, userData.race, userData.gender, userData.description, userData.photoProfile, birthdate , userData.city, '')
                .catch(({ message }) => expect(message).to.equal('user zip is empty or blank'))
        )

        it('should fail on blank user zip', () =>
            socialApi.updateUser(fakeUserId, userData.name, userData.email, userData.password, otherUserData.email, otherUserData.password, userData.race, userData.gender, userData.description, userData.photoProfile, birthdate , userData.city, '     ')
                .catch(({ message }) => expect(message).to.equal('user zip is empty or blank'))
        )


    })

    describe('unregister user', () => {
        it('should succeed on correct data', () =>
            User.create(userData)
                .then(({ id }) => {
                    const token = jwt.sign({ id }, TOKEN_SECRET)

                    socialApi.token = token

                    const { email, password } = userData

                    return socialApi.unregisterUser(id, email, password)
                        .then(res => {
                            expect(res).to.be.true

                            return User.findById(id)
                        })
                        .then(user => {
                            expect(user).to.be.null
                        })
                })
        )

        it('should fail on no user id', () =>
            socialApi.unregisterUser()
                .catch(({ message }) => expect(message).to.equal('user id is not a string'))
        )

        it('should fail on empty user id', () =>
            socialApi.unregisterUser('')
                .catch(({ message }) => expect(message).to.equal('user id is empty or blank'))
        )

        it('should fail on blank user id', () =>
            socialApi.unregisterUser('     ')
                .catch(({ message }) => expect(message).to.equal('user id is empty or blank'))
        )

        it('should fail on no user email', () =>
            socialApi.unregisterUser(fakeUserId)
                .catch(({ message }) => expect(message).to.equal('user email is not a string'))
        )

        it('should fail on empty user email', () =>
            socialApi.unregisterUser(fakeUserId, '')
                .catch(({ message }) => expect(message).to.equal('user email is empty or blank'))
        )

        it('should fail on blank user email', () =>
            socialApi.unregisterUser(fakeUserId, '     ')
                .catch(({ message }) => expect(message).to.equal('user email is empty or blank'))
        )

        it('should fail on no user password', () =>
            socialApi.unregisterUser(fakeUserId, userData.email)
                .catch(({ message }) => expect(message).to.equal('user password is not a string'))
        )

        it('should fail on empty user password', () =>
            socialApi.unregisterUser(fakeUserId, userData.email, '')
                .catch(({ message }) => expect(message).to.equal('user password is empty or blank'))
        )

        it('should fail on blank user password', () =>
            socialApi.unregisterUser(fakeUserId, userData.email, '     ')
                .catch(({ message }) => expect(message).to.equal('user password is empty or blank'))
        )
    })


    after(done => mongoose.connection.db.dropDatabase(() => mongoose.connection.close(done)))
})