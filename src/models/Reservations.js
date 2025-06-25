module.exports = (sequelize, DataTypes) => {
    const Reservation = sequelize.define('Reservation', {
      id:        { type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4 },
      timestamp: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
      status:    { type: DataTypes.ENUM('PENDING','CONFIRMED','CANCELLED'), defaultValue: 'CONFIRMED' }
    });
    Reservation.associate = models => {
      Reservation.belongsTo(models.User,      { foreignKey: 'userId' });
      Reservation.belongsTo(models.Screening, { foreignKey: 'screeningId' });
      Reservation.hasOne(models.Ticket,       { foreignKey: 'reservationId' });
      Reservation.belongsToMany(models.Seat, {
        through: models.ReservationSeat,
        foreignKey: 'reservationId',
        otherKey: 'seatId'
      });
    };
    return Reservation;
};