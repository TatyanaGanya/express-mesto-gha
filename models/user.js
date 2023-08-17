const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { // у пользователя есть имя — опишем требования к имени в схеме:
    type: String, // имя — это строка
    required: [true, 'Поле должно быть заполнено'], // оно должно быть у каждого пользователя, так что имя — обязательное поле
    minlength: [2, 'минимальная длина имени — 2 символа'],
    maxlength: [30, 'максимальная длина имени — 30 символов'],
  },
  about: {
    type: String, // имя — это строка
    required: [true, 'Поле должно быть заполнено'],
    minlength: [2, 'минимальная длина имени — 2 символа'],
    maxlength: [30, 'максимальная длина имени — 30 символов'],
  },
  avatar: {
    type: String,
    required: [true, 'Поле должно быть заполнено'],
    validate: {
      validator(val) {
        const urlEdit = /(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-/]))?/;
        return urlEdit.test(val);
      },
      message: 'Неверный url',
    },
  },
}, { versionKey: false });

// создаём модель и экспортируем её
module.exports = mongoose.model('user', userSchema);
