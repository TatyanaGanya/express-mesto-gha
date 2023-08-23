const router = require('express').Router();

const {
  getUsers,
  getUsersById,
  // addUser,
  editUserData,
  editUserAvatar,
  getUsersMe,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/me', getUsersMe);

router.get('/:userId', getUsersById);
// router.post('/', addUser);
router.patch('/me', editUserData);
router.patch('/me/avatar', editUserAvatar);

module.exports = router;
