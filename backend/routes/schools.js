const express = require("express");
const router = express.Router();
const db = require("../models/db");
const multer = require("multer");
const path = require("path");
const fs = require("fs"); // 1. We need the 'fs' module to manually write files

// --- UPDATED Multer Config ---
// Use memoryStorage to hold the file in a buffer temporarily
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Ensure the destination directory exists
const uploadDir = path.join(__dirname, "../uploads/school-Img");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// --- No changes needed for GET route ---
router.get("/", (req, res) => {
  db.query("SELECT * FROM schools", (err, results) => {
    if (err) {
      console.error("Error fetching schools:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json(results);
  });
});

// --- COMPLETELY REVISED 'POST' ROUTE LOGIC ---
router.post("/", upload.single("image"), (req, res) => {
  // We get the file from req.file, but it's in memory, not on disk yet
  const { name, address, city, state, contact, email_id } = req.body;

  // First, check for duplicates before doing anything with the file
  // Making the check case-insensitive and trimming whitespace for robustness
  const checkSql =
    "SELECT * FROM schools WHERE LOWER(TRIM(name)) = LOWER(TRIM(?))";
  db.query(checkSql, [name], (err, results) => {
    if (err) {
      console.error("Error checking for duplicate school:", err);
      return res.status(500).json({ error: "Database error during check" });
    }

    if (results.length > 0) {
      // Duplicate found. We stop here. The file is never saved.
      return res
        .status(409)
        .json({ error: "School with this name already exists" });
    }

    // --- If we reach here, the school is unique ---

    // Check if a file was uploaded
    if (!req.file) {
      return res.status(400).json({ error: "Image file is required." });
    }

    // Create a unique filename. The file data is in req.file.buffer
    const filename = Date.now() + "-" + req.file.originalname;
    const filepath = path.join(uploadDir, filename);

    // Now, insert into the database
    const insertSql =
      "INSERT INTO schools (name, address, city, state, contact, image, email_id) VALUES (?, ?, ?, ?, ?, ?, ?)";
    db.query(
      insertSql,
      [name, address, city, state, contact, filename, email_id], // Save the new filename
      (err, result) => {
        if (err) {
          console.error("Error inserting school:", err);
          return res
            .status(500)
            .json({ error: "Database error during insert" });
        }

        // --- Database insert was successful, NOW we write the file ---
        fs.writeFile(filepath, req.file.buffer, (writeErr) => {
          if (writeErr) {
            console.error("Error saving image file:", writeErr);
            // In a real app, you might want to delete the DB record here
            return res
              .status(500)
              .json({ error: "Failed to save image file." });
          }

          // Everything was successful!
          res.status(201).json({
            message: "School added successfully",
            id: result.insertId,
          });
        });
      }
    );
  });
});

// --- No changes needed for DELETE route ---
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM schools WHERE id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error("Error deleting school:", err);
      return res.status(500).json({ error: "Database error" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "School not found" });
    }
    res.json({ message: "School deleted successfully" });
  });
});

module.exports = router;
