import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('xcho','postgres','123456',{
    host: 'xcho-db', // host: localhost on bun run dev
    port: 5432,  //port: 2502 on bun run dev
    dialect: 'postgres',
    logging: false,
});

export default sequelize;