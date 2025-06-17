// Index.js
const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(
  'movie_db',
  'yousef',
  'bobsa1234',
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false,
  }
);

// register models
const Movie           = require('./Movie')(sequelize, DataTypes);
const Reservation     = require('./Reservations')(sequelize, DataTypes);
const Room            = require('./Room')(sequelize, DataTypes);
const Screening       = require('./Screening')(sequelize, DataTypes);
const Ticket          = require('./Ticket')(sequelize, DataTypes);
const User            = require('./User')(sequelize, DataTypes);
const Seat            = require('./Seat')(sequelize, DataTypes);
const ReservationSeat = require('./ReservationSeat')(sequelize, DataTypes);

const models = {
  Movie,
  Reservation,
  Room,
  Screening,
  Ticket,
  User,
  Seat,
  ReservationSeat
};

// Create associations
Object.values(models).forEach(model => {
  if (typeof model.associate === 'function') {
    model.associate(models);
  }
});

module.exports = {
  sequelize,
  ...models
};
