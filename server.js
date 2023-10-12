const http = require("http");
require("dotenv").config();

const app = require("./app");
const connectDB = require("./config/db.config");

const PORT = process.env.PORT || 3000;

const server = http.createServer(app);

const startServer = async () => {
  await connectDB();
  server.listen(PORT, () => {
    console.log(`Server running at ${PORT}`);
  });
};

startServer();
