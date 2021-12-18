module.exports = (sequelize, dataTypes) => {
    let alias = 'Users';
    let cols = {
        id: {
            type: dataTypes.INTEGER(11),
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        fullName: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        dni_cuit: {
            type: dataTypes.INTEGER(11),
            allowNull: false
        },
        phone: {
            type: dataTypes.INTEGER(11),
            allowNull: false
        },
        email: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        invoice_type_id: {
            type: dataTypes.INTEGER(11),
            allowNull: false
        },
        street: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        number: {
            type: dataTypes.INTEGER(11),
            allowNull: false
        },
        floor: {
            type: dataTypes.STRING(30),
            allowNull: true
        },
        flat: {
            type: dataTypes.STRING(30),
            allowNull: true
        },
        zip: {
            type: dataTypes.INTEGER(11),
            allowNull: false
        },
        city: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        state_id: {
            type: dataTypes.INTEGER(11),
            allowNull: false
        },
        password: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        avatar: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        roll_user_id: {
            type: dataTypes.INTEGER(11),
            allowNull: false
        },
        reference: {
            type: dataTypes.STRING(200),
            allowNull: true
        },
        estado: {
            type: dataTypes.STRING(1),
            allowNull: false,
            defaultValue: 'A'
        }
    };
    let config = {
        tableName: 'users',
        timestamps: false
    };
    const Users = sequelize.define(alias, cols, config);

    Users.associate = function (models) {
        Users.belongsTo(models.Roles, {
            as: "roles",
            foreignKey: "roll_user_id"
        })
        Users.belongsTo(models.Afip, {
            as: "afip",
            foreignKey: "invoice_type_id"
        })
        Users.belongsTo(models.Zones, {
            as: "zones",
            foreignKey: "state_id"
        })
        
    }

    return Users;
};