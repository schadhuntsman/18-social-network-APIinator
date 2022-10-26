const { User, Thoughts } = require('../models');

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

    //add thoughts to user
    addThought({ params, body }, res) {
        console.log(body);
        Thoughts.create(body)
        .then(({ _id }) => {
            return User.findOneAndUpdate(
                {_id: body.userId },
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
        });
    },

    //get thought by id
    getThoughtById({ params }, res) {
        Thoughts.findOne({ _id: params.id })
          .then((dbThoughtData) => {
            if (!dbThoughtData) {
              res.status(404).json({ message: "No thought found with this id" });
              return;
            }
            res.json(dbThoughtData);
          })
          .catch((err) => {
            console.log(err);
            res.status(400).json(err);
          });
      },
      removeThought({ params }, res) {
            Thoughts.findOneAndDelete({ _id: params.id })
              .then((dbThoughtData) => {
                if (!dbThoughtData) {
                  res.status(404).json({ message: "No thought found with this id" });
                  return;
                }
                res.json(dbThoughtData);
              })
              .catch((err) => res.json(err));
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
                        res.status(404).json({ message: 'No thought found with this id!' });
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
                res.status(404).json({ message: 'No thought found with this id!' });
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
                res.status(404).json({ message: 'No thought found with this id!' });
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => res.json(err));
    },
};

    

module.exports = thoughtsController;