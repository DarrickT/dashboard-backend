'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class types extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
      this.belongsTo(models.users, { foreignKey: 'usersId' })
      this.hasMany(models.subscribers, { foreignKey: 'typesId' })
    }
  }
  types.init(
    {
      type: { type: DataTypes.STRING, allowNull: false },
      price: { type: DataTypes.DECIMAL, allowNull: false },
      cost: { type: DataTypes.DECIMAL, allowNull: false },
      usersId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        }
      }
    },

    {
      sequelize,
      modelName: 'types',
      underscored: true
    }
  )
  return types
}
