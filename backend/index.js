import express, { request, response } from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModels.js";

const app = express();

//Middleware untuk parsing request body
app.use(express.json());

app.get("/", (request, response) => {
  console.log(request);
  return response.status(234).send("welcome to MERN Stack Tutorial");
});

//Route untuk Save Buku Baru
app.post("/books", async (request, response) => {
  try {
    if (
      !request.body.title ||
      !request.body.description ||
      !request.body.image ||
      !request.body.release_year ||
      !request.body.total_page ||
      !request.body.created_at ||
      !request.body.update_at
    ) {
      return response.status(400).send({
        message:
          "Send all required fields: title, description, image, releaseYeat, total_page, created_at, updated_at",
      });
    }
    const newBook = {
      title: request.body.title,
      description: request.body.description,
      image_url: request.body.image,
      release_year: request.body.release_year,
      total_page: request.body.total_page,
      created_at: request.body.created_at,
      update_at: request.body.update_at,
    };
    const book = await Book.create(newBook);

    return response.status(201).send(book);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("App connected to database");
    app.listen(PORT, () => {
      console.log(`App listening to port: ${PORT}`);
    });
  })
  .catch(() => {
    console.log(error);
  });
