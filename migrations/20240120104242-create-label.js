'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('Labels', {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      color: {
        type: DataTypes.STRING,
        defaultValue: 'charcoal',
      },
      order: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      is_favorite: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Labels');
  },
};
