const { getUserByEmail } = require('../users/users.controllers')
const { comparePassword } = require('../utils/bcrypt')

const loginUser = (email, password) => {
    const user = getUserByEmail(email)
    if(user){
        const verify_password = comparePassword(password, user.password)
        if(verify_password){
            return user
        }
    }
    return false
}

//console.log(login('example@example.com', 'string'))

module.exports = {
    loginUser
}