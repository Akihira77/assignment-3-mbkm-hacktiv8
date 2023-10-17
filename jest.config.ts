import type { JestConfigWithTsJest } from "ts-jest";
// /** @type {import('ts-jest').JestConfigWithTsJest} */
// module.exports = {
//     preset: "ts-jest",
//     testEnvironment: "node",
//     testMatch: ["**/**/*.test.ts"],
//     verbose: true,
//     forceExit: true,
//     rootDir: ".",
//     modulePaths: ["<rootDir>/src"],
//     moduleNameMapper: {
//         "^(\\.{1,2}/.*)\\.js$": "$1",
//     },
// };

const jestConfig: JestConfigWithTsJest = {
    rootDir: ".",
    modulePaths: ["<rootDir>/src"],
    testMatch: ["<rootDir>/**/*.test.ts"],
    setupFiles: ["dotenv/config"],
    extensionsToTreatAsEsm: [".ts"],
    moduleNameMapper: {
        "^(\\.{1,2}/.*)\\.js$": "$1",
    },
    transform: {
        // '^.+\\.[tj]sx?$' to process js/ts with `ts-jest`
        // '^.+\\.m?[tj]sx?$' to process js/ts/mjs/mts with `ts-jest`
        "^.+\\.tsx?$": [
            "ts-jest",
            {
                useESM: true,
            },
        ],
    },
    forceExit: true,
    verbose: true,
};

export default jestConfig;
