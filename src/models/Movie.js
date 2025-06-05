module.exports = (sequelize, DataTypes) => {
    const Movie = sequelize.define('Movie', {
      id:          { type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4 },
      title:       DataTypes.STRING,
      description: DataTypes.TEXT,
      duration:    DataTypes.INTEGER,   // in minutes
      rating:      DataTypes.STRING
    });
    Movie.associate = models => {
      Movie.hasMany(models.Screening, { foreignKey: 'movieId' });
    };
    return Movie;
  };
  