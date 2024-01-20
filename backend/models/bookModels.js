import mongoose from "mongoose";

const bookSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: [true, "Please enter the book description"],
    },
    image_url: {
      type: String,
      required: true,
    },
    release_year: {
      type: Number,
      required: true,
    },
    total_page: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
export const Book = mongoose.model("Book", bookSchema);
