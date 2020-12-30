import { API_URL } from "@config/services";
import { rest } from "msw";
import { categories } from "./data/categories";
import { lessons } from "./data/lessons";

export const handlers = [
  rest.get(`${API_URL}/session`, (_req, res, ctx) => {
    return res(ctx.json({ user: null }));
  }),

  rest.get(`${API_URL}/categories`, (_req, res, ctx) => {
    return res(ctx.json(categories));
  }),

  rest.get(`${API_URL}/lessons`, (_req, res, ctx) => {
    // const query = req.url.searchParams;
    // const categoryId = query.get("categoryId")
    // const take = query.get("take")
    return res(ctx.json(lessons));
  }),
];
