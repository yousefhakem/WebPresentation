// app.js
import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import { sequelize } from './models/Index.js';
import authRouter from './routes/auth.js';
import movieRouter from './routes/movies.js';
import reservationsRouter from './routes/reservations.js';
import roomsRouter from './routes/rooms.js';
import screeningRouter from './routes/screening.js';
import seatsRouter from './routes/seats.js';
import ticketsRouter from './routes/tickets.js';

import cors from 'cors';
const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/auth', authRouter);
app.use('/api/movies', movieRouter);
app.use('/api/reservations', reservationsRouter);
app.use('/api/rooms', roomsRouter);
/*app.use(
  '/api/movies/:movieId/screenings',
  screeningRouter
);*/
app.use('/api/seats', seatsRouter);
app.use('/api/tickets', ticketsRouter);

sequelize.sync({alter: false}).then(() => {
  console.log('Database & tables created!');
  app.listen(process.env.PORT||3000, ()=>console.log('🚀 up'));
}).catch((err) => {
  console.error('Error creating database:', err);
});;