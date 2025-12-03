const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());
const members = [
  {
    id: 1,
    name: "John Doe",
    role: "Developer",
    skills: ["JavaScript", "React"],
    bio: "Frontend developer with 2+ years experience",
    location: "India",
    photo: "https://example.com/photo1.jpg"
  },
  {
    id: 2,
    name: "Jane Smith",
    role: "Designer",
    skills: ["UI/UX", "Figma"],
    bio: "Creative designer",
    location: "Delhi",
    photo: "https://example.com/photo2.jpg"
  }
];

// ✅ GET ALL MEMBERS
app.get("/members", (req, res) => {
  res.json(members);
});

// ✅ GET Member by ID — With Full Error Handling
app.get("/members/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const member = members.find((m) => m.id === id);

  if (!member) {
    return res.status(404).json({
      error: true,
      message: "Member not found",
    });
  }

  res.json(member);
});

// ✅ Global Server Error Handler
app.use((err, req, res, next) => {
  console.error("SERVER ERROR:", err);
  res.status(500).json({
    error: true,
    message: "Internal server error",
  });
});

const DATA_PATH = path.join(__dirname, "members.json");

function readMembers() {
  try {
    const raw = fs.readFileSync(DATA_PATH, "utf8");
    return JSON.parse(raw);
  } catch (err) {
    console.error("Error reading members.json:", err);
    return [];
  }
}

app.get("/members", (req, res) => {
  try {
    let members = readMembers();

    const { q, role, skill, location } = req.query;

    if (q) {
      const ql = q.toLowerCase();
      members = members.filter(
        (m) =>
          (m.name && m.name.toLowerCase().includes(ql)) ||
          (m.bio && m.bio.toLowerCase().includes(ql))
      );
    }

    if (role) {
      members = members.filter((m) => String(m.role).toLowerCase() === String(role).toLowerCase());
    }

    if (skill) {
      members = members.filter(
        (m) =>
          Array.isArray(m.skills) &&
          m.skills.some((s) => s.toLowerCase() === String(skill).toLowerCase())
      );
    }

    if (location) {
      members = members.filter(
        (m) => String(m.location).toLowerCase() === String(location).toLowerCase()
      );
    }

    res.json(members);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});
 
app.get("/members/:id", (req, res) => {
  try {
    const members = readMembers();
    const id = req.params.id;
    const member = members.find((m) => String(m.id) === String(id));

    if (!member) {
      return res.status(404).json({ error: "Member not found" });
    }

    res.json(member);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});
 
app.get("/health", (req, res) => res.json({ status: "ok" }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend listening on port ${PORT}`));
