import { describe, expect, it } from "vitest";

import { Checkbox } from "../Checkbox";
import { renderComponent } from "../../___test___/utils";

describe("Checkbox", () => {
  it("체크되지 않은 상태에서 투명 배경을 유지한다", () => {
    const { container } = renderComponent(<Checkbox label="수신 동의" />);

    const indicator = container.querySelector('[role="checkbox"]');
    expect(indicator).toHaveClass("bg-transparent");
    const icon = indicator?.querySelector("svg");
    expect(icon).toHaveClass("fill-primary");
  });

  it("checked=true일 때 대비되는 아이콘 색상을 적용한다", () => {
    const { container } = renderComponent(<Checkbox label="완료" checked />);

    const indicator = container.querySelector('[role="checkbox"]');
    const icon = indicator?.querySelector("svg");
    expect(icon).toHaveClass("fill-white");
  });

  it("label Props를 전달해 텍스트 속성 변경이 가능하다", () => {
    const { getByText } = renderComponent(
      <Checkbox
        label="커스텀"
        labelProps={{ className: "text-success", weight: "bold", as: "span" }}
      />
    );

    const label = getByText("커스텀");
    expect(label).toHaveClass("text-success");
    expect(label).toHaveClass("font-bold");
    expect(label.tagName.toLowerCase()).toBe("span");
  });
});
