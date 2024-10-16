import { cors } from "hono/cors";
import { todo } from "@/routers/todo";
import { auth } from "@/routers/auth";
import user from "@/routers/user";
import { jwt } from "hono/jwt";
import type { JwtVariables } from "hono/jwt";
import { logger } from "hono/logger";
import { requestId } from "hono/request-id";
import { apiReference } from "@scalar/hono-api-reference";
import { prettyJSON } from "hono/pretty-json";
import { OpenAPIHono } from "@hono/zod-openapi";

type Variables = JwtVariables;

const secretKey = process.env.JWT_SECRET!;

export const customLogger = (message: string, ...rest: string[]) => {
  console.log(message, ...rest);
};

export const app = new OpenAPIHono<{ Variables: Variables }>()
  .doc31("/doc", {
    openapi: "3.1.0",
    info: { title: "hono api", version: "1" },
  })
  .use("*", requestId())
  .use(logger())
  .use("*", cors())
  .use("/doc/*", prettyJSON())
  .use("/todo/*", async (c, next) => {
    customLogger(`Request Id: ${c.get("requestId")}`);
    await next();
  })
  .use(
    "/auth/*",
    jwt({
      secret: secretKey,
    })
  )
  .route("/auth", auth)
  .route("/todo", todo)
  .route("/user", user)
  .get(
    "/reference",
    apiReference({
      theme: "kepler",
      layout: "classic",
      defaultHttpClient: {
        targetKey: "javascript",
        clientKey: "fetch",
      },
      spec: {
        url: "/doc",
      },
    })
  )
  .notFound((c) => c.json({ msg: "Not Found", code: 404 }, 404))
  .onError((err, c) => {
    const errorMsg = err.message || "error happened";
    // if (err instanceof HTTPException) {
    //   // Get the custom response
    //   return err.getResponse();
    // }
    const response = {
      code: 500,
      data: null,
      msg: errorMsg,
    };
    return c.json(response, 500);
  });
