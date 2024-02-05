'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    static associate({ Project, Comment, taskDue, User }) {
      this.belongsTo(Project, {
        foreignKey: 'project_id',
        onDelete: 'cascade',
      });
      this.hasMany(Comment, {
        foreignKey: 'task_id',
        onDelete: 'cascade',
      });
      this.hasOne(taskDue, {
        foreignKey: 'taskid',
        onDelete: 'cascade',
      });
      this.belongsTo(User, {
        foreignKey: 'creator_id',
      });
    }
  }
  Task.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      content: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      created_at: {
        type: DataTypes.DATE,
      },
      comment_count: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      is_shared: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      order: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      is_favorite: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      is_inbox_project: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      is_completed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      label: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        defaultValue: [],
      },
      is_team_inbox: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      view_style: {
        type: DataTypes.STRING,
        defaultValue: 'list',
      },
      url: {
        type: DataTypes.STRING,
      },
      parent_id: {
        type: DataTypes.STRING,
        defaultValue: null,
      },
    },
    {
      sequelize,
      modelName: 'Task',
      timestamps: false,
    }
  );
  return Task;
};
