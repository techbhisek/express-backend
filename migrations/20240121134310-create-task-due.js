'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('taskDues', {
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
      taskid: {
        type: DataTypes.UUID,
      },
      datetime: {
        type: DataTypes.DATE,
      },
      string: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      timeZone: {
        type: DataTypes.STRING,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('taskDues');
  },
};
