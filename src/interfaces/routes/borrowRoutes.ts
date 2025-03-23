import express from "express";
import { BorrowingController } from "../controllers/BorrowingController";
import { asyncHandler } from '../../utils/errorHandler';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Borrowing
 *   description: Manage book borrowing and returning
 */

/**
 * @swagger
 * /api/borrow:
 *   post:
 *     summary: Borrow a book
 *     tags: [Borrowing]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               memberCode:
 *                 type: string
 *               bookCode:
 *                 type: string
 *     responses:
 *       200:
 *         description: Book borrowed successfully
 *       400:
 *         description: Error in borrowing
 */
router.post("/", asyncHandler(BorrowingController.borrowBook));

/**
 * @swagger
 * /api/borrow/return:
 *   post:
 *     summary: Return a borrowed book
 *     tags: [Borrowing]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               memberCode:
 *                 type: string
 *               bookCode:
 *                 type: string
 *     responses:
 *       200:
 *         description: Book returned successfully
 *       400:
 *         description: Error in returning
 */
router.post("/return", asyncHandler(BorrowingController.returnBook));

export default router;
