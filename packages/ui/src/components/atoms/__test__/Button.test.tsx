import React from "react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { Button } from "../Button";
import { renderComponent } from "../../___test___/utils";

describe("Button", () => {
  it("기본 속성으로 버튼 요소를 렌더링한다", () => {
    const { getByRole } = renderComponent(<Button>확인</Button>);

    const button = getByRole("button", { name: "확인" });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute("type", "button");
    expect(button).toHaveAttribute("data-slot", "button");
    expect(button).toHaveClass("bg-primary");
    expect(button).toHaveClass("h-9");
  });

  it("variant, size, color 조합과 className을 병합한다", () => {
    const { getByRole } = renderComponent(
      <Button
        variant="outline"
        size="sm"
        color="danger"
        className="custom-class"
      >
        삭제
      </Button>
    );

    const button = getByRole("button", { name: "삭제" });
    expect(button).toHaveClass("custom-class");
    expect(button).toHaveClass("bg-transparent");
    expect(button).toHaveClass("border-danger");
    expect(button).toHaveClass("h-8");
  });

  it("onClick 핸들러를 호출한다", async () => {
    const handleClick = vi.fn();
    const { getByRole } = renderComponent(
      <Button onClick={handleClick}>클릭</Button>
    );
    const user = userEvent.setup();

    await user.click(getByRole("button", { name: "클릭" }));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
