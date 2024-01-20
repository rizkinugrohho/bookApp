import express from "express";
import { Book } from "../models/bookModels.js";

const router = express.Router();

// List path untuk membuat Book Baru
router.post("/", async (request, response) => {
  try {
    if (
      !request.body.title ||
      !request.body.description ||
      !request.body.image_url ||
      !request.body.release_year ||
      !request.body.total_page
    ) {
      return response.status(400).send({
        message:
          "Send all required fields: title, description, image_url, release_year, total_page",
      });
    }
    const newBook = {
      title: request.body.title,
      description: request.body.description,
      image_url: request.body.image_url,
      release_year: request.body.release_year,
      total_page: request.body.total_page,
    };
    const book = await Book.create(newBook);

    return response.status(201).send(book);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// List path untuk Menampilkan Semua Book
router.get("/", async (request, response) => {
  try {
    const books = await Book.find({});

    return response.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// List path untuk Menampilkan Book berdasarkan id
router.get("/:id", async (request, response) => {
  try {
    const { id } = request.params;

    const book = await Book.findById(id);

    return response.status(200).json(book);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// List pat untuk update book berdasarkan Id
router.patch("/:id", async (request, response) => {
  try {
    if (
      !request.body.title ||
      !request.body.description ||
      !request.body.image_url ||
      !request.body.release_year ||
      !request.body.total_page
    ) {
      return response.status(400).send({
        message:
          "Send all required fields: title, description, image_url, release_year, total_page",
      });
    }

    const { id } = request.params;
    const result = await Book.findByIdAndUpdate(id, request.body);

    if (!result) {
      return response.status(404).json({ message: "Book not found" });
    }
    return response.status(200).send({ message: "Book updated successfully" });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// List Path untuk menghapus data book
router.delete("/:id", async (request, response) => {
  try {
    const { id } = request.params;

    const result = await Book.findByIdAndDelete(id);

    if (result) {
      return response.status(404).json({ message: "Book not found" });
    }
    return response.status(200).send({ message: "Book Deleted successfully" });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

export default router;
