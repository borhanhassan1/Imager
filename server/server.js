import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import userRouter from "./routes/userRoutes.js";
import imageRouter from "./routes/imageRoutes.js";
import stripeRouter from "./routes/stripeRoutes.js";
const PORT = process.env.PORT || 4000;
const app = express();


app.use("/api/stripe", stripeRouter);
app.use(express.json());

app.use(
  cors({
    origin: "https://imager1.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

await connectDB();

app.use("/api/user", userRouter);
app.use("/api/image", imageRouter);

app.get("/", (req, res) => {
  res.send("Hello from server");
});

app.listen(PORT, () => {
  console.log("Hello from server " + PORT);
});
