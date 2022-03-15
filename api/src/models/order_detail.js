
//modelo DETALLE DE ORDEN (antes llamada Linea de Orden)

const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {

    sequelize.define('order_detail', {
        detailId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
          },
        price: { //precio
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        quantity: { //cantidad
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        totalPrice: { //precio
            type: DataTypes.INTEGER,
            allowNull: true,
            
        },
    },
    { timestamps: false });
}; 