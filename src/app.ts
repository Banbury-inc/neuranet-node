
import express, { Request, Response } from 'express';

const app = express();

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
app.get('/greet', (req: Request, res: Response) => {
  const { name } = req.query;
  res.json({ message: `Hello, ${name}!` });
});

export default app;
