'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('Projects', {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isAlphanumeric: true,
          notEmpty: true,
        },
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
      userId: {
        type: DataTypes.BIGINT,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Projects');
  },
};
