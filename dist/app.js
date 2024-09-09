"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
/**
 * @openapi
 * /greet:
 *   get:
 *     summary: Returns a greeting message
 *     description: This endpoint returns a greeting message for a given name.
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         required: true
 *         description: The name of the person to greet
 *     responses:
 *       200:
 *         description: A greeting message
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Hello, John!"
 */
app.get('/greet', (req, res) => {
    const { name } = req.query;
    res.json({ message: `Hello, ${name}!` });
});
exports.default = app;
