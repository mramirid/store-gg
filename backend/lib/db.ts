import mongoose from "mongoose";
import { mongoUri } from "./constant";

mongoose.connect(mongoUri);

export default mongoose.connection;
