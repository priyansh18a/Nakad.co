import { Connection, createConnection } from "typeorm";
import express, { Request, Response } from "express";
import session from "express-session";
import passport from "passport";
import register from "./routes/register";
import cors from "cors";
import { PostgresDriver } from "typeorm/driver/postgres/PostgresDriver";
import { Pool } from "pg";
import Session from "express-session";
import connectPgSimple from "connect-pg-simple";
import { initializePassportConfig } from "./config/passport";
import { tier2Invoice } from "./routes/tier2Invoice";
import { listTier2InvoicesForApproval } from "./routes/listTier2InvoicesForApproval";
import { listTier2InvoicesForDiscounting } from "./routes/listTier2InvoicesForDiscounting";
import { updateTier2InvoiceForApproval } from "./routes/updateTier2InvoiceForApproval";
import { updateTier2InvoicesForDiscounting } from "./routes/updateTier2InvoicesForDiscounting";
import { listInvoicesForBankApproval } from "./routes/listInvoicesForBankApproval";
import { updateInvoiceForBankApproval } from "./routes/updateInvoiceForBankApproval";
import { AssertionError } from "assert";
import path from "path";
import { config } from "dotenv";
import { router as uploadRouter } from "./routes/upload";

// Loads .env file to process
config();

// Create a new express application instance
const app: express.Application = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static(path.join(__dirname, "../clientbuild")));
app.use(uploadRouter);

const PORT = 8082;
createConnection()
  .then((connection) => {
    setupSessionAndPassport(connection);

    setupDefaultAndAuthRoutes();

    app.post("/api/Tier2Invoice", loginCheck(), tier2Invoice);
    app.get("/api/ListTier2InvoicesForApproval", loginCheck(), listTier2InvoicesForApproval);
    app.post("/api/UpdateTier2InvoiceForApproval", loginCheck(), updateTier2InvoiceForApproval);
    app.get("/api/ListTier2InvoicesForDiscounting", loginCheck(), listTier2InvoicesForDiscounting);
    app.post("/api/UpdateTier2InvoiceForDiscounting", loginCheck(), updateTier2InvoicesForDiscounting);
    app.get("/api/ListInvoicesForBankApproval", loginCheck(), listInvoicesForBankApproval);
    app.post("/api/UpdateInvoiceForBankApproval", loginCheck(), updateInvoiceForBankApproval);

    app.get("/*", (req, res) => {
      res.sendFile(path.join(__dirname, "../clientbuild", "index.html"));
    });
    app.listen(PORT, () => {
      console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
    });
  })
  .catch((error) => console.log(error));

function setupDefaultAndAuthRoutes() {
  app.get("/", (req, res) => {
    res.send("Hello World!");
  });

  app.post("/register", register);
  app.post("/login", passport.authenticate("local", { failureFlash: false }), (req, res) => {
    res.json({});
    res.end();
  });
  app.get("/logout", (req, res) => {
    req.logout();
    res.status(200);
    res.end();
  });
}

function setupSessionAndPassport(connection: Connection) {
  if (connection.driver instanceof PostgresDriver) {
    const pool = connection.driver.master as Pool;
    app.use(
      session({
        store: new (connectPgSimple(Session))({
          pool,
        }),
        secret: "9OLWxND4o83j4K4iuopOhjbdjwgg515",
        saveUninitialized: false,
        resave: false,
        cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 },
      })
    );

    app.use(passport.initialize());
    app.use(passport.session());
    initializePassportConfig();
  } else {
    throw new AssertionError({ message: "connection driver has to be of type postgres" });
  }
}

function loginCheck() {
  return ensureLoggedIn();
}

function ensureLoggedIn() {
  return (req: Request, res: Response, next) => {
    if (!req.isAuthenticated || !req.isAuthenticated()) {
      res.status(401);
      return res.end();
    }
    next();
  };
}
