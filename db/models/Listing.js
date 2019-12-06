'use strict';
module.exports = (sequelize, DataTypes) => {
  const Listing = sequelize.define('Listing', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      field: 'id'
    },
    locationId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      field: 'locationId'
    },
    userId: {
      allowNull: false,
      type: DataTypes.UUID,
      field: 'userId'
    },
    locationId: {
      type: DataTypes.INTEGER,
      field: 'locationId'
    },
    listSettingsParent: {
      type: DataTypes.INTEGER,
      field: 'listSettingsParent',
    },
    bookingPeriod: {
      type: DataTypes.STRING,
      field: 'bookingPeriod',
    },
    title: {
      type: DataTypes.STRING,
      field: 'title',
    },
    bookingType: {
      type: DataTypes.ENUM('instant', 'request', 'poa'),
      field: 'bookingType',
    },
    isPublished: {
      type: DataTypes.BOOLEAN,
      field: 'isPublished',
    },
    isReady: {
      type: DataTypes.BOOLEAN,
      field: 'isReady',
    },
    status: {
      type: DataTypes.ENUM('active', 'deleted', 'claimed'),
      field: 'status',
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
      field: 'createdAt'
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
      field: 'updatedAt'
    }
  }, {
    tableName: 'Listing',
    indexes: [
      {
        unique: true,
        fields: ['id']
      }
    ]
  });

  Listing.associate = (models) => {
    Listing.belongsToMany(models.Category, {
      through: 'ListingCategory',
      as: 'category',
      foreignKey: 'listingId'
    });
    Listing.belongsToMany(models.Activity, {
      through: 'ListingActivity',
      as: 'activity',
      foreignKey: 'listingId'
    });
  };

  return Listing;
};