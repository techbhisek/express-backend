'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    static associate({ Task, Project, User }) {
      this.belongsTo(Task, { foreignKey: 'task_id' });
      this.belongsTo(Project, { foreignKey: 'project_id' });
    }
  }
  Comment.init(
    {
      content: { type: DataTypes.STRING(1024) },
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      posted_at: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      attachment: {
        type: DataTypes.JSONB,
        defaultValue: null,
      },
    },

    {
      sequelize,
      modelName: 'Comment',
      timestamps: false,
    }
  );
  return Comment;
};
