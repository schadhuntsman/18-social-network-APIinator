const router = require('express').Router();
const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend,
    
} =require('../../controllers/userController.js')

//set up get and post for api/user

router.route('/')
.get(getAllUsers)
.post(createUser);

    //set up GET one put and delete at api pizza id

    router.route('/:id')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser);

    router.route('/:userId/friends/:friendId').post(addFriend).delete(removeFriend);

    module.exports = router;