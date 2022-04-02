const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class tweets extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ users }) {
      // define association here
      tweets.belongsTo(users, {
        foreignKey: 'userId',
        onDelete: 'cascade',
      });
    }
  }
  tweets.init({
    text: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'tweets',
  });
  return tweets;
};
