const router = require('express').Router();

const {
  getCards,
  addCards,
  deleteCards,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

router.get('/', getCards);
router.post('/', addCards);
router.delete('/:cardId', deleteCards);
router.put('/:cardId/likes', likeCard);
router.delete('/:cardId/likes', dislikeCard);

module.exports = router;
