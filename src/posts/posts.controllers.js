const uuid = require('uuid')

const postsDB = [{
    "id": "7fd86704-df73-44cc-9f6c-78326744e833",
    "title": "hecho por example user",
    "content": "jugando con exmaple con ",
    "header_image": "img/img.png",
    "user_id": "9570e777-e6ce-4696-99b4-3bf5917a793a",
    "published": true
  }, {
    "id": "69dd2cd2-70fa-48b7-9149-e9822dba0cd6",
    "title": "eduardo",
    "content": "eduardo y sus amigossss",
    "header_image": "img/img.png",
    "user_id": "14115ee1-cb84-495b-bcf4-b075390a3779",
    "published": true
  },{
    "id": "7225c27d-b8a0-4a78-8dec-1a581f433239",
    "title": "eduardo saliendo a pasear",
    "content": "salgo a paseasr todos los dias al parque",
    "header_image": "img/img.png",
    "user_id": "14115ee1-cb84-495b-bcf4-b075390a3779",
    "published": true
  }

]


// /api/v1/posts

const getAllPosts = () => {
    return postsDB
}

const createPosts = (data, userID) => {
    const newPost = {
        id: uuid.v4(),
        title: data.title,
        content: data.content,
        header_image: data.header_image,
        user_id: userID,
        published: true
    }
    postsDB.push(newPost)
    return newPost
}


// /api/v1/posts/:id 
const getPostById = (id) => {
    const data = postsDB.filter(post => post.id === id)
    return data.length ? data[0] : false
}


// api/v1/users/me/posts
const getUserMyPosts = (userID) => {
    const data = postsDB.filter(post => post.user_id === userID)
    return data.length ? data : false
}




//  /api/v1/users/me/posts/:id 

const getMyUserPostID = (userID, id) => {
    const data = postsDB.filter(post => post.user_id === userID)
    const response = data.filter(post => post.id === id)
    
    console.log(response.length)
    return response.length ? response[0] : false
}

//console.log(getUserPostID('1214', '7' ))   // 1,3,5,7 

const removeMyPost = (userID,id) => {
    const index = postsDB.findIndex(post => post.id === id && post.user_id === userID)
    console.log(index)
    if(index !== -1){
        postsDB.splice(index, 1)
        return true
    }else{
        return false
    }
}

//console.log(removeMyPost('1214', '4'))

const updateMyPostByID = (userID, id, data) => {
    const index = postsDB.findIndex(post => post.id === id && post.user_id === userID)
    if(index !== -1){
        postsDB[index] = {
            id: id,
            title: data.title,
            content: data.content,
            header_image: data.header_image,
            user_id: userID,
            published: true
        }
        return postsDB[index]
    }else{
        return  {created : createPosts(data, userID)}
    }

}


module.exports = {
    getAllPosts,
    createPosts,
    getPostById,
    getUserMyPosts,
    getMyUserPostID,
    removeMyPost,
    updateMyPostByID
}

//console.log(removeMyPost('1214', '7'))