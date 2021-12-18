module.exports = (sequelize, dataTypes) => {
    let alias = 'Category'
    let cols = {
        id: {
            type: dataTypes.INTEGER(11),
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        name: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        url: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        imgBanner: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        img1: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        img2: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        img3: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        img4: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        estado: {
            type: dataTypes.STRING(1),
            allowNull: false,
            defaulValue: 'A'
        }
    }
    let config = {
        tableName: 'categories',
        timestamps: false,
        deletedAt: false
    }

    const Category = sequelize.define(alias, cols, config)

    // Relaciones con los otros modelos
    Category.associate = function (models) {
        Category.hasMany(models.Product, {
            as: "producs",
            foreignKey: "category_id"
        })
        Category.hasMany(models.Subcategory, {
            as: "subcategories",
            foreignKey: "category_id"
        })
    }

    return Category
}
