import { DataTypes, Model } from "sequelize";
import { sequelize } from "../data/db.js";

class Photo extends Model {
    declare id: string;
    declare title: string;
    declare caption: string;
    declare imageUrl: string;
    declare UserId: string;
}

Photo.init(
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            allowNull: false,
        },
        title: {
            type: DataTypes.STRING,
            validate: {
                max: 50,
                notEmpty: true,
            },
            allowNull: false,
        },
        caption: {
            type: DataTypes.STRING,
            validate: {
                max: 255,
                notEmpty: true,
            },
            allowNull: false,
        },
        imageUrl: {
            type: DataTypes.TEXT,
            validate: {
                max: 1024,
                notEmpty: true,
            },
            allowNull: false,
        },
    },
    { sequelize, modelName: "Photo" }
);

export default Photo;
