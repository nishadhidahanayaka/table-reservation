const Category = require("../models/MenuCategory");
const multer = require("multer");
const path = require("path");

// Storage for uploaded images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/menu-images");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

const addCategory = [
  upload.single("image"),
  async (req, res) => {
    try {
      const { name } = req.body;

      if (!name || !req.file) {
        return res.status(400).json({ error: "Name and image are required" });
      }

      const imagePath = "/menu-images/" + req.file.filename;

      const newCategory = new Category({
        name,
        image: imagePath,
      });

      const saved = await newCategory.save();
      res.status(201).json(saved);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Something went wrong" });
    }
  },
];

const deleteCategory = async (req, res) => {
  try {
    await Category.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete category" });
  }
};

const updateCategory = [
  upload.single("image"),
  async (req, res) => {
    try {
      const { name } = req.body;
      const category = await Category.findById(req.params.id);

      if (!category) {
        return res.status(404).json({ error: "Category not found" });
      }

      category.name = name || category.name;

      if (req.file) {
        category.image = "/menu-images/" + req.file.filename;
      }

      const updated = await category.save();
      res.status(200).json(updated);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to update category" });
    }
  },
];


module.exports = {
  getCategories,
  addCategory,
  deleteCategory,
  updateCategory,
};


