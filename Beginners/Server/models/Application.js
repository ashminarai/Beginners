// for using in another files

module.exports = (sequelize, DataTypes) => {
    // // Table name as Blog in double quote and Blog as variable in front
    const Application = sequelize.define("Application", {
        cv: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        coverLetter: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        isAccepted: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
    });

    return Application;
};