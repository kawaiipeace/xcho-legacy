import { Dialect, Sequelize } from 'sequelize';
import * as dotenv from 'dotenv';

dotenv.config();

const dbHost = process.env.DATABASE_HOST!;
const dbName = process.env.DATABASE_NAME!;
const dbUser = process.env.DATABASE_USER!;
const dbPassword = process.env.DATABASE_PASSWORD!;
const dbPort = process.env.DATABASE_PORT! ? Number(process.env.DATABASE_PORT) : 5432;
const dbDialect = process.env.DATABASE_DIALECT as Dialect;

const validDialects: Dialect[] = ['mysql', 'postgres', 'sqlite', 'mariadb'];

if (!validDialects.includes(dbDialect)) {
    throw new Error(`Invalid dialect specified: ${dbDialect}`);
}

const sequelize = new Sequelize(dbName, dbUser, dbPassword,{
    host: dbHost,
    port: dbPort,
    dialect: dbDialect,
    logging: console.log,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

const testConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connection established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

testConnection();

export default sequelize;