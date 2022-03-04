const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("userAdmin", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
         allowNull: false,
        autoIncrement: true,
      },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: true
    },
  });
};
