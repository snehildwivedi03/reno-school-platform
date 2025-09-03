const express = require("express");
const router = express.Router();
const db = require("../models/db"); // pool.promise()
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Multer memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Ensure upload directory exists
const uploadDir = path.join(__dirname, "../uploads/school-Img");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// GET all schools
router.get("/", async (req, res) => {
  try {
    const [results] = await db.query("SELECT * FROM schools");
    res.json(results);
  } catch (err) {
    console.error("Error fetching schools:", err);
    res.status(500).json({ error: "Database error" });
  }
});

// POST add a new school
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { name, address, city, state, contact, email_id } = req.body;

    // Duplicate check
    const checkSql =
      "SELECT * FROM schools WHERE LOWER(TRIM(name)) = LOWER(TRIM(?))";
    const [existing] = await db.query(checkSql, [name]);
    if (existing.length > 0) {
      return res
        .status(409)
        .json({ error: "School with this name already exists" });
    }

    if (!req.file) {
      return res.status(400).json({ error: "Image file is required." });
    }

    const filename = Date.now() + "-" + req.file.originalname;
    const filepath = path.join(uploadDir, filename);

    // Insert into DB
    const insertSql =
      "INSERT INTO schools (name, address, city, state, contact, image, email_id) VALUES (?, ?, ?, ?, ?, ?, ?)";
    const [result] = await db.query(insertSql, [
      name,
      address,
      city,
      state,
      contact,
      filename,
      email_id,
    ]);

    // Save file
    fs.writeFile(filepath, req.file.buffer, (writeErr) => {
      if (writeErr) {
        console.error("Error saving image file:", writeErr);
        return res.status(500).json({ error: "Failed to save image file." });
      }

      res.status(201).json({
        message: "School added successfully",
        id: result.insertId,
      });
    });
  } catch (err) {
    console.error("Error adding school:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// DELETE school
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await db.query("DELETE FROM schools WHERE id = ?", [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "School not found" });
    }
    res.json({ message: "School deleted successfully" });
  } catch (err) {
    console.error("Error deleting school:", err);
    res.status(500).json({ error: "Database error" });
  }
});

module.exports = router;
