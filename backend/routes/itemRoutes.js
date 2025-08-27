const express = require("express");
const router = express.Router();
const { getItems, addItems, deleteItem, updateItem } = require("../controllers/itemController");

router.get("/", getItems);
router.post("/", addItems);
router.put("/:id", updateItem);
router.delete("/:id", deleteItem);

module.exports = router;
