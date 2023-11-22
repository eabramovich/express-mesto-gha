import express, { json } from 'express';
import mongoose from 'mongoose';
import router from './routes';

const app = express();
mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.use((req, res, next) => {
  req.user = {
    _id: '655cb28a76d6493d6084e92e' //временное решение для авторизации
  };

  next();
});

app.use(json());
app.use(router);

app.listen(3000, () => {
  console.log('Server listen port $(3000)');
});
