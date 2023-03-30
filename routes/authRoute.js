const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/AuthController");


router.get("/", BooksController.index);
router.get("/:id", BooksController.showBook);
router.post("/", BooksController.store);
router.put("/:id", BooksController.edit);
router.delete("/:id", BooksController.delete);



module.exports = router;