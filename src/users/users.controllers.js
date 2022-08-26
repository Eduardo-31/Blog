const uuid = require('uuid')
const { hashPassword } = require('../utils/bcrypt')

const usersDB = [{
    "id": "9570e777-e6ce-4696-99b4-3bf5917a793a",
    "first_name": "b",
    "last_name": "string",
    "email": "example@example.com",
    "password": "$2b$10$uIBx3bG5iJcqJ3RlnqF4RONprG4qTsyLEmgMgr5VEtJjzcmQtfHxC",
    "phone": "+52 31435143",
    "birthday_date": "DD/MM/YYYY",
    "rol": "admin",
    "profile_image": "example.com/img/example.png",
    "country": "string",
    "is_active": true,
    "verified": false
  },{
    "id": "14115ee1-cb84-495b-bcf4-b075390a3779",
    "first_name": "eduardo",
    "last_name": "izacupe",
    "email": "eduardo@example.com",
    "password": "$2b$10$Vl8SMG3lXqwI7DTA2rM4nu6P4GVBQyaImbXhmnZWYczRXkCelNJYC",
    "phone": "+52 31435143",
    "birthday_date": "DD/MM/YYYY",
    "rol": "normal",
    "profile_image": "example.com/img/example.png",
    "country": "string",
    "is_active": true,
    "verified": false
  }
]


const getAllUsers = () => {
    return usersDB
}

const getUserById = (id) => {
    const data = usersDB.filter(item => item.id === id)
    return data.length ? data[0] : false
}

const createUser = (data) => {

    const newUser = {
        id: uuid.v4(),  // obligatorio y unico
        first_name: data.first_name,  // obligatorio
        last_name: data.last_name,  //obligatorio
        email: data.email,  //obligatorio y unico
        password: hashPassword(data.password), // obligatorio
        phone: data.phone ? data.phone : '',  // unico
        birthday_date: data.birthday_date,  // obligatorio
        rol: 'normal',  // obligatorio y por defecto 'normal
        profile_image: data.profile_image ? data.profile_image : '',  //
        country: data.country,  // obligatorio
        is_active: true,  // obligatorio y por defecto true
        verified: false //obligatorio y por defecto false
    }
    usersDB.push(newUser)
    return newUser;
    //console.log(newUser)


}

const updateUser = (id, data, rol) => {
    const index = usersDB.findIndex(item => item.id === id)

    if(index !== -1){
        usersDB[index] = {
            id: id,
            first_name: data.first_name,
            last_name: data.last_name,
            email: data.email ,
            password: usersDB[index].password,
            phone: data.phone, //unico
            birthday_date: data.birthday_date,
            rol: rol === 'admin' ? data.rol :'normal',
            profile_image: data.profile_image,
            country: data.country,
            is_active: data.is_active,
            verified: false 
        }
        return usersDB[index];
    }else{
        const created = createUser(data)
        return {created}
    }
}

const deleteUser = (id) => {
    const index = usersDB.findIndex(item => item.id === id)
    if(index !== -1){
        usersDB.splice(index, 1)
        return true
    }else{
        return false
    }
}

const getUserByEmail = (email) => {
    const data = usersDB.filter(item => item.email === email)
    return data.length ? data[0] : false
}


module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    getUserByEmail
}