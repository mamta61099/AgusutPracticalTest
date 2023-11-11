const express = require("express")
const path = require("path")
const multer = require("multer")

const app = express()
const port = 3000

// Set Foldre Name
const uploadFolder = "uploads"

// Multer Configration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadFolder)
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    )
  },
})

const upload = multer({
  storage: storage,
})

// Render HTML form
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html")
})

// create api for upload file

app.post("/upload", upload.single("file"), (req, res) => {
  res.json("File Uploaded Successfully")
})

app.listen(port, () => {
  console.log("Server listening on port " + port)
})
