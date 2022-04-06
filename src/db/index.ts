import { createConnection, DataSource } from "typeorm";

const connections = (): Promise<DataSource> => {
  return createConnection({
    type: "postgres",
    host: process.env.DB_HOST as string,
    port: Number(process.env.DB_PORT as string),
    username: process.env.DB_USERNAME as string,
    password: process.env.DB_PW as string,
    database: process.env.DB_DB as string,
    synchronize: true,
    logging: false,
    entities: ["dist/**/*.entity{.ts,.js}", "src/**/*.entity{.ts,.js}"],
  });
};

export { connections };
