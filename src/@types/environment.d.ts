export {};

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NODE_ENV: string;
            PORT: string;
            POSTGRES: string;
            JWT_SECRET: string;
        }
    }
}
