export const dbConfig = {
    synchronize: false,
    migrations: ['migrations/*.js'],
    cli: {
        migrationsDir: 'migrations'
    }
};

switch (process.env.NODE_ENV) {
    case 'development':
        Object.assign(dbConfig, {
            type: 'better-sqlite3',
            database: 'db.sqlite',
            entities: ['src/**/*.entity.ts']
        })
        break;

    case 'test':
        Object.assign(dbConfig, {
            type: 'better-sqlite3',
            database: 'test.sqlite',
            entities: ['src/**/*.entity.ts']
        })
        break;
    case 'production':
        break;
    default:
        throw new Error(`Unknown environment: ${process.env.NODE_ENV}`)
}

module.exports = dbConfig;