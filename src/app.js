const express = require('express');
const { sequelize } = require('./models');
const authRouter = require('./routes/auth');
const movieRouter = require('./routes/movies');
// …
const app = express();
app.use(express.json());
app.use('/api/auth', authRouter);
app.use('/api/movies', movieRouter);
// …
sequelize.sync().then(() => {
  app.listen(process.env.PORT||3000, ()=>console.log('🚀 up'));
});