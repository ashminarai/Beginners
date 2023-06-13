// for using in another files

module.exports = (sequelize, DataTypes) => {
    // // Table name as Blog in double quote and Blog as variable in front
    const User = sequelize.define("User", {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        isCompany: {
            type: DataTypes.BOOLEAN,
            defaultValue: undefined,
        },
    });

    // Knows the relation like foreignkey

    User.associate = (models) => {
        User.hasMany(models.Job, {
            onDelete: "cascade",
        });

        User.hasOne(models.Employee, {
            onDelete: "cascade",
        });

        User.hasOne(models.Company, {
            onDelete: "cascade",
        });
        User.hasOne(models.Application, {
            onDelete: "cascade",
        });

        User.hasMany(models.Notification, {
            onDelete: "cascade",
        });
    };
    return User;
};