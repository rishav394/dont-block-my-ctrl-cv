// Run on main computer
// Jaha pe finally paste hoga
import bodyParser from "body-parser";
import clipboard from "clipboardy";
import express from "express";
import path from "path";
import { printAllNetworkInterfaces } from "./util";

printAllNetworkInterfaces();

const app = express();

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

app.use(bodyParser.json());

app.post("/", (req, res) => {
  clipboard
    .write(req.body.text)
    .then(() => {
      res.redirect("/");
    })
    .catch((err) => {
      res.send(err);
    });
});

app.get("/clipboard", (req, res) => {
  try {
    const value = clipboard.readSync();
    res.send(`<pre>${value}</pre>`);
  } catch (err) {
    res.status(500).json({ message: "Nothing to copy" });
  }
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/ping", (req, res) => {
  res.sendStatus(200);
});

app.listen(3000, () => {
  console.log("\nListening on port 3000");
});
