import { query } from "@repo/db/query";

import express from "express";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hi there");
});

app.post("/signup", async (req, res) => {
  const { username, password } = req.body;
  try {
    console.log(username);

    const findQuery = "SELECT * FROM users WHERE username= $1 ";
    const userExist = await query(findQuery, [username]);

    if (userExist.rowCount) {
      console.log("3");
      return res.status(401).json({
        message: "Username already exist",
      });
    }

    const uuid = crypto.randomUUID();
    const insertQuery =
      "INSERT INTO users (id,username,password) VALUES ($1,$2,$3) RETURNING username ";

    const newUser = await query(insertQuery, [uuid, username, password]);

    return res
      .status(200)
      .json({ message: "New user created", data: newUser.rows });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
});

app.get('/allUsers',async (req,res)=>{
  const userQuery = 'SELECT id,username FROM users'
  const allUsers = await query(userQuery,[])
  return res.status(200).json({allUsers:allUsers.rows})
})

app.listen(3001, () => {
  console.log("app is listening on 3001");
});
