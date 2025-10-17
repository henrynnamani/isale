import { config } from 'dotenv';
import path from 'path';
import { DataSource } from 'typeorm';

const env = process.env.NODE_ENV || 'development';

config({ path: `.env.${env}` });

const dataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  port: +process.env.DB_PORT,
  database: process.env.DB_NAME,
  entities: [path.join(__dirname, '../modules/**/model/*.entity.{js,ts}')],
  migrations: [path.join(__dirname, './migrations/*.{js,ts}')],
  synchronize: process.env.DB_SYNC === 'true',
  ssl: {
    rejectUnauthorized: false,
  },
});

export default dataSource;
