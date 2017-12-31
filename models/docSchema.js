///Reference for schema model
// var Patient = require("../models/patSchema.js");
module.exports = function(sequelize, DataTypes) {
    var Doctor = sequelize.define("Doctor", {
        full_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        doc_email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        doc_uid: {
            type: DataTypes.STRING,
        }
    });

    // Patient.associate = function(models) {
    //     // We're saying that a Post should belong to an Author
    //     // A Post can't be created without an Author due to the foreign key constraint
    //     Patient.belongsTo(models.Doctor, {
    //         foreignKey: {
    //             allowNull: false
    //         }
    //     });
    // };

    return Doctor;
};
