import { DataSource } from 'typeorm';

const globalProcess = (globalThis as any).process;
// Check if the application is running via CLI migration tool vs local compiled application
const isCLI = globalProcess?.argv?.some(arg => arg.includes('typeorm') || arg.includes('cli.js'));

export const AppDataSource = new DataSource({
    type: 'better-sqlite3',
    database: 'db.sqlite',
    synchronize: false,
    // Use .ts files for terminal CLI migration commands, use .js files for your compiled NestJS app runtime
    entities: isCLI ? ['src/**/*.entity.ts'] : ['dist/**/*.entity.js'],
    migrations: isCLI ? ['src/migrations/*.ts'] : ['dist/migrations/*.js'],
});
