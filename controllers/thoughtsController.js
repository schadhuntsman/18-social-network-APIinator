const { Thoughts, User } = require('../models');

const thoughtsController = {
    getAllThoughts(req, res) {
        Thoughts.find({})
        .populate({
            path: 'thoughts',
            select: '-__v'
        })
        .select('-__v')
        .sort({ _id: -1 })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
        res.status(400).json(err);
    });
},
    //add thoughts to user
    addThought({ params, body }, res) {
        console.log(body);
        Thought.create(body)
        .then(({ _id }) => {
            return User.findOneAndUpdate(
                {_id: params.userId },
                { $push: { thoughts: _id } },
                { new: true }
            );
            console.log(_id)
        })
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json({ message: 'no thought with this id' });
                return;
            }
            res.json(dbUserData);
        }) 
    },
    

    removeThought({ params }, res) {
        Thoughts.findOneAndDelete({ _id: params.thoughtsId })
        .then(deletedThought => {
            if (!deletedThought) {
            return res.status(404).json({ message: 'no thought found with this id' });
        }
        return reaction.findOneAndUpdate(
            { id: params.reactonId },
            { $pull: { thoughts: params.thoughtsId } },
            { $pull: { reaction: params.reactionId } },
            { new: true }
        )
        })
            .then(dbUserData => {
                if(!dbUserData) {
                    res.status(404).json({ message: 'no user found with this id'})
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.json(err))
}


};

module.exports = thoughtsController;