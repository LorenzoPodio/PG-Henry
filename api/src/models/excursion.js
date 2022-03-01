const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  
  sequelize.define('excursion', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
       allowNull: false,
      autoIncrement: true,
    },
    primaryImage: {
      type: DataTypes.STRING,
     allowNull: true,
    },
    secondaryImage: {
      type: DataTypes.STRING,
     allowNull: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    time: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    extra: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    createdInDb: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
  },
    { timestamps: false }
  );
};
