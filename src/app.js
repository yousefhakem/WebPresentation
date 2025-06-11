require('dotenv').config()
const express = require('express');
const { sequelize } = require('./models/Index');
const authRouter = require('./routes/auth');
const movieRouter = require('./routes/movies');
const reservationsRouter = require('./routes/reservations');
const roomsRouter = require('./routes/rooms');
const screeningRouter = require('./routes/screening');
const seatsRouter = require('./routes/seats');
const ticketsRouter = require('./routes/tickets');



const app = express();
app.use(express.json());
app.use('/api/auth', authRouter);
app.use('/api/movies', movieRouter);
app.use('/api/resevations', reservationsRouter);
app.use('/api/rooms', roomsRouter);
app.use('/api/screening', screeningRouter);
app.use('/api/seats', seatsRouter);
app.use('/api/tickets', ticketsRouter);

sequelize.sync().then(() => {
  console.log('Database & tables created!');
  app.listen(process.env.PORT||3000, ()=>console.log('🚀 up'));
}).catch((err) => {
  console.error('Error creating database:', err);
});;