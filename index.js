import dotenv from "dotenv";
dotenv.config();

import express from "express";
import userRouter from "./routes/user.routes.js";
import bookingRouter from "./routes/booking.routes.js";
import deliveryRouter from "./routes/delivery.routes.js";
import connectDB from "./conf/db.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.send("API is ready");
});

app.use("/user", userRouter);
app.use("/booking", bookingRouter);
app.use("/delivery", deliveryRouter);

// fallback route
app.use((req, res) => {
  res.status(404).send({ message: `Route ${req.originalUrl} not found.` });
});

connectDB()
  .then(() => {
    console.log(`Database connected successfully.`);
    // No need to use app.listen in serverless environments
  })
  .catch((error) => {
    console.log(`Error: ${error.message}`);
  });

export default app;
