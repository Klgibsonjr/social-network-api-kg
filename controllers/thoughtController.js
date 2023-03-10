const { Thought, User } = require('../models');

module.exports = {
  getThought(req, res) {
    Thought.find()
      .then((user) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },

  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .select('-__v')
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with that ID' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },

  createThought(req, res) {
    Thought.create(req.body).then((dbThoughtData) => res.json(dbThoughtData));
  },

  updateThought() {},

  deleteThought() {},

  addReaction() {},

  deleteReaction() {},
};
