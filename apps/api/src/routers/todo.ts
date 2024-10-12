import { Context, Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { HTTPException } from "hono/http-exception";

const schema = z.object({
  id: z.number(),
});

export const todo = new Hono()
  .get("/", (c) => c.json({ msg: "list todo", code: 200 }))
  .post("/", (c) => c.json("create a todo", 201))
  .get(
    "/:id",
    zValidator("param", schema, (result, c: Context) => {
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
      c.json(`get todo ${id}`);
    }
  )
  .patch("/:id", (c) => c.json(`update todo ${c.req.param("id")}`))
  .delete("/:id", (c) => c.json(`del todo ${c.req.param("id")}`));
