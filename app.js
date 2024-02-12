const express = require('express');
const usecase = require('./src/usecase/userUsecase')
const api = require('./src/entity/api')
const userRouter = require('./src/router/userRouter')

const app = express();

app.use('/user', userRouter)

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});