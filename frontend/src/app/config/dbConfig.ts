import mongoose from "mongoose";

export async function connect() {
  try {
    mongoose.connect(process.env.DB_URL!);
    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log(`mongodb connected to ${process.env.DB_URL}`);
    });

    connection.on("error", (err) => {
      console.log('MongoDB connection error' + err);
      process.exit();
    });
  } catch (err) {
    console.log(err);
  }
}