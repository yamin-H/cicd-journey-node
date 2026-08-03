import express, { Request, Response } from "express";

export const app = express();
app.use(express.json());

export function add(a: number, b: number): number {
  return a + b;
}

export function subtract(a: string, b: number): number {
  return a - b;
}

app.get("/add", (req: Request, res: Response) => {
    const { a, b } = req.query;
    res.json({ result: add(Number(a), Number(b)) });
});

app.get("/subtract", (req: Request, res: Response) => {
    const { a, b } = req.query;
    res.json({ result: subtract(Number(a), Number(b)) });
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});

console.log("hell")