import dotenv from "dotenv";

if (process.env.NODE_ENV !== "production") {
	dotenv.config({ path: "./.env" });
} else {
	dotenv.config();
}

export const PORT = Number(process.env.PORT || 7000);
export const JWT_SECRET = String(process.env.JWT_SECRET);
export const dbConfig = {
	development: {
		url: process.env.POSTGRES,
	},
	test: {
		url: process.env.POSTGRES_TEST,
	},
	production: {
		username: "root",
		password: "root",
		database: "database_production",
		host: "127.0.0.1",
		dialect: "mysql",
	},
};
