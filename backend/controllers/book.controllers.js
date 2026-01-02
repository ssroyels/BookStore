import Book from "../model/book.model.js";

/* ===================== GET ALL BOOKS ===================== */
/* GET /book */
export const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find({ published: true }).sort({
      createdAt: -1,
    });

    res.status(200).json(books);
  } catch (err) {
    console.error("Get Books Error:", err);
    res.status(500).json({
      message: "Failed to fetch books",
    });
  }
};

/* ===================== GET SINGLE BOOK ===================== */
/* GET /book/:id OR /book/slug/:slug */
export const getBookById = async (req, res) => {
  try {
    const { id } = req.params;

    const book = await Book.findById(id);

    if (!book) {
      return res.status(404).json({
        message: "Book not found",
      });
    }

    res.status(200).json(book);
  } catch (err) {
    console.error("Get Book Error:", err);
    res.status(500).json({
      message: "Failed to fetch book",
    });
  }
};

/* ===================== SEARCH + FILTER ===================== */
/* GET /book/search */
export const searchBooks = async (req, res) => {
  try {
    const { q, category, free } = req.query;

    const filter = { published: true };

    if (category) {
      filter.category = category;
    }

    if (free === "true") {
      filter.price = 0;
    }

    let books;

    if (q) {
      books = await Book.find({
        ...filter,
        $text: { $search: q },
      });
    } else {
      books = await Book.find(filter);
    }
console.log(books)
    res.status(200).json(books);
  } catch (err) {
    console.error("Search Books Error:", err);
    res.status(500).json({
      message: "Search failed",
    });
  }
};

/* ===================== CREATE BOOK ===================== */
/* POST /book */
export const createBook = async (req, res) => {
  try {
    const { name, title, price, category, image } = req.body;

    if (!name || !title || price === undefined || !category || !image) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const book = await Book.create({
      name,
      title,
      price,
      category,
      image,
    });

    res.status(201).json({
      message: "Book created successfully",
      book,
    });
  } catch (err) {
    console.error("Create Book Error:", err);
    res.status(500).json({
      message: "Failed to create book",
    });
  }
};

/* ===================== UPDATE BOOK ===================== */
/* PUT /book/:id */
export const updateBook = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedBook = await Book.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedBook) {
      return res.status(404).json({
        message: "Book not found",
      });
    }

    res.status(200).json({
      message: "Book updated successfully",
      book: updatedBook,
    });
  } catch (err) {
    console.error("Update Book Error:", err);
    res.status(500).json({
      message: "Failed to update book",
    });
  }
};

/* ===================== DELETE BOOK ===================== */
/* DELETE /book/:id */
export const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedBook = await Book.findByIdAndDelete(id);

    if (!deletedBook) {
      return res.status(404).json({
        message: "Book not found",
      });
    }

    res.status(200).json({
      message: "Book deleted successfully",
    });
  } catch (err) {
    console.error("Delete Book Error:", err);
    res.status(500).json({
      message: "Failed to delete book",
    });
  }
};
