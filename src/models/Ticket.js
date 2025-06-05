module.exports = (sequelize, DataTypes) => {
    const Ticket = sequelize.define('Ticket', {
      id:       { type: DataTypes.UUID,   primaryKey: true, defaultValue: DataTypes.UUIDV4 },
      code:     { type: DataTypes.STRING, allowNull: false, unique: true },
      issuedAt: { type: DataTypes.DATE,   defaultValue: DataTypes.NOW }
    });
    Ticket.associate = models => {
      Ticket.belongsTo(models.Reservation, { foreignKey: 'reservationId' });
    };
    return Ticket;
};