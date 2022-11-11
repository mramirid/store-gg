import mongodbUri from "mongodb-uri";
import mongoose from "mongoose";
import { env } from "./constant";

const mongoUri = mongodbUri.formatMongoose({
  scheme: "mongodb",
  username: env.MONGO_INITDB_ROOT_USERNAME,
  password: env.MONGO_INITDB_ROOT_PASSWORD,
  hosts: [{ host: env.MONGO_HOST, port: 27017 }],
  database: env.MONGO_DB_NAME,
  options: { authSource: "admin" },
});

mongoose.connect(mongoUri);

export default mongoose.connection;
