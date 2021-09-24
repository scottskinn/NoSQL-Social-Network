const { Thought, User } = require('../models');


const thoughtController = {
    getAllThought(req, res) {
        Thought.find({})
            .populate({
                path: 'thoughtText',
                select: '-__v'
            })
            .select('-__v')
            .sort({ _id: -1 })
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
              console.log(err);
              res.sendStatus(400);
            });
    },

    // get one Thought by id
    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.id })
            .populate({
            path: 'friends',
            select: '-__v'
            })
            .select('-__v')
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
            console.log(err);
            res.sendStatus(400);
            });
    },

    // add thought to User
    addThought({ params, body }, res) {
        console.log(body);
        Thought.create(body)
            .then(({ _id }) => {
            return User.findOneAndUpdate(
                { _id: params.userId },
                { $push: { thought: _id } },
                { new: true }
            );
            })
            .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No User found with this id!' });
                return;
            }
            res.json(dbUserData);
            })
            .catch(err => res.json(err));
    },

      // add reaction to thought
    addReaction({ params, body }, res) {
    Thought.findOneAndUpdate({ _id: params.thoughtId }, 
        { $push: { reactions: body } }, 
        { new: true, runValidators: true })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No User found with this id!' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.json(err));
    },
    
    // update Thought by id
    updateThought({ params, body }, res) {
    Thought.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
        .then(dbUserData => {
        if (!dbUserData) {
            res.status(404).json({ message: 'No Thought found with this id!' });
            return;
        }
        res.json(dbUserData);
        })
        .catch(err => res.json(err));
    },

    // delete Thought
    deleteThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.id })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.json(err));
    },

    // delete reaction
    removeReaction({ params }, res) {
    Thought.findOneAndUpdate(
        { _id: params.thoughtId }, 
        { $pull: { reactions: { reactionId: params.reactionId}}},
        { new: true })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.json(err));
    }
};

module.exports = thoughtController;