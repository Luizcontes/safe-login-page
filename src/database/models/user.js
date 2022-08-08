'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
    toJSON() {
      return {...this.get(),
        id: undefined,
        uuid: undefined,
        password_hash: undefined,
        createdAt: undefined,
        updatedAt: undefined
      }
    }
  }
  user.init({
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'User must have a name' },
        notEmpty: { msg: 'name can not be empty' }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: { msg: "You must provide an e-mail attribute" },
        notEmpty: { msg: "password can not be empty" }
      }
    },
    password_hash: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'You must provide de password attribute' },
        notEmpty: { msg: 'password can not be empty' }
      }
    },
    provider: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: false
    },
  }, {
    sequelize,
    modelName: 'user',
  });
  return user;
};