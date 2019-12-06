'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('listing_activity', {
      listing_id: {
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      activity_id: {
        primaryKey: true,
        type: Sequelize.UUID
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
      .then(() => queryInterface.addConstraint('listing_activity', ['listing_id'], {
        type: 'foreign key',
        name: 'fk_listing_activity_listing_id',
        references: {
          table: 'Listing',
          field: 'id'
        }
      }))
      .then(() => queryInterface.addConstraint('listing_activity', ['activity_id'], {
        type: 'foreign key',
        name: 'fk_listing_activity_activity_id',
        references: {
          table: 'activity',
          field: 'id'
        }
      }));
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('listing_activity');
  }
};