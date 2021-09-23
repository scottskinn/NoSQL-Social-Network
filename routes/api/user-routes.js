const router = require('express').Router();
const{ createUser, 
    getAllUser, 
    getUserById, 
    updateUser, 
    deleteUser } = require('../../controllers/user-controller');

// /api/users
router
  .route('/')
  .get(getAllUser)
  .post(createUser);

// /api/users/:id
router
  .route('/:id')
  .get(getUserById)
  .put(updateUser)
  .delete(deleteUser);

module.exports = router;



// example data
// {
//     "username": "lernantino",
//     "email": "lernantino@gmail.com"
// }