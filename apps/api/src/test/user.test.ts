import { OpenAPIHono, RouteHandler, createRoute, z } from "@hono/zod-openapi";
import { describe, it } from "vitest";

describe("supports async handler", () => {
  const route = createRoute({
    method: "get",
    path: "/users",
    responses: {
      200: {
        content: {
          "application/json": {
            schema: z.object({
              id: z.string(),
            }),
          },
        },
        description: "Retrieve the user",
      },
    },
  });

  it("argument of openapi method", () => {
    const hono = new OpenAPIHono();

    hono.openapi(route, (c) => {
      return c.json({
        id: "123",
      });
    });

    hono.openapi(route, async (c) => {
      return c.json({
        id: "123",
      });
    });
  });

  it("RouteHandler type", () => {
    const handler: RouteHandler<typeof route> = (c) => {
      return c.json({
        id: "123",
      });
    };

    const asyncHandler: RouteHandler<typeof route> = async (c) => {
      return c.json({
        id: "123",
      });
    };

    const hono = new OpenAPIHono();
    hono.openapi(route, handler);
    hono.openapi(route, asyncHandler);
  });
});
