const express = require("express")
const mongoose = require("mongoose")

const app = express()
const port = 3000

// Create a new mongoose connection

mongoose
  .connect(
    "mongodb+srv://madlanimm:mamta123@cluster0.hehntur.mongodb.net/Item",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .catch((err) => console.log(err))

const data = mongoose.model("items", {
  name: String,
  qty: String,
})

app.use(express.json())

app.get("/items", async (req, res) => {
  try {
    // filters here
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 5
    const sortField = req.query.sort || "name"
    const sortOrder = req.query.sortOrder || "desc" ? -1 : 1

    const skip = (page - 1) * limit

    const items = await data
      .find()
      .sort({ [sortField]: sortOrder })
      .skip(skip)
      .limit(limit)

    console.log(items)
    res.json(items)
  } catch (error) {
    // throw new Error('Item not found')
    res.status(500).json({ error: "Internal Server Error" })
  }
})

app.listen(port, () => {
  console.log("listening on port " + port)
})
