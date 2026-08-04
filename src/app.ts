import express, { Request, Response } from "express";

export const app = express();

app.use(express.json());

export function add(a: number, b: number): number {
  return a + b;
}

export function subtract(a: number, b: number): number {
  return a - b;
}

export function multiply(a: number, b: number): number {
  return a * b;
}

app.get("/add", (req: Request, res: Response) => {
    const { a, b } = req.query;
    res.json({ result: add(Number(a), Number(b)) });
});

app.get("/subtract", (req: Request, res: Response) => {
    const { a, b } = req.query;
    res.json({ result: subtract(Number(a), Number(b)) });
});

app.get("/multiply", (req: Request, res: Response) => {
    const { a, b } = req.query;
    res.json({ result: multiply(Number(a), Number(b)) });
});

app.get("/health", (req: Request, res: Response) => {
    res.json({
        status: "healthy",
        version: "1.0.0",
    });
});

app.get("/ping", (req: Request, res: Response) => {
    res.json({
        message: "pong",
        timestamp: new Date().toISOString(),
    });
});

export function divide(a: number, b: number): number | null {
  if (b === 0) {
    return null;
  }
  return a / b;
}

app.get("/divide", (req: Request, res: Response) => {
    const { a, b } = req.query;
    const result = divide(Number(a), Number(b));

    if (result === null) {
        res.status(400).json({ error: "division by zero" });
        return;
    }

    res.json({ operation: "divide", a: Number(a), b: Number(b), result });
});