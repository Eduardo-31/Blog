const jwt = require('jsonwebtoken')
const { loginUser } = require("./auth.controllers")

const login = (req, res) => {
    const data = req.body
    if(!data.email || !data.password){
        res.status(400).json({message: 'Missing data'})
    }

    const response = loginUser(data.email, data.password)
    if(response){
        const token = jwt.sign({
            id: response.id,
            email:response.email,
            rol: response.rol
        }, 'calango')
        res.status(200).json({
            message: `Your credentials are correct, you started the section with the email: ${response.email}`, 
            token })
    }else{
        res.status(401).json({message: 'Invalid Credentials'})
    }
}

module.exports = {
    login
}