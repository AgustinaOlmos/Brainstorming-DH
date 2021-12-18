module.exports = (sequelize, dataTypes) => {
    let alias = 'Product'
    let cols = {
        id: {
            type: dataTypes.INTEGER(11),
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        title: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        price: {
            type: dataTypes.DECIMAL(11, 2),
            allowNull: false
        },
        discount: {
            type: dataTypes.INTEGER(11),
            allowNull: false
        },
        promotion: {
            type: dataTypes.BOOLEAN(1),
            allowNull: false
        },
        img: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        estado: {
            type: dataTypes.STRING(1),
            allowNull: false,
            defaultValue: 'A'
        },
        category_id: {
            type: dataTypes.INTEGER(11),
            allowNull: false,
        },
        subcategory_id: {
            type: dataTypes.INTEGER(11),
            allowNull: false,
        }
    }
    let config = {
        tableName: 'products',
        timestamps: false,
        deletedAt: false
    }

    const Product = sequelize.define(alias, cols, config)

    // Relaciones con los otros modelos
    Product.associate = function (models) {
        Product.belongsTo(models.Category, {
            as: "category",
            foreignKey: "category_id"
        })
        Product.belongsTo(models.Subcategory, {
            as: "subcategory",
            foreignKey: "subcategory_id"
        })
        Product.belongsToMany(models.Cart, {
            as: "carts",
            through: "cart_product",
            foreignKey: "product_id",
            otherKey: "cart_id",
            timestamps: false
        })
    }
    return Product
}
