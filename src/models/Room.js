module.exports = (sequelize, DataTypes) => {
    const Room = sequelize.define('Room', {
      id:      { type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4 },
      name:    DataTypes.STRING,
      seatMap: DataTypes.JSON         // or TEXT if you prefer a string layout
    });
    Room.associate = models => {
      Room.hasMany(models.Seat, { foreignKey: 'roomId' });
      Room.hasMany(models.Screening, { foreignKey: 'roomId' });
    };
    return Room;
};