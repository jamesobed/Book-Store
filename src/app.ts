import createError from "http-errors";
import express, { Request, Response, NextFunction } from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import db from "./config/database.config";

import userRouter from "./routes/user";
import bookRouter from "./routes/book";
import pageRouter from "./routes/pages";
import cors from "cors";
db.sync()
  .then(() => {
    console.log("Database connected succcesfully");
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();
const myCors = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(myCors));

// view engine setup
// app.set("views", path.join(__dirname, "..", "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "..", "public")));

app.get("/login", (req: Request, res: Response) => {
  res.render("./login");
});
app.get("/register", (req: Request, res: Response) => {
  res.render("./registerAuthor");
});
app.get("/create", (req: Request, res: Response) => {
  res.render("./createBook");
});

app.get("/single", (req: Request, res: Response) => {
  res.render("./Home");
});

app.use("/", userRouter);
app.use("/", bookRouter);
app.use("/", pageRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (
  err: createError.HttpError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

export default app;
