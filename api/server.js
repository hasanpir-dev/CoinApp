const express = require("express");
const sanitize = require("express-mongo-sanitize");
const helmet = require("helmet");
const xss = require("xss-clean");
const hpp = require("hpp");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

const limitAccess = require("./middlewares/security/limitAccess");
const dotenv = require("dotenv");
const connectDatabase = require("./config/database");
const routes = require("./routes");
const errorHandler = require("./middlewares/errors/errorHandler");

dotenv.config({ path: "./config/config.env" });
// MongoDb Connection
connectDatabase();

// Creating Server
const app = express();
app.use(express.json());
const PORT = process.env.PORT || 5000;

// Security
app.use(sanitize());
app.use(helmet());
app.use(xss());

app.use(
  limitAccess({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 500, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  })
);

app.use(hpp());
app.use(cors());

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cookieParser());

// Routes
app.use("/api", routes);

// Error Handler
app.use(errorHandler);

// Starting Server
app.listen(PORT, () => {
  console.log(
    `App Started on ${PORT} - Environment : ${process.env.NODE_ENV} `
  );
});
