'use strict';
var bcrypt = require('bcryptjs')
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
      return {
        ...this.get(),
        id: undefined,
        uuid: undefined,
        password_hash: undefined,
        password: undefined,
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
    password: {
      type: DataTypes.VIRTUAL,
      allowNull: false,
      validate: {
        notNull: { msg: 'You must provide the password attribute' },
        notEmpty: { msg: 'password can not be empty' }
      }
    },
    password_hash: {
      type: DataTypes.STRING
    },
    provider: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: false
    },
  }, {
    hooks: {
      beforeSave: async (user) => {
        user.password_hash = await bcrypt.hash(user.password, 10)
        // console.log('beforeSave')
      },

      beforeUpdate: async (user) => {
        console.log(user.password_hash)
        console.log(user.password)

        let isValid = await bcrypt.compare(user.password, user.password_hash)
        if (isValid) {}
        console.log(isValid)
      }

    },
    sequelize,
    modelName: 'user',
  });

  return user;
};