import { screen } from "@testing-library/react";
import React from "react";
import { RouteObject } from "react-router-dom";
import { vi, expect, it, describe, beforeEach } from "vitest";

import { pageRoutes } from "@/apiRoutes";
import EmptyNotice from "@/pages/cart/components/EmptyNotice";
import render from "@/utils/test-setup/render";

const mockedNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual<RouteObject>("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockedNavigate,
  };
});

describe("EmptyNotice 컴포넌트는 장바구니가 비었을 때 사용자에게 홈 이동을 안내한다", () => {
  beforeEach(() => {
    mockedNavigate.mockReset();
  });

  it("빈 장바구니 안내 문구와 홈으로 가기 링크를 렌더링한다", async () => {
    await render(<EmptyNotice />);

    expect(screen.getByText("텅~")).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "홈으로 가기" })
    ).toBeInTheDocument();
  });

  it("홈으로 가기 링크 클릭 시 메인 페이지 경로로 navigate를 호출한다", async () => {
    const { user } = await render(<EmptyNotice />);

    await user.click(screen.getByRole("link", { name: "홈으로 가기" }));

    expect(mockedNavigate).toHaveBeenCalledTimes(1);
    expect(mockedNavigate).toHaveBeenCalledWith(pageRoutes.main);
  });
});
