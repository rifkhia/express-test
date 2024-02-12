const {
    v4: uuidv4,
} = require('uuid');

class UserLoginDTO {
    constructor(email, password) {
        this.email = email;
        this.password = password;
    }
}

class UserRegisterDTO {
    constructor(username, email, password) {
        this.id = uuidv4();
        this.username = username;
        this.email = email;
        this.password = password;
    }
}

module.exports = {
    UserLoginDTO,
    UserRegisterDTO,
}