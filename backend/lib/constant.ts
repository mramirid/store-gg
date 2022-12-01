import { cleanEnv, str, testOnly } from "envalid";
import mongodbUri from "mongodb-uri";

export const env = cleanEnv(process.env, {
  MONGO_HOST: str(),
  MONGO_INITDB_ROOT_USERNAME: str(),
  MONGO_INITDB_ROOT_PASSWORD: str(),
  MONGO_DB_NAME: str({ devDefault: testOnly("storeGGTest") }),
  BACKEND_SECRET: str(),
});

export const mongoUri = mongodbUri.formatMongoose({
  scheme: "mongodb",
  username: env.MONGO_INITDB_ROOT_USERNAME,
  password: env.MONGO_INITDB_ROOT_PASSWORD,
  hosts: [{ host: env.MONGO_HOST, port: 27017 }],
  database: env.MONGO_DB_NAME,
  options: { authSource: "admin" },
});
