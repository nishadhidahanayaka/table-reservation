const express = require("express");
const {
  createTable,
  updateTable,
  deleteTable,
  getTable,
  getTables
} = require("../controllers/table");
const router = express.Router();

router.post("/", createTable);
router.put("/:id", updateTable);
router.delete("/:id", deleteTable);
router.get("/:id", getTable);
router.get("/", getTables);

module.exports = router;
