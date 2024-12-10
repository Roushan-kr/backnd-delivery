import dotenv from "dotenv";
dotenv.config();

import express from "express";
import conf from "./conf/conf.js";
import userRouter from "./routes/user.routes.js";
import bookingRouter from "./routes/booking.routes.js";
import connectDB from "./conf/db.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("api is ready");
});

app.use("/user", userRouter);
app.use("/booking", bookingRouter);

connectDB()
  .then(() => {
    app.listen(conf.PORT, () => {
      console.log(`Server running on port ${conf.PORT}`);
    });
  })
  .catch((error) => {
    console.log(`Error: ${error.message}`);
  });
