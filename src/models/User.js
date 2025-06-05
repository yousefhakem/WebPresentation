module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
      id:    { type: DataTypes.UUID,   primaryKey: true, defaultValue: DataTypes.UUIDV4 },
      name:  { type: DataTypes.STRING, allowNull: false },
      email: { type: DataTypes.STRING, allowNull: false, unique: true },
      passwordHash: { type: DataTypes.STRING, allowNull: false },
      role:  { type: DataTypes.ENUM('USER','ADMIN'), defaultValue: 'USER' }
    });
    User.associate = models => {
      User.hasMany(models.Reservation, { foreignKey: 'userId' });
    };
    return User;
  };