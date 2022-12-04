import _ from "lodash";
import mongoose from "mongoose";
import { mongoUri } from "../lib/constant";
import seed from "../seed";

mongoose.connect(mongoUri, async (error) => {
  if (_.isError(error)) {
    throw new Error("Failed to connect to MongoDB!", { cause: error });
  }

  try {
    console.log("[seed]", "dropping the database...");
    await mongoose.connection.dropDatabase();
    console.log("[seed]", "the database has been dropped.");

    console.log("[seed]", "seeding...");
    await seed();
    console.log("[seed]", "done.");
  } catch (error) {
    await mongoose.connection.dropDatabase();
    throw new Error("[seed] Seeding failed!", { cause: error });
  } finally {
    await mongoose.connection.close();
  }
});
