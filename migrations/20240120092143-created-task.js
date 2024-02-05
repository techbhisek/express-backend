'use strict';

const { UUID, STRING } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('Tasks', {
      creator_id: {
        type: DataTypes.BIGINT,
      },
      created_at: {
        type: DataTypes.DATE,
      },
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      content: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      project_id: {
        type: DataTypes.UUID,
        allowNull: false,
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
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Tasks');
  },
};
