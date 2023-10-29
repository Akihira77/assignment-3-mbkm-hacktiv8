import { dbConfig } from "./../config/config.js";
import { Sequelize } from "sequelize";
import { Pool, QueryResultRow } from "pg";

let sequelize: Sequelize;

const env = process.env.NODE_ENV || "development";
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

export { sequelize };
// const pool = new Pool({
//     max: 10,
//     idleTimeoutMillis: 0,
//     connectionTimeoutMillis: 10,
// });

// type AcceptableParams = (string | number | boolean)[];

// export const query = <T extends QueryResultRow>(
//     sql: string,
//     params?: AcceptableParams
// ) => pool.query<T>(sql, params);
