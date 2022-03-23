import express from "express";
import router from "./routes/index.js";
import cors from "cors";

const PORT = process.env.PORT || 5000;
const app = express();
app.locals.pretty = true;

app.listen(PORT, (err) => {
  err ? console.log(`err: ${err}`) : console.log(`Listening on port ${PORT}`);
});

app.set("view engine", "pug");
app.set("views", "./views");
app.use(express.static("../client/public"));
app.use(cors());
app.use(router);

app.use(errorHandler);

function errorHandler(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }
  res.status(500);
  res.render("error", { error: err });
}
