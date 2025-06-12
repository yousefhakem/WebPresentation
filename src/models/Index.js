const { Sequelize, DataTypes } = require('sequelize');


const sequelize = new Sequelize(
    'movie_db',
    'yousef',
    'bobsa1234',
    {
        host: process.env.DB_HOST,
        dialect: 'mysql',
        logging: false, // optional: disable SQL logging
    }
);

const Movie = require('./Movie')(sequelize, DataTypes);
const Reservations = require('./Reservations')(sequelize, DataTypes);
const Room = require('./Room')(sequelize, DataTypes);
const Screening = require('./Screening')(sequelize, DataTypes);
const Ticket = require('./Ticket')(sequelize, DataTypes);
const User = require('./User')(sequelize, DataTypes);
const Seat = require('./Seat')(sequelize, DataTypes);
const ReservationSeat = require('./ReservationSeat')(sequelize, DataTypes);

module.exports = {
    sequelize,
    Movie,
    Reservations,
    Room,
    Screening,
    Ticket,
    User,
    Seat,
    ReservationSeat
};