import "reflect-metadata"
import { DataSource } from "typeorm";
import "dotenv/config"
import { Users } from "./entities";
export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: process.env.DB_PORT as unknown as number,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  entities: [Users],
  subscribers: [],
  migrations: [],
})

AppDataSource.initialize().then(() => {
  console.log(`[${new Date()}] TYPEORM [POSTGRESQL] Data Source has been initialized!`)
})
.catch((err) => {
  console.error("Error during Data Source initialization", err)
})
