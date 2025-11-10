import { describe, expect, it } from "vitest";

import { Radio } from "../Radio";
import { renderComponent } from "../../___test___/utils";

describe("Radio", () => {
  it("label과 함께 렌더링되고 기본 색상을 가진다", () => {
    const { getByText, container } = renderComponent(
      <Radio label="옵션" name="option" />
    );

    expect(getByText("옵션")).toBeInTheDocument();
    const indicator = container.querySelector('[role="checkbox"]');
    expect(indicator).toHaveClass("border-primary");
    const input = container.querySelector('input[type="radio"]');
    expect(input).toHaveAttribute("name", "option");
  });

  it("checked=true일 때 내부 점을 표시한다", () => {
    const { container } = renderComponent(<Radio checked label="선택됨" />);

    const indicator = container.querySelector('[role="checkbox"]');
    expect(indicator?.querySelector("div")).toHaveClass("bg-red");
  });

  it("color 속성에 따라 클래스가 변경된다", () => {
    const { container } = renderComponent(
      <Radio color="danger" label="위험" />
    );

    const indicator = container.querySelector('[role="checkbox"]');
    expect(indicator).toHaveClass("border-danger");
  });
});
