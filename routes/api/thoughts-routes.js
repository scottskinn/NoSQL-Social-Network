 const { Thought } = require('../../models');
// const router = require('express').Router();

const thoughtController = {
    getAllThought(req, res) {
        Thought.find({})
            .populate({
                path: 'thought',
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
            path: 'friend',
            select: '-__v'
            })
            .select('-__v')
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
            console.log(err);
            res.sendStatus(400);
            });
        },
    
        // createThought
        createThought({ body }, res) {
        Thought.create(body)
            .then(dbUserData => res.json(dbUserData))
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
        }
    

};

module.exports = thoughtController;