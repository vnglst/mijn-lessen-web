import { API_URL } from "@config/services";
import { http, HttpResponse } from "msw";
import { categories } from "./data/categories";
import { lessons } from "./data/lessons";

export const handlers = [
  http.get(`${API_URL}/session`, () => {
    return HttpResponse.json({ user: null });
  }),

  http.get(`${API_URL}/categories`, () => {
    return HttpResponse.json(categories);
  }),

  http.get(`${API_URL}/lessons`, () => {
    // const query = new URL(request.url).searchParams;
    // const categoryId = query.get("categoryId")
    // const take = query.get("take")
    return HttpResponse.json(lessons);
  }),
];
