const { Thoughts, User } = require('../models');

const thoughtsController = {
    getAllThoughts(req, res) {
        Thoughts.find({})
        .then((dbThoughtData) => res.json
        (dbThoughtData))
        .catch(err => {
            console.log(err);
        res.status(400).json(err);
        });
      },
   },
    //add thoughts to user
    addThought({ params, body }, res) {
        console.log(body);
        Thought.create(body)
        .then(({ _id }) => {
            return User.findOneAndUpdate(
                {_id: params.userId },
                { $push: { thoughts: _id } },
                { new: true, runValidators: true }
            );
            console.log(_id)
        })
        .then(dbThoughtData => {
            if(!dbThoughtData) {
                res.status(404).json({ message: 'no thought with this id' });
                return;
            }
            res.json(dbThoughtData);
        }) 
    },

    addReaction({ params, body }, res) {
        Thoughts.findOneAndDelete(
        { _id: params.thoughtsId },
        { $push: { reaction: body } },
        { new: true, runValidators: true }
        )
        .then(dbThoughtData => {
            if(!dbThoughtData) {
                res.status(404).json({ message: 'No thought found with this id!' });
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => res.json(err));
    },

    removeReaction({ params, body }, res) {
        Thoughts.findOneAndUpdate(
            { _id: params.thoughtsId },
            { $pull: { reactions: { reactionId: params.reactionId } } },
            { new: true, runValidators: true }
        )
        .then(dbThoughtData => {
            if(!dbThoughtData) {
                res.status(404).json({ message: 'No thought found with this id!' });
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => res.json(err));
    },
    

    removeThought({ params }, res) {
        Thoughts.findOneAndDelete({ _id: params.thoughtsId })
        .then(dbThoughtData) => {
            if (!dbThoughtData) {
           res.status(404).json({ message: 'no thought found with this id' });
           return;
        }
        res.json(dbThoughtData);
    })
    .catch(err => res.json(err))
},

module.exports = thoughtsController;