import "dotenv/config.js";
import app from "./app.js";
import connectDB from "./config/database.js";

const port = process.env.PORT || 5000;

connectDB()
  .then(() => {
    app.on("error", (error) => {
      console.error(`Error: ${error}`);
    });

    app.listen(port, () => {
      console.log(`Server is running at port: ${port}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection failed !!!", error);
  });
