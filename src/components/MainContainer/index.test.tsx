import React from "react";
import { render, screen } from "@testing-library/react";
import { MainContainer } from ".";

test("renders with content", () => {
  render(
    <MainContainer title="Dummy title">
      <div>Dummy content</div>
    </MainContainer>
  );

  expect(
    screen.getByRole("heading", { name: /dummy title/i })
  ).toBeInTheDocument();
  expect(screen.getByText(/dummy content/i)).toBeInTheDocument();
});

test("renders with header actions", () => {
  render(
    <MainContainer
      title="Dummy title"
      actions={<button>Dummy button</button>}
    ></MainContainer>
  );

  expect(
    screen.getByRole("button", { name: /dummy button/i })
  ).toBeInTheDocument();
});
