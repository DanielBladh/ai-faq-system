const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { uploadFile } = require("../services/fileUploadService");

const router = express.Router();

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Configure multer for file upload
const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(
        null,
        file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
      );
    },
  }),
  fileFilter: (req, file, cb) => {
    // Allow specific file types
    const allowedTypes = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Unsupported file type"), false);
    }
  },
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB file size limit
  },
});

// Upload route
router.post("/", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res
        .status(400)
        .json({ error: "No file uploaded or unsupported file type" });
    }

    // Log file details for debugging
    console.log("Uploaded file details:", {
      originalname: req.file.originalname,
      mimetype: req.file.mimetype,
      size: req.file.size,
      path: req.file.path,
    });

    // Upload to Supabase
    const supabaseUploadResult = await uploadFile(req.file);

    res.json({
      message: "File uploaded successfully",
      filename: req.file.filename,
      originalName: req.file.originalname,
      supabaseUpload: supabaseUploadResult,
    });
  } catch (error) {
    console.error("Full upload error:", error);
    res.status(500).json({
      error: "File upload failed",
      details: error.message,
      fullError: error,
    });
  }
});

// Get uploaded files route
router.get("/", async (req, res) => {
  try {
    const files = await getUploadedFiles();
    res.json(files);
  } catch (error) {
    console.error("Error fetching files:", error);
    res.status(500).json({
      error: "Failed to fetch files",
      details: error.message,
    });
  }
});

module.exports = router;
