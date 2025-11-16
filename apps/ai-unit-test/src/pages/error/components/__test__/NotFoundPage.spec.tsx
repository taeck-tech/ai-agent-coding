import { screen } from "@testing-library/react";
import React from "react";
import { RouteObject } from "react-router-dom";
import { vi, expect, it } from "vitest";

import { pageRoutes } from "@/apiRoutes";
import NotFoundPage from "@/pages/error/components/NotFoundPage";
import render from "@/utils/test-setup/render";

const mockedNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual<RouteObject>("react-router-dom");
  return { ...actual, useNavigate: () => mockedNavigate };
});

it("Home으로 이동 버튼 클릭시 홈 경로로 이동하는 navigate 함수가 호출된다", async () => {
  const { user } = await render(<NotFoundPage />);
  const button = await screen.getByRole("button", { name: "Home으로 이동" });

  await user.click(button);
  expect(mockedNavigate).toHaveBeenNthCalledWith(1, pageRoutes.main, {
    replace: true,
  });
});
