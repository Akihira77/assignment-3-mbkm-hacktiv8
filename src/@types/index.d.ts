export type DbConfigType = {
	username: string;
	password: string;
	host: string;
	dialect: string;
	database: string;
};

export type EnvType = "development" | "production" | "test";
