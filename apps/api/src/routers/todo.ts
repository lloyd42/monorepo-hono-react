import { Context, Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { HTTPException } from "hono/http-exception";

const IdSchema = z.object({
  id: z.number(),
});

const FormSchema = z.object({
  title: z.string(),
});

export const todo = new Hono()
  .get("/", (c) => c.json({ code: 200, msg: "list todo" }))
  .post("/", zValidator("form", FormSchema), (c) => {
    const todo = c.req.valid("form");
    return c.json({
      code: 200,
      msg: `${todo.title} created!`,
    });
  })
  .get(
    "/:id",
    zValidator("param", IdSchema, (result, c: Context) => {
      if (!result.success) {
        const errMsg = result.error.issues
          .map((e: any) => `field:${e.path[0]} - ${e.message}`)
          .join(", ");
        c.set("errMsg", errMsg);
        c.set("errCode", 500);
        throw new HTTPException(400, { message: errMsg });
      }
    }),
    async (c) => {
      const { id } = c.req.valid("param");
      c.json({ code: 200, msg: `get todo ${id}` });
    }
  )
  .patch("/:id", (c) =>
    c.json({ code: 200, msg: `update todo ${c.req.param("id")}` })
  )
  .delete("/:id", (c) =>
    c.json({ code: 200, msg: `del todo ${c.req.param("id")}` })
  );
