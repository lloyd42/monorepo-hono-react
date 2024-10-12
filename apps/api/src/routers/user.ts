import { OpenAPIHono, createRoute, z } from "@hono/zod-openapi";

const ParamsSchema = z.object({
  id: z.string().openapi({
    param: {
      name: "id",
      in: "path",
    },
    example: "1",
  }),
});

const UserSchema = z
  .object({
    id: z.number().openapi({
      example: 1,
    }),
    name: z.string().openapi({
      example: "John Doe",
    }),
    age: z.number().openapi({
      example: 42,
    }),
  })
  .openapi("User");

const ErrorSchema = z.object({
  code: z.number().openapi({
    example: 400,
  }),
  msg: z.string().openapi({
    example: "Bad Request",
  }),
});

const route = createRoute({
  method: "get",
  path: "/:id",
  request: {
    params: ParamsSchema,
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: UserSchema,
        },
      },
      description: "Retrieve the user",
    },
    400: {
      content: {
        "application/json": {
          schema: ErrorSchema,
        },
      },
      description: "Returns an error",
    },
  },
  tags: ["User Module"],
  description: "User Api Description",
  summary: "User Api Summary",
});

const user = new OpenAPIHono({
  defaultHook: (result, c) => {
    if (!result.success) {
      return c.json(
        {
          code: 422,
          msg: "Validation Error",
        },
        422
      );
    }
  },
});

user.openapi(
  route,
  (c) => {
    const { id } = c.req.valid("param");
    return c.json(
      {
        id: Number(id),
        age: 20,
        name: "Ultra-man",
      },
      200 // You should specify the status code even if it is 200.
    );
  },
  (result, c) => {
    if (!result.success) {
      return c.json(
        {
          code: 400,
          msg: "Validation Error",
        },
        400
      );
    }
  }
);

export default user;
