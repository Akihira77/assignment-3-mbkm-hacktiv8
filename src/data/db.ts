import { Sequelize } from "sequelize";
import { Pool, QueryResultRow } from "pg";

const connectionString = process.env.POSTGRES!;
export const sequelize = new Sequelize(connectionString, {
    logging: false,
});

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
