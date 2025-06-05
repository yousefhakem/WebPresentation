module.exports = (sequelize, DataTypes) => {
    const Screening = sequelize.define('Screening', {
      id:       { type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4 },
      datetime: { type: DataTypes.DATE, allowNull: false }
    });
    Screening.associate = models => {
      Screening.belongsTo(models.Movie,   { foreignKey: 'movieId' });
      Screening.belongsTo(models.Room,    { foreignKey: 'roomId' });
      Screening.hasMany(models.Reservation,{ foreignKey: 'screeningId' });
    };
    return Screening;
};