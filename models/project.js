'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Project extends Model {
    static associate({ Task, User, Comment }) {
      this.hasMany(Task, {
        foreignKey: 'project_id',
        onDelete: 'cascade',
      });
      this.belongsTo(User, {
        foreignKey: 'userId',
      });
      this.hasMany(Comment, {
        foreignKey: 'project_id',
        onDelete: 'cascade',
      });
    }
  }
  Project.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      comment_count: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      color: {
        type: DataTypes.STRING,
        defaultValue: 'charcoal',
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
      modelName: 'Project',
    }
  );
  return Project;
};
