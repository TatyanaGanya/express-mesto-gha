// импортируем модель
const User = require('../models/user');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(() => res.status(500).send({ message: 'Ошибка на сервере' }));
};

module.exports.getUserById = (req, res) => {
  if (req.params.userId.length === 24) {
    User.findById(req.params.userId)
      .then((user) => {
        if (!user) {
          res.status(400).send({ message: 'Запрашиваемый пользователь не найден' });
          return;
        }
        res.send(user);
      })
      .catch(() => res.status(500).send({ message: 'Запрашиваемый пользователь не найден' }));
  } else {
    res.status(400).send({ message: 'Неверный id пользователя' });
  }
};

module.exports.addUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.status(201).send(user))
    .catch((err) => {
      console.log(err.name);
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: err.message });
      } else {
        res.status(500).send({ message: 'Ошибка на сервере' });
      }
    });
};
