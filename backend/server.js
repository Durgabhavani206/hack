import express from "express";
import cors from "cors";
import { MongoClient } from "mongodb";

const app = express();
app.use(cors());
app.use(express.json());

const url =
  "mongodb+srv://Durgabhavani:Satyavathi2006@cluster0.eywvius.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const dbName = "loan";

const client = new MongoClient(url);
let db;

// Connect once when server starts
async function connectDB() {
  try {
    await client.connect();
    db = client.db(dbName);
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection error:", err);
  }
}
connectDB();

const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// Test Route
app.get("/", async (req, res) => {
  res.status(200).json("Hello World from Express JS");
});

// SIGNUP
app.post("/signup", async (req, res) => {
  try {
    const existingUser = await db.collection("users").findOne({
      email: req.body.email,
    });

    if (existingUser) {
      return res
        .status(200)
        .json({ success: false, message: "Email ID already exists" });
    }

    await db.collection("users").insertOne(req.body);

    res
      .status(200)
      .json({ success: true, message: "Registered Successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

// LOGIN
app.post("/login", async (req, res) => {
  try {
    const user = await db.collection("users").findOne({
      email: req.body.email,
      password: req.body.password,
    });

    if (!user) {
      return res
        .status(200)
        .json({ success: false, message: "Invalid Credentials!" });
    }

    res.status(200).json({
      success: true,
      user: {
        email: user.email,
        role: user.role,
        firstName: user.firstName,
        lastName: user.lastName,
      },
      message: "Login Successful",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});
