import express, { request, response } from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModels.js";
import booksRoute from "./routes/booksRoute.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import cors from "cors";

const app = express();

// Middleware untuk parsing request body
app.use(express.json());

// Middleware For Handling CORS POLICY
// Option 1
app.use(cors());

// Option 2
// app.use(
//   cors({
//     origin: "https://localhost:3000",
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["Content-Type"],
//   })
// );

app.get("/", (request, response) => {
  console.log(request);
  return response.status(234).send("welcome to MERN Stack Tutorial");
});

app.use("/books", booksRoute);
app.use("/categories", categoryRoutes);

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("App connected to database");
    app.listen(PORT, () => {
      console.log(`App listening to port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
