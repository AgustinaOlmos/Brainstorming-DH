module.exports = (sequelize, dataTypes) => {
    let alias = 'Roles';
    let cols = {
        id: {
            type: dataTypes.INTEGER(11),
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        roll: {
            type: dataTypes.STRING(50),
            allowNull: false
        },
        estado: {
            type: dataTypes.STRING(1),
            allowNull: false,
            defaultValue: 'A'
        }
    };
    let config = {
        tableName: 'roles',
        timestamps: false
    };
    const Roles = sequelize.define(alias, cols, config);

        Roles.associate = function (models) {
            Roles.hasMany(models.Users, {
                as: "users",
                foreignKey: "roll_user_id"
            })
        }

    return Roles;
};