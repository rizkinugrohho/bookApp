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
      validate: {
        validator: function (value) {
          const minYear = 1980;
          const maxYear = 2021;
          return value >= minYear && value <= maxYear;
        },
        message: (props) =>
          `${props.value} Pastikan berada antara 1980 sampai 2021`,
      },
    },
    price: {
      type: String,
      required: true,
    },
    total_page: {
      type: Number,
      required: true,
    },
    thickness: {
      type: String,
      validate: {
        validator: function () {
          if (this.total_page <= 100) {
            return this.thickness === "Tipis";
          } else if (this.total_page >= 101 && this.total_page <= 200) {
            return this.thickness === "Sedang";
          } else {
            return this.thickness === "Tebal";
          }
        },
      },
    },
  },
  {
    timestamps: true,
  }
);
export const Book = mongoose.model("Book", bookSchema);
