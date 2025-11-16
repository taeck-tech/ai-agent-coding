import { screen } from "@testing-library/react";
import React from "react";
import { RouteObject } from "react-router-dom";
import { vi, expect, it, describe, beforeEach } from "vitest";

import ErrorPage from "@/pages/error/components/ErrorPage";
import render from "@/utils/test-setup/render";

const mockedNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual<RouteObject>("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockedNavigate,
  };
});

describe("ErrorPage 컴포넌트는 예기치 못한 오류 발생 시 사용자에게 이전 페이지로 돌아가도록 안내한다", () => {
  beforeEach(() => {
    mockedNavigate.mockReset();
  });

  it("오류 안내 제목과 메시지, 뒤로 이동 버튼을 렌더링한다", async () => {
    await render(<ErrorPage />);

    expect(
      screen.getByRole("heading", { level: 1, name: "읔!" })
    ).toBeInTheDocument();
    expect(
      screen.getByText("예상치 못한 에러가 발생했습니다.")
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "뒤로 이동" })
    ).toBeInTheDocument();
  });

  it("뒤로 이동 버튼 클릭 시 navigate를 -1 인자로 호출한다", async () => {
    const { user } = await render(<ErrorPage />);

    await user.click(screen.getByRole("button", { name: "뒤로 이동" }));

    expect(mockedNavigate).toHaveBeenCalledTimes(1);
    expect(mockedNavigate).toHaveBeenCalledWith(-1);
  });
});
