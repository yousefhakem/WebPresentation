module.exports = (sequelize, DataTypes) => {
    const ReservationSeat = sequelize.define('ReservationSeat', {
      reservationId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: { model: 'Reservations', key: 'id' },
        onDelete: 'CASCADE',
        primaryKey: true
      },
      seatId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: { model: 'Seats', key: 'id' },
        onDelete: 'CASCADE',
        primaryKey: true
      }
    }, {
      tableName: 'ReservationSeats',
      timestamps: false
    });
  
    return ReservationSeat;
};