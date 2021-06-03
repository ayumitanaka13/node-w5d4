const bcrypt = require('bcryptjs')

const SignUp = require('../../src/routes/sign-up')
const User = require('../../src/model/User')

const { expect } = require('chai')

// describe (block) --> it (unit) --> expect

describe('Sign Up', () => {
    describe('#handler', () => {

        beforeEach(async () => {
            this.user = {
                email: 'hogehoge@hoge.com',
                firstName: 'hoge',
                lastName: 'hoge',
                password: 'hogehoge' //after brypt, this might look like: 342362asfagaras123123qf23
            }

            this.expectedPassword = 'hashed-password'
            this.mockBcrypt = sinon.mock(bcrypt)
            this.mockBcrypt.expects('hash').once().resolves(this.expectedPassword)

            this.res = await SignUp.handler({ payload: this.user })
        })

        afterEach(async () => {
            await User.deleteMany({})
        })


        it('create the user in the database', async () => {
            expect(await User.countDocuments()).to.equal(1)
        })

        it('return user object', () => {
            expect(this.res).to.deep.include({
                email: this.user.email,
                firstName: this.user.firstName,
                lastName: this.user.lastName
            })
        })

        it('creates password hash', async () => {
            expect(await User.findOne()).to.have.property('encryptedPassword')
        })

        it('hashes the expected password', async () => {
            expect(await User.findOne()).to.have.property('encryptedPassword', this.expectedPassword)
        })
        
    })

})