const { DataTypes, NOW } = require('sequelize');

module.exports = (sequelize) => {
  
  sequelize.define('excursion', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
       allowNull: false,
      autoIncrement: true,
    },
    Images: {
      type: DataTypes.ARRAY(DataTypes.STRING),
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
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
    time: {
      type: DataTypes.ARRAY(DataTypes.STRING),
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
    },
    excursionType: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  },
    { timestamps: false }
  );
};
