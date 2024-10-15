import { Link, type RouteObject } from "react-router-dom";

export const exampleRoute: RouteObject = {
  path: "example",
  lazy: async () => ({
    Component: (await import("./index")).default,
  }),
  handle: {
    crumb: () => <Link to="/example">例子</Link>,
  },
};
