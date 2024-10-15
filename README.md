# A Monorepo Project Includes Hono & React & RPC & Open API

A starter template for building fully documented type-safe JSON APIs with Hono and Open API.

## Included

- Simple logging with [hono-logger](https://hono.dev/docs/middleware/builtin/logger)
- Documented / type-safe routes with [@hono/zod-openapi](https://github.com/honojs/middleware/tree/main/packages/zod-openapi)
- Interactive API documentation with [scalar](https://scalar.com/#api-docs) / [@scalar/hono-api-reference](https://github.com/scalar/scalar/tree/main/packages/hono-api-reference)
- Type-safe schemas and environment variables with [zod](https://zod.dev/)
- Testing with [vitest](https://vitest.dev/)

## Setup

Clone this template without git history

```sh
git clone my-project
cd my-project
```

Create `.env` file

```sh
cp .env.example .env
```

Install dependencies

```sh
pnpm install
```

Run

```sh
pnpm dev
```

Test

```sh
pnpm test
```
  
## Endpoints

| Path              | Description              |
| ----------------- | ------------------------ |
| GET /doc          | Open API Specification   |
| GET /reference    | Scalar API Documentation |
| GET /todo         | List all tasks           |
| POST /todo        | Create a task            |
| GET /todo/{id}    | Get one task by id       |
| PATCH /todo/{id}  | Patch one task by id     |
| DELETE /todo/{id} | Delete one task by id    |
| ...               | ...                      |

## References

- [What is Open API?](https://swagger.io/docs/specification/v3_0/about/)
- [Hono](https://hono.dev/)
  - [Zod OpenAPI Example](https://hono.dev/examples/zod-openapi)
  - [Testing](https://hono.dev/docs/guides/testing)
  - [Testing Helper](https://hono.dev/docs/helpers/testing)
- [@hono/zod-openapi](https://github.com/honojs/middleware/tree/main/packages/zod-openapi)
- [Scalar Documentation](https://github.com/scalar/scalar/tree/main/?tab=readme-ov-file#documentation)
  - [Themes / Layout](https://github.com/scalar/scalar/blob/main/documentation/themes.md)
  - [Configuration](https://github.com/scalar/scalar/blob/main/documentation/configuration.md)

## Thanks

[hono-open-api-starter](https://github.com/w3cj/hono-open-api-starter)
[react-temp-admin](https://github.com/iamzwq/react-temp-admin)
