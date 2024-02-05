'use strict';
const { Model, BOOLEAN } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class taskDue extends Model {
    static associate({ Task }) {
      this.belongsTo(Task, {
        foreignKey: 'taskid',
      });
    }

    toJSON() {
      return { ...this.get(), id: undefined, taskid: undefined };
    }
  }
  taskDue.init(
    {
      id: {
        type: DataTypes.BIGINT,
        defaultValue: Date.now(),
        primaryKey: true,
      },
      date: {
        type: DataTypes.DATE,
      },
      is_recurring: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      datetime: {
        type: DataTypes.DATE,
      },
      string: {
        type: DataTypes.STRING,
      },
      timeZone: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: 'taskDue',
      timestamps: false,
    }
  );
  return taskDue;
};
