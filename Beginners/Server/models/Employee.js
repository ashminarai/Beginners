// for using in another files

module.exports = (sequelize, DataTypes) => {
    // // Table name as Blog in double quote and Blog as variable in front
    const Employee = sequelize.define("Employee", {
        fullName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        qualification: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        mainSkill: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        secondarySkill: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        experience: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        interest: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });

    Employee.associate = (models) => {
        Employee.hasMany(models.Application, {
            onDelete: "cascade",
        });
        Employee.hasMany(models.Notification, {
            onDelete: "cascade",
        });
    };
    return Employee;
};