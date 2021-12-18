module.exports = (sequelize, dataTypes) => {
    let alias = 'Afip';
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
        estado: {
            type: dataTypes.STRING(1),
            allowNull: false,
            defaultValue: 'A'
        }
    };
    let config = {
        tableName: 'afip',
        timestamps: false
    };
    const Afip = sequelize.define(alias, cols, config);

    Afip.associate = function (models) {
        Afip.hasMany(models.Users, {
            as: "users",
            foreignKey: "invoice_type_id"
        })
    }

    return Afip;
};