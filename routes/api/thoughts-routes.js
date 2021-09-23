const router = require('express').Router();
const {
    addThought,
    deleteThought,
    updateThought
} = require('../../controllers/thought-controller')



// /api/thoughts/<userId>
router.route('/:userId').post(addThought);

// /api/thoughts/<userId>/<thoughtId>
router
  .route('/:userId/:thoughtId')
  .put(updateThought)
  .delete(deleteThought);

// /api/thoughts/<userId>/<thoughtId>/<replyId>
router.route('/:userId/:thoughtId/:replyId').delete(deleteThought);

