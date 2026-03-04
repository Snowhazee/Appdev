require("dotenv").config();
console.log("JWT_SECRET is:", process.env.JWT_SECRET);
const express = require("express");

const accountRoutes = require("./auth");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send({ message: "Hello from Back end!" });
});

app.use("/", accountRoutes);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
//# sourceURL=backend/routes/server.jshat
