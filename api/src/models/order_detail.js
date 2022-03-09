
//modelo DETALLE DE ORDEN (antes llamada Linea de Orden)

const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {

    sequelize.define('order_detail', {
        price: { //precio
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        quantity: { //cantidad
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    });
}; 