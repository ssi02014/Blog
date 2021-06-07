import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import config from "./config";
import hpp from "hpp";
import helmet from "helmet";
import cors from "cors";
// import path from "path";

//Routes
import postsRoutes from "./routes/api/post";
import userRoutes from "./routes/api/user";
import authRoutes from "./routes/api/auth";
import searchRoutes from "./routes/api/search";

const app = express();
const { MONGO_URI } = config;

app.use(hpp());
app.use(helmet());

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(morgan("dev")); //morgan: 콘솔에 로그 출력
app.use(express.json());

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("MongoDB Connecting Success!"))
  .catch((e) => console.log("e"));

//Use routes
app.use("/api/post", postsRoutes);
app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/search", searchRoutes);

export default app;
