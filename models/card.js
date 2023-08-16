// models/user.js
const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Поле должно быть заполнено'],
      minlength: [2, 'минимальная длина имени — 2 символа'],
      maxlength: [30, 'максимальная — 30 символов'],
    },
    linl: {
      type: String,
      required: [true, 'Поле должно быть заполнено'],
      validate: {
        validator(v) {
          return /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/.test(v);
        },
        message: 'Введите URL',
      },
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        // default: [],
      },
    ],
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { versionKey: false },
);

// создаём модель и экспортируем её!
module.exports = mongoose.model('card', cardSchema);
