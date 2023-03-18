const { User, Thought } = require('../models');

module.exports = {
  getUsers(req, res) {
    User.find()
      .select('-__v')
      .then((userData) => res.json(userData))
      .catch((err) => res.status(500).json(err));
  },

  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select('-__v')
      .populate('thoughts')
      .then((userData) =>
        !userData
          ? res.status(404).json({ message: 'No user with that ID!' })
          : res.json(userData)
      )
      .catch((err) => {
        res.status(500).json(err);
      });
  },

  createUser(req, res) {
    User.create(req.body)
      .then((userData) => res.json(userData))
      .catch((err) => res.status(500).json(err));
  },

  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((userData) =>
        !userData
          ? res.status(400).json({ message: 'No user with that ID' })
          : res.json(userData)
      )
      .catch((err) => res.status(500).json(err));
  },

  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
      .then((userData) =>
        !userData
          ? res.status(400).json({ message: 'No user with that ID' })
          : {}
      )
      .then(() => {
        res.json({ message: 'User has been successfully deleted!' });
      })
      .catch((err) => res.status(500).json(err));
  },

  addFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.params.friendId } },
      { runValidators: true, new: true }
    )
      .then((userData) =>
        !userData
          ? res.status(400).json({ message: 'No user with that ID' })
          : res.json(userData)
      )
      .catch((err) => res.status(500).json(err));
  },

  deleteFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId } },
      { runValidators: true, new: true }
    )
      .then((userData) =>
        !userData
          ? res.status(404).json({ messag: 'No user with that ID!' })
          : res.json(userData)
      )
      .catch((err) => res.status(500).json(err));
  },
};
