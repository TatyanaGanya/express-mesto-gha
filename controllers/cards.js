const Card = require('../models/card');

// getCards,
module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка на сервере' }));
};

// addCards,
module.exports.addCards = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => {
      res.send(card);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: err.message });
      } else {
        res.status(500).send({ message: 'Произошла ошибка на сервере' });
      }
    });
};

// deleteCards,
module.exports.deleteCards = (req, res) => {
  if (req.params.cardId.length === 24) {
    Card.findByIdAndRemove(req.params.cardId)
      .then((card) => {
        if (!card) {
          res.status(404).send({ message: 'Переданы некорректные данные при создании карточки' });
          return;
        }
        res.send({ message: 'Карточка удалена' });
      })
      .catch(() => res.status(404).send({ message: 'Переданы некорректные данные при создании карточки' }));
  } else {
    res.status(400).send({ message: 'Переданы некорректные данные при создании карточки' });
  }
};

// likeCard,
module.exports.likeCard = (req, res) => {
  if (req.params.cardId.length === 24) {
    Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
      .then((card) => {
        if (!card) {
          res.status(404).send({ message: 'Переданы некорректные данные для постановки/снятии лайка' });
          return;
        }
        res.send(card);
      })
      .catch(() => res.status(404).send({ message: 'Переданы некорректные данные для постановки/снятии лайка' }));
  } else {
    res.status(400).send({ message: 'Передан несуществующий _id карточки' });
  }
};

// dislikeCard,
module.exports.dislikeCard = (req, res) => {
  if (req.params.cardId.length === 24) {
    Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
      .then((card) => {
        if (!card) {
          res.status(404).send({ message: 'Переданы некорректные данные для постановки/снятии лайка' });
          return;
        }
        res.send(card);
      })
      .catch(() => res.status(404).send({ message: 'Передан несуществующий _id карточки' }));
  } else {
    res.status(400).send({ message: 'Передан несуществующий _id карточки' });
  }
};
