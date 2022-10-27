const { User } = require("../models")

const userController = {
    //get all users
    getAllUsers(req, res) {
      User.find({})
      .select('-__v')
      .sort({ _id: -1 })
      .then(dbUserData => res.json(dbUserData))
      .catch(err => {
        console.log(err);
        res.sendStatus(400);
      });
},

//get one user by id

getUserById({ params }, res) {
  User.findOne({ _id: params.id })
  .then(dbUserData => res.json(dbUserData))

  .catch(err => {
      console.log(err);
      res.status(400).json(err); 
  })
},

//create user
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
            res.status(500).json({ message: 'no user found with that id' });
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => res.status(400).json(err));
 },

 deleteUser({ params }, res) {
    User.deleteMany({ userId: params.id })
    .then(() => {
      User.findOneAndDelete({ userId: params.id })
        if(!dbUserData) {
        res.status(404).json({ message: 'no user with that id!'});
        return;
        }
        res.json(dbUserData);
    }) 
    .catch(err => res.status(400).json(err));
 },

 addFriend({ params }, res) {
  User.findOneAndUpdate({ _id: params.id },
      { $push: { friends: params.friendId } },
      { new: true, runValidators: true }
      )
      
      .then(dbUserData => {
          if(!dbUserData) {
              res.status(404).json({ message: 'No friend found with thid ID.'});
              return;
          }

          res.json(dbUserData);
      })

      .catch(err => res.json(err));
},


  removeFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.userId },
      { $pull: {friends: params.friendId} },
      { new: true }
    )
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ messaage: "No user found with that id" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => res.status(400).json(err));
  }

};
module.exports = userController




