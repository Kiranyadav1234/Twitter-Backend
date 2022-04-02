const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ tweets }) {
      // define association here
      users.hasMany(tweets, {
        foreignKey: 'id',
      });
    }
  }
  users.init({
    name: DataTypes.STRING,
    handle: DataTypes.STRING,
    location: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'users',
  });
  return users;
};
