import { dbConfig } from "./../config/config.js";
import { Sequelize } from "sequelize";
let sequelize;
const env = process.env.NODE_ENV || "development";
if (env !== "production") {
    sequelize = new Sequelize(dbConfig[env].url, {
        logging: false,
    });
}
else {
    sequelize = new Sequelize(dbConfig["production"].database, dbConfig["production"].username, dbConfig["production"].password, {
        logging: false,
    });
}
export { sequelize };
//# sourceMappingURL=db.js.map