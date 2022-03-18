const { DataTypes, NOW } = require('sequelize');

module.exports = (sequelize) => {

    sequelize.define('product', {

        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        date: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        time: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        Images: {
          type: DataTypes.ARRAY(DataTypes.TEXT),
         allowNull: true,
        },
        stock: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 20
        },
    },
        { timestamps: false }
    );
};
