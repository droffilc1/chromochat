import express from "express";
import cors from "cors";

const app = express();

app.use(cors());

app.get("/api/v1/users", (req, res) => {
  const users = [
    { id: 1, name: "John Doe" },
    { id: 2, name: "Jane Doe" },
  ];

  return res.status(200).json({ users });
});

// Server running
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Press CTRL + C to stop it!`);
})
