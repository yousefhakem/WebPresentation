module.exports = (sequelize, DataTypes) => {
    const Seat = sequelize.define('Seat', {
      id:     { type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4 },
      row:    DataTypes.INTEGER,
      number: DataTypes.INTEGER
    });
    Seat.associate = models => {
      Seat.belongsTo(models.Room, { foreignKey: 'roomId' });
      Seat.belongsToMany(models.Reservation, {
        through: models.ReservationSeat,
        foreignKey: 'seatId',
        otherKey: 'reservationId'
      });
    };
    return Seat;
};