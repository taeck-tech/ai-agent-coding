import { http, HttpResponse, type HttpHandler } from "msw";

import response from "@/__mocks__/response";
import { apiRoutes } from "@/apiRoutes";

const API_DOMAIN = "http://localhost:3000";

type Json = null | boolean | number | string | Json[] | { [key: string]: Json };

export const handlers: HttpHandler[] = [
  ...[
    apiRoutes.profile,
    apiRoutes.users,
    apiRoutes.product,
    apiRoutes.categories,
    apiRoutes.couponList,
  ].map(
    (path) =>
      http.get(`${API_DOMAIN}${path}`, () => {
        return HttpResponse.json(response[path] as Json, { status: 200 });
      }) as HttpHandler
  ),
  http.get(`${API_DOMAIN}${apiRoutes.products}`, ({ request }) => {
    const data = response[apiRoutes.products] as {
      products: unknown[];
    };
    const url = new URL(request.url);
    const offset = Number(url.searchParams.get("offset"));
    const limit = Number(url.searchParams.get("limit"));
    const products = (data.products as unknown[]).filter(
      (_: unknown, index: number) => index >= offset && index < offset + limit
    );

    return HttpResponse.json(
      { products, lastPage: data.products.length <= offset + limit },
      { status: 200 }
    );
  }),
  http.post(`${API_DOMAIN}${apiRoutes.users}`, async ({ request }) => {
    const body = (await request.json()) as { name?: unknown } | undefined;
    if (typeof body?.name === "string" && body.name === "FAIL") {
      return new HttpResponse(null, { status: 500 });
    }

    return new HttpResponse(null, { status: 200 });
  }),
  http.post(`${API_DOMAIN}${apiRoutes.login}`, async ({ request }) => {
    const body = (await request.json()) as { email?: unknown } | undefined;
    if (typeof body?.email === "string" && body.email === "FAIL@gmail.com") {
      return new HttpResponse(null, { status: 401 });
    }

    return HttpResponse.json(
      {
        access_token: "access_token",
      },
      { status: 200 }
    );
  }),
  http.post(`${API_DOMAIN}${apiRoutes.log}`, () => {
    return new HttpResponse(null, { status: 200 });
  }),
];
