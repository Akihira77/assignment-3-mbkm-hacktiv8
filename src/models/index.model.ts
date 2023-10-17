import Photo from "./photo.model.js";
import User from "./user.model.js";

User.hasMany(Photo, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});

Photo.belongsTo(User, { foreignKey: "UserId" });

export { User, Photo };
