const usersControllers = require('./users.controllers')


const getAll = (req, res) => {
    const data = usersControllers.getAllUsers()
    res.status(200).json({items: data.length, users: data})
}

const getById = (req, res) => {
    const id = req.params.id
    const data = usersControllers.getUserById(id)
    if(data){
        return res.status(200).json(data)
    }else{
        return res.status(404).json({message: `The user with the id: ${id} does not exist.`})
    }
} 

const register = (req, res) => {
    const data = req.body
    if(!data){
        return res.status(400).json({message: 'Missing data'})
    }

    if(
        !data.first_name ||
        !data.last_name ||
        !data.email ||
        !data.password ||
        !data.birthday_date ||
        !data.country
    ){
        return res.status(400).json({
            message: 'All fields must be completed',
            filds: {
                first_name: 'string',
                last_name: 'string',
                email: 'example@example.com',
                password: 'string',
                birthday_date: 'DD/MM/YYYY',
                country: 'string'
            }
        });
    }else{
        const response = usersControllers.createUser(data)  
        return res.status(201).json({
            message: `User created succesfully with id: ${response.id}`,
            user: response
        });
    }
}

const remove = (req, res) => {
    const id = req.params.id
    const data = usersControllers.deleteUser(id)
    if(data){
        return res.status(204).json()
    }else{
        return res.status(400).json({message: 'Invalid ID'})
    }
}

const update = (req, res) => {
    const rol = req.user.rol
    const id = req.params.id
    const data = req.body
    if(!Object.keys(data).length){
        res.status(400).json({message: 'Missing Data'})
    }else if (
        !data.first_name ||
        !data.last_name ||
        !data.email ||
        !data.password ||
        !data.phone ||
        !data.birthday_date ||
        !data.rol ||
        !data.profile_image ||
        !data.country ||
        !data.is_active
    ){
        res.status(400).json({
            message: 'All fields must be completed',
            filds: {
                first_name: 'string',
                last_name: 'string',
                email: 'example@example.com',
                password: 'string',
                phone: '+52 31435143',
                birthday_date: 'DD/MM/YYYY',
                rol: 'normal',
                profile_image: 'example.com/img/example.png',
                country: 'string',
                is_active: true
            }
        })
    } else {
        const response = usersControllers.updateUser(id, data, rol)
        res.status(200).json({
            message: `${response.created? 
                'the id does not exist therefore a new user was created':'User edited succesfully'}`,
            user: response
        })
    }
}


const getMyUser= (req, res) => {
    const id =  req.user.id
    const response = usersControllers.getUserById(id)
    if(response){
        res.status(200).json(response)
    }else{
        res.status(404).json({message: `The user with the id: ${response.id} does not exist`})
    }
}

const removeMyUser = (req, res) => {
    const id = req.user.id
    const response = usersControllers.deleteUser(id)
    if(response){
        res.status(204).json()
    }else{
        res.status(400).json({message: 'Invalid id'})
    }
}

const updateMyUser = (req, res) =>{
    const id = req.user.id
    const data = req.body
    if(!Object.keys(data).length){
        res.status(400).json({message: 'Missing data'})
    } else if (
        !data.first_name ||
        !data.last_name ||
        !data.email ||
        !data.phone ||
        !data.birthday_date ||
        !data.profile_image ||
        !data.country ||
        !data.is_active
    ){
        res.status(400).json({
            message: 'All fields must be completed',
            fields: {
                first_name: 'string',
                last_name: 'string',
                email: 'example@example.com',
                phone: '+52 31435143',
                birthday_date: 'DD/MM/YYYY',
                profile_image: 'example.com/img/example.png',
                country: 'string',
                is_active: true
            }
        })
    }else{
        const response = usersControllers.updateUser(id, data)
        res.status(200).json({
            message: `You have successfully edited your user ${response.email}`,
            user: response
        })
    }
}

module.exports = {
    getAll,
    getById,
    register,
    remove,
    update,
    getMyUser,
    removeMyUser,
    updateMyUser
}