import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
    },

    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },

    isFree: {
      type: Boolean,
      default: function () {
        return this.price === 0;
      },
    },

    category: {
      type: String,
      required: true,
      enum: ["Frontend", "Backend", "Full Stack", "DevOps", "Design"],
      index: true,
    },

    image: {
      type: String,
      required: true,
    },

    slug: {
      type: String,
      unique: true,
      index: true,
    },

    published: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

/* 🔍 Auto-generate slug */
bookSchema.pre("save", function (next) {
  if (!this.isModified("name")) return next();

  this.slug = this.name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  next();
});

/* 🔎 Text search support */
bookSchema.index({
  name: "text",
  title: "text",
  category: "text",
});

const Book = mongoose.model("Book", bookSchema);
export default Book;
