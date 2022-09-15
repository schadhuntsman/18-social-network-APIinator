const { User } = require("../models/Recipes")

const userController = {
    //get all users
    getAllUsers(req, res) {
        User.find({})
        .populate({
            path: 'thoughts',
            select: '-__v'
        })
        .select('-__v')
        .then(dbUfierData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
        res.status(400).json(err);
    });
},

//get one user by id
getUserById({ params }, res) {
    User.findOne({_id: params.id })
    .populate({
        path: 'friends',
        select: '-__v'
    })
    .select('-__v')
    .then(dbUserData => {
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
//update user by id
 updateUser({ params, body }, res) {
    User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
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
 },

 addFriend({ params }, res) {
    User.findOne({ _id: params.friendId })
      .then((dbUserData) => {
        console.log(dbUserData);
        if (!dbUserData) {
          res.status(404).json({ messaage: "No user found with this id1" });
          return;
        }

        return User.findOneAndUpdate(
          { _id: params.userId },
          { $push: {friends: params.friendId } },
          { new: true }
        );
      })
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ messaage: "No user found with this id2" });
          return;
        }

        res.json(dbUserData);
      })

      .catch((err) => res.json(err));
  },

  removeFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.userId },
      { $pull: {friends: params.friendId } },
      { new: true }
    )
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ messaage: "No user found with this id" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => res.json(err));
  },
};

