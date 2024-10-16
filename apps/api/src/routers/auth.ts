import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { sign } from "hono/jwt";

const secretKey = process.env.JWT_SECRET!;

const schema = z.object({
  name: z.string(),
  id: z.number(),
  role: z.string(),
});

export const auth = new Hono()
  .post("/login", zValidator("form", schema), async (c) => {
    const user = c.req.valid("form");
    const payload = {
      sub: user.id,
      name: user.name,
      role: user.role,
      exp: Math.floor(Date.now() / 1000) + 60 * 5, // Token expires in 5 minutes
    };

    const token = await sign(payload, secretKey);
    c.json({ token });
  })
  .post("/logout", (c) => c.json("user logout"))
  .get("/me", (c) => {
    const payload = c.get("jwtPayload");
    return c.json(payload);
  });
