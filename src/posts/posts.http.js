const postsControllers = require('./posts.controllers')


const getAll = (req, res) => {
    const data = postsControllers.getAllPosts()
    res.status(200).json({items: data.length, posts: data})
}

const create = (req, res) => {
    const userID = req.user.id
    const data = req.body
    if(!Object.keys(data).length){
        res.status(400).json({message: 'Missing Data'})
    }

    if(
        !data.title ||
        !data.content ||
        !data.header_image 
    ){
        return res.status(400).json({
            message: 'All fields must be completed',
            filds: {
                title: 'string',
                content: 'string',
                header_image: 'img/img.png'
            }
        })
    }else{
        const response = postsControllers.createPosts(data, userID)
        return res.status(201).json({
            message: `User created succesfully with id: ${response.id}`,
            post: response
        })
    }
}


const getById = (req, res) => {
    const id = req.params.id
    const data = postsControllers.getPostById(id)
    if(data){
        return res.status(200).json(data)
    }else{
        return res.status(404).json({message: `The post with id: ${id} does not exist.`})
    }

}


const getMyUser = (req, res) => {
    const userID = req.user.id
    const data = postsControllers.getUserMyPosts(userID)
    if(data){
        return res.status(200).json({items: data.length, posts: data})
    }else{
        return res.status(200).json({item: 0, message: 'You have no posts created, please create one'})
    }
}


const getMyUserById = (req,res) => {
    const userID = req.user.id
    const id = req.params.id
    const data = postsControllers.getMyUserPostID(userID, id)
    if(data){
        return res.status(200).json(data)
    }else{
        return res.status(404).json({message: `There is no post with that id: ${id}`})
    }
}

const deleteMyPost = (req, res) => {
    const userID = req.user.id
    const id = req.params.id
    const response = postsControllers.removeMyPost(userID, id)
    if(response){
        return res.status(204).json()
    }else{
        return res.status(400).json({message: 'Invalid ID'})
    }
}

const updateMyPost = (req, res) => {
    const userID = req.user.id
    const user = req.user
    const id = req.params.id
    const data = req.body
    if(!Object.keys(data).length){
        return res.status(400).json({message: 'Missing data'})
    }

    if(
        !data.title ||
        !data.content ||
        !data.header_image 
    ){
        return res.status(400).json({
            message: 'All fields must be completed',
            filds: {
                title: 'string',
                content: 'string',
                header_image: 'img/img.png'
            }
        })  
    }else{
        const response = postsControllers.updateMyPostByID(userID, id, data)
        return res.status(200).json({
            message: response.created ? 
            `No post found with that id ${id}, so you have created a new one with this id:${response.created.id}`:
            `Congratulations ${user.email}, You have successfully edited your post with id: ${response.id}`,
            post:  response.created? response.created : response
        })
    }
}


module.exports = {
    getAll,
    create,
    getById,
    getMyUser,
    getMyUserById,
    deleteMyPost,
    updateMyPost,
}