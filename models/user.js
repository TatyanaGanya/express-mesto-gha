// models/user.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: {
      // у пользователя есть имя — опишем требования к имени в схеме:
      type: String, // имя — это строка
      required: [true, 'Поле должно быть заполнено'], // оно должно быть у каждого пользователя, так что имя — обязательное поле
      minlength: [2, 'минимальная длина имени — 2 символа'], //
      maxlength: [30, 'максимальная — 30 символов'], //
    },
    about: {
      type: String,
      required: [true, 'Поле должно быть заполнено'],
      minlength: [2, 'минимальная длина имени — 2 символа'],
      maxlength: [30, 'максимальная — 30 символов'],
    },
    avatar: {
      type: String,
      required: [true, 'Поле должно быть заполнено'],
      validate: {
        validator(v) {
          return /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/.test(v);
        },
        message: 'Введите URL',
      },
    },
  },
  { versionKey: false },
);

// создаём модель и экспортируем её
module.exports = mongoose.model('user', userSchema);
