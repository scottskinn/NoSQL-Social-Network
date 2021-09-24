const router = require('express').Router();
const {
    addThought,
    deleteThought,
    updateThought,
    getAllThought,
    addReaction,
    removeReaction
} = require('../../controllers/thought-controller')



// /api/thoughts/<userId>
router.route('/:userId').post(addThought);

router.route('/')
.get(getAllThought)
.post(addThought)

// /api/thoughts/<userId>/
router
  .route('/:userId/')
  .put(updateThought)
  .delete(deleteThought)

// /api/thoughts/<userId>/<thoughtId>/<reactionsId>
router.route('/:userId/:thoughtId/:reactionsId')
  .post(addReaction)
  .delete(removeReaction);

module.exports = router;


// example data
// {
//   "thoughtText": "Here's a cool thought...",
//   "username": "lernantino",
//   "userId": "5edff358a0fcb779aa7b118b"
// }