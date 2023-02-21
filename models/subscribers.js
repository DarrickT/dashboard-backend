'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class subscribers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
      this.belongsTo(models.users, { foreignKey: 'usersId' })

      this.belongsTo(models.types, { foreignKey: 'typesId' })
    }
  }
  subscribers.init(
    {
      fullName: { type: DataTypes.STRING, allowNull: false },
      email: { type: DataTypes.STRING, allowNull: false },
      date: { type: DataTypes.DATE, allowNull: false },
      typesId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'types',
          key: 'id'
        }
      },

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
      modelName: 'subscribers',
      underscored: true
    }
  )
  return subscribers
}
