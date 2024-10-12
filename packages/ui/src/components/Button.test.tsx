import { test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Button from "./Button";
import React from "react";

test("Button should be rendered", () => {
  render(<Button>Hello</Button>);

  expect(screen.getByText(/Hello/)).toBeInTheDocument();
});
