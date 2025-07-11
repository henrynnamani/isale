import { config } from 'dotenv';
import { DataSource } from 'typeorm';
import path from 'path';

const env = process.env.NODE_ENV || 'development';

config({ path: `.env.${env}` });

// console.log(path.resolve(__dirname, 'modules/**/*.entity.{ts,js}'));

const dataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  port: +process.env.DB_PORT,
  database: process.env.DB_NAME,
  entities: [__dirname + '/../modules/**/model/*.entity.{ts,js}'],
  //   migrations: [__dirname + '/migrations/*.{ts,js}'],
  synchronize: process.env.DB_SYNC === 'true',
});

export default dataSource;
