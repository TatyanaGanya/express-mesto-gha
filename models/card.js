const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Поле должно быть заполнено'],
    minlength: [2, 'минимальная длина имени — 2 символа'],
    maxlength: [30, 'максимальная длина имени — 30 символов'],
  },
  link: {
    type: String,
    required: [true, 'Поле должно быть заполнено'],
    validate: {
      validator(val) {
        const urlEdit = /^https?:\/\/([a-z0-9-]([a-z0-9-]|(?<!\.)\.)+?(?<!\.)\.[a-z]{2,10}(:\d{1,5})?$)|(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}(:\d{1,5})?$)/;
        return urlEdit.test(val);
      },
      message: 'Неверный url',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    default: [],
  },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, { versionKey: false });

// создаём модель и экспортируем её
module.exports = mongoose.model('card', cardSchema);
