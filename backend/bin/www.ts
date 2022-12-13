//
// Module dependencies.
//
import debug from "debug";
import http from "http";
import _ from "lodash";
import type mongoose from "mongoose";
import app from "../app";
import database from "../lib/database";

//
// Get port from environment and store in Express.
//
const port = normalizePort(process.env["PORT"] ?? "3000");
app.set("port", port);

//
// Normalize a port into a number, string, or false.
//
function normalizePort(value: string) {
  const port = parseInt(value, 10);

  if (isNaN(port)) {
    // named pipe
    return value;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

//
// Create HTTP server.
//
const server = http.createServer(app);

database.on("error", (error: mongoose.Error.MongooseServerSelectionError) => {
  throw new Error("Failed to connect to MongoDB:", { cause: error });
});
database.on("open", () => {
  // Listen on provided port, on all network interfaces.
  server.listen(port);
  server.on("error", onError);
  server.on("listening", onListening);
});

//
// Event listener for HTTP server "error" event.
//
function onError(error: SystemError) {
  if (error.syscall !== "listen") {
    throw error;
  }

  const bind = _.isString(port) ? "Pipe " + port : "Port " + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      throw new Error(`${bind} requires elevated privileges`);
    case "EADDRINUSE":
      throw new Error(`${bind} is already in use`);
    default:
      throw error;
  }
}

interface SystemError extends Error {
  syscall: string;
  code?: string | undefined;
}

//
// Event listener for HTTP server "listening" event.
//
function onListening() {
  const address = server.address();
  const bind = _.isString(address)
    ? `pipe ${address}`
    : `port ${address?.port}`;
  debug("http")("Listening on " + bind);
}
