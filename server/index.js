const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql2");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "Rohit@7585",
  database: "nettantraproject",
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("server is running..");
});

// get all data
app.get("/api/get", (req, res) => {
  const sqlGet = "SELECT * FROM user";
  db.query(sqlGet, (error, result) => {
    // console.log(result);
    res.send(result);
  });
});

// add data
app.post("/api/post", (req, res) => {
  const {
    date,
    name,
    intakecalorie,
    targetincalorie,
    burncalorie,
    targetburncalorie,
  } = req.body;
  const sqlInsert =
    "INSERT INTO user(date, name, intakecalorie, targetincalorie, burncalorie, targetburncalorie) VALUES(?,?,?,?,?,?)";
  db.query(
    sqlInsert,
    [
      date,
      name,
      intakecalorie,
      targetincalorie,
      burncalorie,
      targetburncalorie,
    ],
    (error, result) => {
      if (error) console.log(error);
      else {
        console.log("insert successful");
        res.status(200).send(result);
      }
    }
  );
});

// delete data
app.delete("/api/remove/:id", (req, res) => {
  const { id } = req.params;
  const sqlRemove = "DELETE FROM user WHERE id=?";
  db.query(sqlRemove, id, (error, result) => {
    if (error) console.log(error);
  });
});

// details
app.get("/api/get/:id", (req, res) => {
  const { id } = req.params;
  const sqlGet = "SELECT * FROM user WHERE id=?";
  db.query(sqlGet, id, (error, result) => {
    if (error) {
      console.log(error);
    }
    res.send(result);
  });
});

// update data
app.put("/api/update/:id", (req, res) => {
  const { id } = req.params;
  const {
    name,
    intakecalorie,
    targetincalorie,
    burncalorie,
    targetburncalorie,
  } = req.body;
  const sqlUpdate =
    "UPDATE user SET name=?, intakecalorie=?, targetincalorie=?, burncalorie=?, targetburncalorie=? WHERE id= ?";
  db.query(
    sqlUpdate,
    [name, intakecalorie, targetincalorie, burncalorie, targetburncalorie, id],
    (error, result) => {
      if (error) {
        console.log(error);
      }
      res.send(result);
    }
  );
});

// get food item
app.get("/fooditem/get", (req, res) => {
  const sqlGet = "SELECT * FROM fooditem";
  db.query(sqlGet, (error, result) => {
    // console.log(result);
    res.send(result);
  });
});

// get energy burn
app.get("/energyburn/get", (req, res) => {
  const sqlGet = "SELECT * FROM exercise";
  db.query(sqlGet, (error, result) => {
    // console.log(result);
    res.send(result);
  });
});

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
