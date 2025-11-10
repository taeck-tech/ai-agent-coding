import { ReactElement, cloneElement } from "react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { FilterSelector } from "../FilterSelector";
import { renderComponent } from "../../___test___/utils";

vi.mock("@radix-ui/react-popover", () => ({
  __esModule: true,
  Root: ({ children, ...props }: any) => (
    <div data-slot="popover-root" {...props}>
      {children}
    </div>
  ),
  Trigger: ({ asChild, children, className, ...props }: any) => {
    if (asChild && children && typeof children === "object") {
      return cloneElement(children as ReactElement, {
        ...props,
        className: [children.props.className, className]
          .filter(Boolean)
          .join(" "),
      });
    }
    return (
      <button data-slot="popover-trigger" className={className} {...props}>
        {children}
      </button>
    );
  },
  Content: ({ children, className }: any) => (
    <div data-slot="popover-content" className={className}>
      {children}
    </div>
  ),
  Portal: ({ children }: any) => <>{children}</>,
  Close: ({ children }: any) => <button>{children}</button>,
  Anchor: ({ children }: any) => <div>{children}</div>,
}));

describe("FilterSelector", () => {
  const options = [
    { label: "Apple", value: "apple" },
    { label: "Banana", value: "banana" },
  ];

  it("선택된 값이 있을 때 칩과 화살표 색상을 변경한다", () => {
    const { container } = renderComponent(
      <FilterSelector
        value={["apple"]}
        handleValueChange={() => {}}
        options={options}
        optionLabel="과일"
        applyButtonLabel="적용"
      />
    );

    const chip = container.querySelector('[data-slot="chip"]');
    expect(chip).toHaveClass("text-white");
    const arrow = chip?.querySelector("svg");
    expect(arrow).toHaveClass("fill-white");
  });

  it("체크박스 선택 후 적용 버튼을 누르면 선택값을 갱신한다", async () => {
    const handleValueChange = vi.fn();
    const { container, getByText } = renderComponent(
      <FilterSelector
        value={[]}
        handleValueChange={handleValueChange}
        options={options}
        optionLabel="과일"
        applyButtonLabel="적용"
      />
    );

    const inputs = Array.from(
      container.querySelectorAll('input[type="checkbox"]')
    ) as HTMLInputElement[];
    const user = userEvent.setup();
    await user.click(inputs[0]);

    await user.click(getByText("적용"));
    expect(handleValueChange).toHaveBeenCalledWith(["apple"]);
  });
});
