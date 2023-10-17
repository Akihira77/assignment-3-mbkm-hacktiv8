import { DataTypes, Model } from "sequelize";
import { sequelize } from "../data/db.js";
import Photo from "./photo.model.js";

class User extends Model {
    declare id: string;
    declare username: string;
    declare email: string;
    declare password: string;
}

User.init(
    {
        id: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                notEmpty: true,
                isEmail: true,
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                min: 6,
                notEmpty: true,
            },
        },
    },
    {
        sequelize,
        modelName: "User",
    }
);

export default User;
