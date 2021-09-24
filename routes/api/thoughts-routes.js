const router = require('express').Router();
const {
    addThought,
    deleteThought,
    updateThought,
    getAllThought
} = require('../../controllers/thought-controller')



// /api/thoughts/<userId>
router.route('/:userId').post(addThought);

router.route('/')
.get(getAllThought);

// /api/thoughts/<userId>/<thoughtId>
router
  .route('/:userId/:thoughtId')

  .put(updateThought)
  .delete(deleteThought);

// /api/thoughts/<userId>/<thoughtId>/<replyId>
router.route('/:userId/:thoughtId/:replyId').delete(deleteThought);

module.exports = router;


// example data
// {
//   "thoughtText": "Here's a cool thought...",
//   "username": "lernantino",
//   "userId": "5edff358a0fcb779aa7b118b"
// }