import { describe, expect, it } from "vitest";

import { Input } from "../Input";
import { renderComponent } from "../../___test___/utils";

describe("Input", () => {
  it("기본 input 요소와 data-slot 속성을 렌더링한다", () => {
    const { getByPlaceholderText } = renderComponent(
      <Input placeholder="검색" />
    );

    const input = getByPlaceholderText("검색");
    expect(input).toHaveAttribute("data-slot", "input");
    expect(input).toHaveClass("placeholder:text-default-500");
  });

  it("메시지와 상태 스타일을 적용한다", () => {
    const { getByText, getByPlaceholderText } = renderComponent(
      <Input
        placeholder="이메일"
        useMessage
        message="올바르지 않은 주소"
        status="error"
      />
    );

    const wrapper = getByPlaceholderText("이메일").closest("label");
    expect(wrapper).toHaveClass("ring-danger-300");
    expect(getByText("올바르지 않은 주소")).toHaveClass("text-danger-300");
  });

  it("disabled 상태에서 wrapper 클래스가 병합된다", () => {
    const { getByPlaceholderText } = renderComponent(
      <Input placeholder="이름" disabled />
    );

    const wrapper = getByPlaceholderText("이름").closest("label");
    expect(wrapper).toHaveClass("opacity-50");
  });
});
