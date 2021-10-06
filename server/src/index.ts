import { Connection, createConnection, getConnection } from "typeorm";
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
import { listTier2Invoices } from "./routes/listTier2Invoices";
import { listTier2InvoicesForDiscounting } from "./routes/listTier2InvoicesForDiscounting";
import { updateTier2InvoiceForApproval } from "./routes/updateTier2InvoiceForApproval";
import { updateTier2InvoicesForDiscounting } from "./routes/updateTier2InvoicesForDiscounting";
import { listInvoicesForBankApproval } from "./routes/listInvoicesForBankApproval";
import { listInvoicesPostBankApproval } from "./routes/listInvoicesPostBankApproval";
import { updateInvoiceForBankApproval } from "./routes/updateInvoiceForBankApproval";
import { listTier1PayableReceivable } from "./routes/listTier1PayableReceivable";
import { updateTier1PayableReceivable } from "./routes/updateTier1PayableReceivable";
import { listTier2EarlyPaymentReceived } from "./routes/listTier2EarlyPaymentReceived";
import { updateTier2EarlyPaymentReceived } from "./routes/updateTier2EarlyPaymentReceived";
import { AssertionError } from "assert";
import path from "path";

import { config } from "dotenv";
import { router as uploadRouter } from "./routes/upload";
import { listTier2Customers } from "./routes/listTier2Customers";

// Loads .env file to process
config();

// Create a new express application instance
const app: express.Application = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static(path.join(__dirname, "../webapp/build")));
app.use(uploadRouter);

const PORT = process.env.PORT || 8082;
createConnection()
  .then((connection) => {
    setupSessionAndPassport(connection);

    setupDefaultAndAuthRoutes();

    app.post("/api/Tier2Invoice", loginCheck(), tier2Invoice);
    app.get("/api/ListTier2Invoices", loginCheck(), listTier2Invoices);
    app.get("/api/ListTier2Customers", loginCheck(), listTier2Customers);
    app.post("/api/UpdateTier2InvoiceForApproval", loginCheck(), updateTier2InvoiceForApproval);
    app.get("/api/ListTier2InvoicesForDiscounting", loginCheck(), listTier2InvoicesForDiscounting);
    app.post("/api/UpdateTier2InvoiceForDiscounting", loginCheck(), updateTier2InvoicesForDiscounting);
    app.get("/api/ListInvoicesForBankApproval", loginCheck(), listInvoicesForBankApproval);
    app.post("/api/UpdateInvoiceForBankApproval", loginCheck(), updateInvoiceForBankApproval);
    app.get("/api/ListInvoicesPostBankApproval", loginCheck(), listInvoicesPostBankApproval);
    app.get("/api/ListTier1PayableReceivable", loginCheck(), listTier1PayableReceivable);
    app.post("/api/UpdateTier1PayableReceivable", loginCheck(), updateTier1PayableReceivable);
    app.get("/api/ListTier2EarlyPaymentReceived", loginCheck(), listTier2EarlyPaymentReceived);
    app.post("/api/UpdateTier2EarlyPaymentReceived", loginCheck(), updateTier2EarlyPaymentReceived);

    app.get("/*", (req, res) => {
      res.sendFile(path.join(__dirname, "../webapp/build", "index.html"));
    });
    app.listen(PORT, () => {
      console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
    });
  })
  .catch((error) => console.log(error));

function setupDefaultAndAuthRoutes() {
  // app.get("/", (req, res) => {
  //   res.send("Hello World!");
  // });

  app.post("/register", register);
  app.post("/login", passport.authenticate("local", { failureFlash: false }), async (req, res) => {
    res.json(req.user);
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
        secret: "SECRET_KEY",
        saveUninitialized: false,
        resave: false,
        cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 },
      })
    );

    app.use(passport.initialize());
    app.use(passport.session());
    initializePassportConfig();
  } else {
    throw new AssertionError({
      message: "connection driver has to be of type postgres",
    });
  }
}

function loginCheck() {
  return ensureLoggedIn();
}

function ensureLoggedIn() {
  return async (req: Request, res: Response, next) => {
    if (!req.isAuthenticated || !req.isAuthenticated()) {
      res.status(401);
      return res.end();
    }
    next();
  };
}

process.on("uncaughtException", (err) => {
  console.error(err, "Uncaught Exception thrown");
  process.exit(1);
});
