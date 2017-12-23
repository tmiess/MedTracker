///Reference for schema model
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

    // Post.associate = function(models) {
    //     // We're saying that a Post should belong to an Author
    //     // A Post can't be created without an Author due to the foreign key constraint
    //     Post.belongsTo(models.Author, {
    //         foreignKey: {
    //             allowNull: false
    //         }
    //     });
    // };

    return Doctor;
};
