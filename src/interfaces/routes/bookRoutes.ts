import express from "express";
import { BookController } from "../controllers/BookController";
import { asyncHandler } from '../../utils/errorHandler';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Books
 *   description: Book management
 */

/**
 * @swagger
 * /api/books:
 *   get:
 *     summary: Get all books
 *     tags: [Books]
 *     responses:
 *       200:
 *         description: List of books
 */
router.get("/", asyncHandler(BookController.getAllBooks));

/**
 * @swagger
 * /api/books/{code}:
 *   get:
 *     summary: Get a book by code
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: code
 *         required: true
 *         description: Book code
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Book found
 *       404:
 *         description: Book not found
 */
router.get("/:code", asyncHandler(BookController.getBookByCode));

export default router;
