// это файл контроллеров
const User = require('../models/user');

// getUsers,

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка на сервере' }));
};

// getUsersById,
module.exports.getUsersById = (req, res) => {
  if (req.params.userId.length === 24) {
    User.findById(req.params.userId)
      .then((user) => {
        if (!user) {
          res.status(404).send({ message: 'Переданы некорректные данные при обновлении профиля' });
          return;
        }
        res.send(user);
      })
      .catch(() => res.status(404).send({ message: 'Пользователь с указанным _id не найден' }));
  } else {
    res.status(400).send({ message: 'Пользователь с указанным _id не найден' });
  }
};

// addUser,
module.exports.addUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: err.message });
      } else {
        res.status(500).send({ message: 'Произошла ошибка на сервере' });
      }
    });
};

// editUserData,
module.exports.editUserData = (req, res) => {
  const { name, about } = req.body;
  if (req.user._id) {
    User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
      .then((user) => res.send(user))
      .catch((err) => {
        if (err.name === 'ValidationError') {
          res.status(400).send({ message: err.message });
        } else {
          res.status(404).send({ message: 'Пользователь с указанным _id не найден' });
        }
      });
  } else {
    res.status(500).send({ message: 'Произошла ошибка на сервере' });
  }
};

// editUserAvatar,
module.exports.editUserAvatar = (req, res) => {
  if (req.user._id) {
    User.findByIdAndUpdate(req.user._id, { avatar: req.body.avatar }, { new: true })
      .then((user) => res.send(user))
      .catch((err) => {
        if (err.name === 'ValidationError') {
          res.status(400).send({ message: err.message });
        } else {
          res.status(404).send({ message: 'Пользователь с указанным _id не найден' });
        }
      });
  } else {
    res.status(500).send({ message: 'Произошла ошибка на сервере' });
  }
};
