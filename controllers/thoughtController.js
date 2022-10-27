const { User, Thoughts } = require('../models');

const thoughtController = {
    //get all users
    getAllThoughts(req, res) {

      Thoughts.find()
        .then((thoughts) => res.status(200).json(thoughts))
        .catch((err) => res.status(500).json(err));
    },
  
    //add thoughts to user
    addThoughts(req, res) {
    if (req.body.thoughttext && req.body.username && req.body.userId) {
      Thoughts.create(req.body)
     
      .then((thought) => {
          return User.findByIdAndUpdate(
            req.body.userId,
            { $addToSet: { thoughts: thought._id } },
            { runValidators: true, new: true }
          );
        })

        .then((user) =>
          user
            ? res.status(200).json(user)
            : res.status(404).json({ message: "No user found with id!" })
        )

        .catch((err) => res.status(500).json(err));

    } else {
      res.status(404).json({
        message: "Incorrect information entered",
      });
    }
  },


    //get thought by id
    getThoughtsById(req, res) {
      Thoughts.findById(req.params.thoughtId)
        .then((thought) =>
          thought
            ? res.status(200).json(thought)
            : res.status(404).json({ message: "No thought found with id!" })
        )
        .catch((err) => res.status(500).json(err));
    },
      
      removeThoughts({ params }, res) {
            Thoughts.findOneAndDelete({ _id: params.id })
              .then((dbThoughtsData) => {
                if (!dbThoughtsData) {
                  res.status(404).json({ message: "No thought found with that id" });
                  return;
                }
                return User.findOneAndUpdate(
                    { _id: params.userId },
                    { $pull: { thoughts: params.Id }},
                    { new: true }
                )
                
              })
              .then(dbThoughtsData => {
                if(!dbThoughtsData) {
                    res.status(404).json({ message: 'No thought found with that id!' });
                    return;
                }
                res.json(dbThoughtsData);
            })
            .catch(err => res.json(err));
        },

          // update thought
  updateThoughts(req, res) {
    Thoughts.findByIdAndUpdate(
      req.params.thoughtId,
      { $set: req.body },
      { runValidators: true, new: true }
    )

      .then((thought) =>
        thought
          ? res.status(200).json(thought)
          : res.status(404).json({ message: "No thought found with that id!" })
      )

      .catch((err) => res.status(500).json(err));

  },


   addReaction(req, res) {

    if (req.body.reactionBody && req.body.username) {
      Thoughts.findByIdAndUpdate(
        req.params.thoughtId,
        { $push: { reactions: { ...req.body } } },
        { runValidators: true, new: true }
      )

        .then((thought) =>
          thought
            ? res.status(200).json(thought)
            : res.status(404).json({ message: "No thought found with id!" })
        )

        .catch((err) => res.status(500).json(err));

    } else {
      res.status(404).json({
        message: "no thought found with that id!",
      });
    }
  },

  removeReaction(req, res) {
    Thoughts.findByIdAndUpdate(
      req.params.thoughtId,
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { runValidators: true, new: true }
    )

      .then((thought) =>
        thought
          ? res.status(200).json(thought)
          : res.status(404).json({ message: "No thought found with id!" })
      )

      .catch((err) => res.status(500).json(err));

  },
};

    

module.exports = thoughtController;