const repo = require('../repository/userRepository')
const UserRepository = require("../repository/userRepository");
const validator = require('validator');
const {CustomError} = require('../entity/api')
// const api = require('../entity/api')

class UserUsecase {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }

    async getUsers() {
        try {
            return await this.userRepository.fetchUsers()
        } catch (error) {
            throw error
        }
    }

    async loginUsers(email, password) {
        try {
            if(!email || !password){
                throw new CustomError("missing required field", 400)
            }

            const user = await this.userRepository.fetchUserEmail(email)
            return user.password === password;
        } catch (error) {
            throw error
        }
    }

    async registerUser(user){
        try {
            if(!user.username || !user.password || !user.email){
                throw new CustomError("missing required field", 400)
            }

            if(!validator.isEmail(user.email)){
                throw new CustomError("not a correct email format", 400)
            }

            await this.userRepository.insertUser(user)
        } catch (error) {
            throw error
        }
    }

}

module.exports = UserUsecase