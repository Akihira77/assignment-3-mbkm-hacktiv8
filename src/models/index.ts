import fs from "fs";
import path from "path";
import { createRequire } from "module";
import { fileURLToPath } from "url";
import { Sequelize } from "sequelize";
import process from "process";
import { dbConfig } from "../config/config.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const db = {};
const require = createRequire(import.meta.url);
import * as tsImport from "ts-import";

let sequelize;

if (env !== "production") {
	sequelize = new Sequelize(dbConfig[env].url, {
		logging: false,
	});
} else {
	sequelize = new Sequelize(
		dbConfig["production"].database,
		dbConfig["production"].username,
		dbConfig["production"].password,
		{
			logging: false,
		}
	);
}

fs.readdirSync(__dirname)
	.filter((file) => {
		return (
			file.indexOf(".") !== 0 &&
			file !== basename &&
			file.slice(-3) === ".ts" &&
			file.indexOf(".test.ts") === -1
		);
	})
	.forEach(async (file) => {
		//@ts-ignore
		const model = require(path.join(__dirname, file))(
			sequelize,
			//@ts-ignore
			Sequelize.DataTypes
		);
		// @ts-ignore
		db[model.name] = model;
	});

Object.keys(db).forEach((modelName) => {
	// @ts-ignore
	if (db[modelName].associate) {
		// @ts-ignore
		db[modelName].associate(db);
	}
});
// @ts-ignore
db.sequelize = sequelize;
// @ts-ignore
db.Sequelize = Sequelize;

export { db };
