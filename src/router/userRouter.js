const express = require('express');
const dto = require('../dto/users')
const UserUseCase = require('../usecase/userUseCase');
const UserRepository = require('../repository/userRepository');
const api = require('../entity/api')

const router = express.Router();

const userRepository = new UserRepository();
const userUseCase = new UserUseCase(userRepository);

router.use(express.json())

router.get('/', async (req, res) => {
    try {
        const result = await userUseCase.getUsers()
        return res.status(200).json(new api.ApiResponse('success retrieving users', result));
    } catch (err) {
        return res.status(err.statusCode).json(new api.ApiResponse(err.message));
    }
});

router.post('/login', async (req, res)=> {
    try {
        const {email, password} = req.body
        await userUseCase.loginUsers(email, password)
        return res.status(200).json(new api.ApiResponse('success login', "blabla"));
    } catch (err){
        return res.status(err.statusCode).json(new api.ApiResponse(err.message))
    }
})

router.post('/register', async(req, res)=>{
    try {
        const {username, email, password} = req.body
        const userDTO = new dto.UserRegisterDTO(username, email, password)
        await userUseCase.registerUser(userDTO)
        return res.status(201).json(new api.ApiResponse('success register', "blabla"));
    } catch (err) {
        return res.status(err.statusCode).json(new api.ApiResponse(err.message))
    }
})

module.exports = router;