module.exports = (sequelize, dataTypes) => {
    let alias = 'Cart'
    let cols = {
        id: {
            type: dataTypes.INTEGER(11),
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        total: {
            type: dataTypes.DECIMAL(11, 2),
            allowNull: false
        },
        estado: {
            type: dataTypes.STRING(1),
            allowNull: false
        }
    }
    let config = {
        tableName: 'carts',
        timestamps: false,
        deletedAt: false
    }

    const Cart = sequelize.define(alias, cols, config)

    // Relaciones con los otros modelos
    Cart.associate = function (models) {
        Cart.belongsToMany(models.Product, {
            as: "products",
            through: "cart_product",
            foreignKey: "cart_id",
            otherKey: "product_id",
            timestamps: false
        })
    }
    return Cart
}
