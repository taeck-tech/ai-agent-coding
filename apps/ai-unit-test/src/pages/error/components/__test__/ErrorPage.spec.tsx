import { screen } from "@testing-library/react";
import React from "react";
import { RouteObject } from "react-router-dom";
import { vi, expect, it } from "vitest";

import ErrorPage from "../ErrorPage";

import render from "@/utils/test-setup/render";

const mockedNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual<RouteObject>("react-router-dom");
  return { ...actual, useNavigate: () => mockedNavigate };
});

it('"뒤로 이동" 버튼 클릭시 뒤로 이동하는 navigate(-1) 함수가 호출된다', async () => {
  const { user } = await render(<ErrorPage />);
  const button = await screen.getByRole("button", { name: "뒤로 이동" });

  await user.click(button);
  expect(mockedNavigate).toHaveBeenNthCalledWith(1, -1);
});
