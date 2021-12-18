module.exports = (sequelize, dataTypes) => {
    let alias = 'Zones';
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
        tableName: 'zones',
        timestamps: false
    };
    const Zones = sequelize.define(alias, cols, config);

    Zones.associate = function (models) {
        Zones.hasMany(models.Users, {
            as: "users",
            foreignKey: "state_id"
        })
    }

    return Zones;
};