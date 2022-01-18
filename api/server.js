const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const port = 3080;
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.post("/api/speechInput", function (req, res) {
  console.log(req.body.speechText);
  res.send("Server: OK!");
});

app.listen(port, () => {
  console.log("Server in ascolto sulla porta " + port);
});
