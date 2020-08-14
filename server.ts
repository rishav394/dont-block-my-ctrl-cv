// Run on main computer
// Jaha pe finally paste hoga
import bodyParser from "body-parser";
import clipboard from "clipboardy";
import express from "express";
import os from "os";
import path from "path";

var ifaces = os.networkInterfaces();

Object.keys(ifaces).forEach(function (ifname) {
  var alias = 0;

  ifaces[ifname]?.forEach(function (iface) {
    if ("IPv4" !== iface.family || iface.internal !== false) {
      return;
    }

    if (alias >= 1) {
      console.log(ifname + ":" + alias, iface.address);
    } else {
      console.log(ifname, iface.address);
    }

    ++alias;
  });
});

const app = express();

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

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

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(3000, () => {
  console.log("\nListening on port 3000");
});
