'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Project, Task, Label }) {
      this.hasMany(Project, {
        foreignKey: 'userId',
        onDelete: 'cascade',
      });
      this.hasMany(Task, {
        foreignKey: 'creator_id',
        onDelete: 'cascade',
      });
      this.hasMany(Label, {
        foreignKey: 'userId',
        onDelete: 'cascade',
      });
    }
  }
  User.init(
    {
      id: {
        type: DataTypes.BIGINT,
        defaultValue: Date.now(),
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING(256),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'User',
      timestamps: false,
    }
  );
  return User;
};
