import { screen } from "@testing-library/react";
import React from "react";
import { RouteObject } from "react-router-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { pageRoutes } from "@/apiRoutes";
import NotFoundPage from "@/pages/error/components/NotFoundPage";
import render from "@/utils/test-setup/render";

const mockedNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual<RouteObject>("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockedNavigate,
  };
});

describe("NotFoundPage 컴포넌트는 존재하지 않는 경로 접근 시 사용자를 홈으로 안내한다", () => {
  beforeEach(() => {
    mockedNavigate.mockReset();
  });

  it("404 제목과 오류 안내 문구, 홈 이동 버튼을 렌더링한다", async () => {
    await render(<NotFoundPage />);

    expect(
      screen.getByRole("heading", { level: 1, name: "404" })
    ).toBeInTheDocument();
    expect(
      screen.getByText("페이지 경로가 잘못 되었습니다!")
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Home으로 이동" })
    ).toBeInTheDocument();
  });

  it("홈 이동 버튼 클릭 시 메인 페이지로 navigate를 replace 옵션과 함께 호출한다", async () => {
    const { user } = await render(<NotFoundPage />);

    await user.click(screen.getByRole("button", { name: "Home으로 이동" }));

    expect(mockedNavigate).toHaveBeenCalledTimes(1);
    expect(mockedNavigate).toHaveBeenCalledWith(pageRoutes.main, {
      replace: true,
    });
  });
});
