const db = require('../repository/config.js');
const dto = require('../dto/users')
const {CustomError} = require('../entity/api')


class UserRepository {
    async fetchUsers(){
        try {
            const users = await db.query('SELECT id, username, email FROM users')
            return users.rows
        } catch (error) {
            throw new CustomError('Error while retrieving users', 500)
        }
    }

    async fetchUserEmail(email){
        try {
            const users = await db.query('SELECT * FROM users where email = $1', [email])
            if(users.rowCount === 0){
                throw new CustomError('no users found using current email', 400)
            }
            return users.rows[0]
        } catch (error) {
            if(error.message === 'no users found using current email'){
                throw new CustomError('no users found using current email', 400)
            }
            throw new CustomError('Error while retrieving users', 500)
        }
    }

    async insertUser(user) {
        try {
            const value = [user.id, user.username, user.email, user.password]
            await db.query('INSERT INTO users VALUES($1, $2, $3, $4)', value)
        } catch (error) {
            if(error.routine.includes("_bt_check_unique")){
                throw new CustomError("email or username already taken", 400)
            }
            throw new CustomError(error, 500)
        }
    }
}

module.exports = UserRepository