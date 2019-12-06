'use strict';
module.exports = (sequelize, DataTypes) => {
  const Activity = sequelize.define('Activity', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      field: 'id'
    },
    categoryId: {
      allowNull: false,
      type: DataTypes.UUID,
      field: 'category_id'
    },
    name: {
      type: DataTypes.STRING,
      field: 'name'
    },
    slug: {
      type: DataTypes.STRING,
      field: 'slug'
    },
    order: {
      type: DataTypes.INTEGER,
      field: 'order',
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      field: 'is_active',
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
      field: 'created_at'
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
      field: 'updated_at'
    }
  }, {
    tableName: 'activity',
    indexes: [
      {
        unique: true,
        fields: ['id']
      },
      {
        fields: ["category_id"]
      }

    ]
  });

  const generateSlug = (name) => {
    const a = "àáäâãåăæçèéëêǵḧìíïîḿńǹñòóöôœøṕŕßśșțùúüûǘẃẍÿź·/_,:;";
    const b = "aaaaaaaaceeeeghiiiimnnnooooooprssstuuuuuwxyz------";
    const p = new RegExp(a.split("").join("|"), "g");
    return name
      .toString()
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(p, c => b.charAt(a.indexOf(c)))
      .replace(/&/g, "-and-")
      .replace(/[^\w\-]+/g, "")
      .replace(/\-\-+/g, "-")
      .replace(/^-+/, "")
      .replace(/-+$/, "");
  }

  Activity.associate = (models) => {
    Activity.belongsTo(models.Category, {
      through: 'CategoryActivity',
      as: 'category',
      foreignKey: 'categoryId'
    });
    Activity.belongsToMany(models.Listing, {
      through: 'ListingActivity',
      as: 'listing',
      foreignKey: 'activityId'
    });
  };

  Activity.beforeCreate((instance) => {
    instance.slug = generateSlug(instance.name)
  })

  Activity.beforeUpdate((instance) => {
    instance.slug = generateSlug(instance.name)
  })

  return Activity;
};