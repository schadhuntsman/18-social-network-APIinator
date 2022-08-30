const { db } = require("../models/Recipes")

const userController = {
    //get all users
    getAllUsers(req, res) {
        User.find({})
        .populate({
            path: 'thoughts',
            select: '-__v'
        })
        .select('-__v')
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
        res.status(400).json(err);
    });
},

//get one user by id
    getUserById({ params }, res) {
        User.findOne({_id: params.id })
        .then(dbUserData => {
        //if no user found send 404
            if(!dbUserData) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            }
            res.json(dbUserData);
         })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
 },

 createUser({ body }, res) {
    User.create(body)
    .then(dbUserData => res.json(dbUserData))
    .catch(err => res.status(404).json(err));
 },

 updateUser({ params}, res) {
    User.findOneAndUpdate({ _id: params.id }, body, { new: true })
    .then(dbUserData => {
        if(!dbUserData) {
            res.status(404).json({ message: 'no user found with this id' });
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => res.status(400).json(err));
 },

 deleteUser({ params }, res) {
    User.findOneAndDelete({ _id: params.id })
    .then(dbUserData => {
        if(!dbUserData) {
        res.status(404).json({ message: 'no user with that id!'});
        return;
        }
        res.json(dbUserData);
    }) 
    .catch(err => res.status(400).json(err));
 }

}