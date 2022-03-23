const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "reviews",
    {
      date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        defaultValue:DataTypes.NOW,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      rating: {
        type: DataTypes.ENUM("1", "2", "3", "4", "5"),
        allowNull: false,
      },
    },
    { timestamps: false }
  );
};
