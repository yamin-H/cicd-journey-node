import request from "supertest";
import { app } from "../app";
import { add, subtract, multiply } from "../app";

describe("Math functions", () => {
    test("add returns correct sum", () => {
        expect(add(2, 3)).toBe(5);
    });

    test("add handles negative numbers", () => {
        expect(add(-1, -1)).toBe(-2);
    });

    test("add with zero", () => {
        expect(add(0, 5)).toBe(5);
    });

    test("subtract basic", () => {
        expect(subtract(10, 4)).toBe(6);
    });

    test("subtract gives negative", () => {
        expect(subtract(3, 10)).toBe(-7);
    });

    test("multiply basic", () => {
        expect(multiply(3, 4)).toBe(12);
    });

    test("multiply by zero", () => {
        expect(multiply(5, 0)).toBe(0);
    });
});

describe("API endpoints", () => {
    test("GET /add returns correct result", async () => {
        const response = await request(app).get("/add?a=3&b=4");
        expect(response.status).toBe(200);
        expect(response.body.result).toBe(7);
    });

    test("GET /subtract returns correct result", async () => {
        const response = await request(app).get("/subtract?a=10&b=3");
        expect(response.status).toBe(200);
        expect(response.body.result).toBe(7);
    });

    test("GET /multiply returns correct result", async () => {
        const response = await request(app).get("/multiply?a=3&b=4");
        expect(response.status).toBe(200);
        expect(response.body.result).toBe(12);
    });

    test("GET /health returns healthy status", async () => {
        const response = await request(app).get("/health");
        expect(response.status).toBe(200);
        expect(response.body.status).toBe("healthy");
    });

    test("GET /ping returns pong", async () => {
        const response = await request(app).get("/ping");
        expect(response.status).toBe(200);
        expect(response.body.message).toBe("pong");
    });
    test("GET /health includes uptime", async () => {
        const response = await request(app).get("/health");
        expect(response.status).toBe(200);
        expect(response.body.status).toBe("healthy");
        expect(typeof response.body.uptime).toBe("number");
    });
});

