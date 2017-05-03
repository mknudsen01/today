'use strict';
module.exports = function(sequelize, DataTypes) {
  var Activity = sequelize.define('Activity', {
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    classMethods: {
      associate: function(models) {
        Activity.belongsTo(models.User)
        Activity.belongsToMany(models.Tag, { through: 'Activities_Tags' })
      }
    }
  });
  return Activity;
};
