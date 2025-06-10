import { connect } from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
  try {
    const connectionInstance = await connect(
      `${process.env.MONGO_URI}/${DB_NAME}`
    );
    console.log(
      `\nMongoDB connected !! DB Host: ${connectionInstance.connection.host}`
    );
  } catch (err) {
    console.error("MongoDB connection error", err);
    process.exit(1);
  }
};

export default connectDB;
