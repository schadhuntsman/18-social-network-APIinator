// const router = require('express').Router();
const {
    getAllUsers,
    getUser,
    getUserById,
    createUser,
    updateUser,
    deleteUser
} =require('../../controllers/userController')

//set up get and post for api/user

router
    .route('/')
    .get(getAllUsers)
    .post(createUser)

    //set up GET one put and delete at api pizza id

    .route('/:id')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser);

    module.exports = router;