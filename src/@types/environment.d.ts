import { EnvType } from "./index.js";

export {};

declare global {
	namespace NodeJS {
		interface ProcessEnv {
			NODE_ENV: EnvType;
			PORT: string;
			POSTGRES: string;
			POSTGRES_TEST: string;
			JWT_SECRET: string;
			DB_USERNAME_DEV: string;
			DB_PASSWORD_DEV: string;
			DB_NAME_DEV: string;
			DB_HOST_DEV: string;
			DB_DIALECT_DEV: string;
			DB_USERNAME_TEST: string;
			DB_PASSWORD_TEST: string;
			DB_NAME_TEST: string;
			DB_HOST_TEST: string;
			DB_DIALECT_TEST: string;
		}
	}
}
