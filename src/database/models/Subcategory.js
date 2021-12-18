module.exports = (sequelize, dataTypes) => {
    let alias = 'Subcategory'
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
        estado: {
            type: dataTypes.STRING(1),
            allowNull: false,
            defaulValue: 'A'
        }
    }
    let config = {
        tableName: 'subcategories',
        timestamps: false,
        deletedAt: false
    }

    const Subcategory = sequelize.define(alias, cols, config)

    // Relaciones con los otros modelos
    Subcategory.associate = function (models) {
        Subcategory.hasMany(models.Product, {
            as: "producs",
            foreignKey: "subcategory_id"
        })
        Subcategory.belongsTo(models.Category, {
            as: "category",
            foreignKey: "category_id"
        })
    }
    return Subcategory
}
