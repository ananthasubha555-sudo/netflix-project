const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

/**
 * ✅ CORS configuration
 * - Allows local development
 * - Allows Vercel deployed frontend
 */
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "https://netflix-website1-seven.vercel.app",
    ],
    methods: ["GET", "POST"],
  })
);

app.use(express.json());

// ✅ Mock User
const MOCK_USER = {
  email: "test@netflix.com",
  password: "password123",
  name: "Mock User",
};

// ✅ Login API
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Email and password required" });
  }

  if (email === MOCK_USER.email && password === MOCK_USER.password) {
    return res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        name: MOCK_USER.name,
        email: MOCK_USER.email,
      },
    });
  }

  return res.status(401).json({
    success: false,
    message: "Invalid Email or Password",
  });
});

// ✅ Health Check
app.get("/", (req, res) => {
  res.send("✅ Backend running successfully");
});

// ✅ Start Server
app.listen(PORT, () => {
  console.log(`✅ Server listening on port ${PORT}`);
});
