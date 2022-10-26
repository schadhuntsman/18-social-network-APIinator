const { User, Thoughts } = require('../models');

const thoughtController = {
    //get all users
    getAllThoughts(req, res) {
      Thought.find({})
      .populate({
        path: 'thoughts',
        select: '-__v'
    })
      .select('-__v')
      .sort({ _id: -1 })
      .then(dbThoughtData => res.json(dbThoughtData))
      .catch(err => {
        console.log(err);
        res.sendStatus(400);
      });
},


    //add thoughts to user
    addThought({ body }, res) {
        console.log(body);
        Thoughts.create(body)
        .then(({ _id }) => {
            return User.findOneAndUpdate(
                {_id: body.userId },
                { $push: { thoughts: _id } },
                { new: true, runValidators: true }
            );
        })
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json({ message: 'no User with that id' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.json(err));
    },

    //get thought by id
    getThoughtById({ params, body }, res) {
        Thoughts.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
          .then(dbThoughtData => {
            if (!dbThoughtData) {
              res.status(404).json({ message: "No thought found with that id" });
              return;
            }
            res.json(dbThoughtData);
          })
          .catch(err => res.json(err));
        },
      
      removeThought({ params }, res) {
            Thoughts.findOneAndDelete({ _id: params.id })
              .then((dbThoughtData) => {
                if (!dbThoughtData) {
                  res.status(404).json({ message: "No thought found with that id" });
                  return;
                }
                return User.findOneAndUpdate(
                    { _id: params.userId },
                    { $pull: { thoughts: params.Id }},
                    { new: true }
                )
                
              })
              .then(dbThoughtData => {
                if(!dbThoughtData) {
                    res.status(404).json({ message: 'No thought found with that id!' });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => res.json(err));
        },

          updateThought({ params, body }, res) {
            Thoughts.findOneAndUpdate(
                { _id: params.id },
                body, {
                    new: true,
                    runValidators: true,
                })
                .then(dbThoughtData => {
                    if(!dbThoughtData) {
                        res.status(404).json({ message: 'No thought found with that id!' });
                        return;
                    }
                    res.json(dbThoughtData);
                })
                .catch(err => res.json(err));
            },

    addReaction({ params, body }, res) {
        Thoughts.findOneAndDelete(
        { _id: params.thoughtsId },
        { $push: { reaction: body } },
        { new: true, runValidators: true }
        )
        .then(dbThoughtData => {
            if(!dbThoughtData) {
                res.status(404).json({ message: 'No thought found with that id!' });
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => res.json(err));
    },
    removeReaction({ params }, res) {
        Thoughts.findOneAndUpdate({ _id: params.thoughtId },
          { $push: { reaction: body } },
        { new: true, runValidators: true })
        .then(dbThoughtData => {
            if(!dbThoughtData) {
                res.status(404).json({ message: 'No thought found with that id!' });
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => res.json(err));
    },
};

    

module.exports = thoughtController;