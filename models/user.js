'use strict';
const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');

module.exports = (sequelize) => {
  class Users extends Model {}
  Users.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'A first name is required.',
          },
          notEmpty: {
            msg: 'Please provide a first name.',
          },
        },
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'A last name is required.',
          },
          notEmpty: {
            msg: 'Please provide a last name.',
          },
        },
      },
      emailAddress: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: 'The email address you entered already exists.',
        },
        validate: {
          notNull: {
            msg: 'An email address is required.',
          },
          notEmpty: {
            msg: 'Please provide an email address.',
          },
          isEmail: {
            msg: 'Email address must be formatted correctly.',
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        set(val) {
          const hashedPassword = bcrypt.hashSync(val, 10);
          this.setDataValue('password', hashedPassword);
        },
        validate: {
          notNull: {
            msg: 'A password is required.',
          },
        },
      },
    },
    { sequelize }
  );
  Users.associate = (models) => {
    Users.hasMany(models.Courses, {
      foreignKey: {
        fieldName: 'userId',
        allowNull: false,
      },
    });
  };

  return Users;
};
