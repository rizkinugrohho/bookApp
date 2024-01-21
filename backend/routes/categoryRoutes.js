import express from "express";
import { Category } from "../models/categoryModels.js";

const router = express.Router();

// List path untuk Menampilkan Semua Category
router.get("/", async (request, response) => {
  try {
    const categories = await Category.find({});

    return response.status(200).json({
      count: categories.length,
      data: categories,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// List path untuk membuat Category Baru
router.post("/", async (request, response) => {
  try {
    if (!request.body.name) {
      return response.status(400).send({
        message:
          "Send all required fields: title, description, image_url, release_year, total_page",
      });
    }
    const newCategory = {
      name: request.body.name,
    };
    const category = await Category.create(newCategory);

    return response.status(201).send(category);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// List patch untuk update book berdasarkan Id
router.patch("/:id", async (request, response) => {
  try {
    if (!request.body.name) {
      return response.status(400).send({
        message:
          "Send all required fields: title, description, image_url, release_year, total_page",
      });
    }

    const { id } = request.params;
    const result = await Category.findByIdAndUpdate(id, request.body);

    if (!result) {
      return response.status(404).json({ message: "Category not found" });
    }
    return response
      .status(200)
      .send({ message: "Category updated successfully" });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// List Path untuk menghapus data book
router.delete("/:id", async (request, response) => {
  try {
    const { id } = request.params;

    const result = await Category.findByIdAndDelete(id);

    if (result) {
      return response.status(404).json({ message: "Category not found" });
    }
    return response
      .status(200)
      .send({ message: "Category Deleted successfully" });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// List path untuk Menampilkan Book berdasarkan id
router.get("/:id", async (request, response) => {
  try {
    const { id } = request.params;

    const category = await Category.findById(id);

    return response.status(200).json(category);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

export default router;
