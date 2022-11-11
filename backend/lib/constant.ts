import { cleanEnv, str, testOnly } from "envalid";

export const env = cleanEnv(process.env, {
  MONGO_HOST: str(),
  MONGO_INITDB_ROOT_USERNAME: str(),
  MONGO_INITDB_ROOT_PASSWORD: str(),
  MONGO_DB_NAME: str({ devDefault: testOnly("storeGGTest") }),
  SESSION_SECRET: str(),
});
