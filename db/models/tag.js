'use strict';
module.exports = function(sequelize, DataTypes) {
  var Tag = sequelize.define('Tag', {
    text: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    classMethods: {
      associate: function(models) {
        Tag.belongsToMany(models.Activity, { through: 'Activity_Tags' })
      }
    }
  });
  return Tag;
};
