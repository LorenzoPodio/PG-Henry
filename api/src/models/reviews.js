const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  sequelize.define(
    "reviews",
    {
      // title: {
      //   type: DataTypes.TEXT,
      //   allowNull: false,
      // },
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
