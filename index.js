const express = require("express");
const { sequelize_connection } = require("./config/db");
const morgan = require("morgan");
const { schoolRoutes } = require("./routes/schools");
const multer = require("multer");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const app = express();

// Configuration
require("dotenv").config();
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());
app.use("/schoolImages", express.static(path.join(__dirname, "schoolImages")));

const PORT = process.env.PORT || 9001;

// Multer
const imageFolderPath = path.join(__dirname, "schoolImages");
if (!fs.existsSync(imageFolderPath)) {
  fs.mkdirSync(imageFolderPath);
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, imageFolderPath);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });
app.use("/", upload.single("picture"), schoolRoutes);

app.listen(PORT, async () => {
  try {
    await sequelize_connection.sync();
    console.log(`Connected to MySQL on Port ${PORT}`);
  } catch (error) {
    console.log(error.message);
  }
});
