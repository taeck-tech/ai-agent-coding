import { describe, expect, it, vi } from "vitest";

import { Select } from "../Select";
import { renderComponent } from "../../___test___/utils";

vi.mock("@radix-ui/react-select", () => {
  const MockComponent = ({ children, ...props }: any) => (
    <div {...props}>{children}</div>
  );
  const MockAsChild = ({ children }: any) => <>{children}</>;
  return {
    __esModule: true,
    default: {},
    Root: ({ children, ...props }: any) => (
      <div data-testid="radix-select-root" {...props}>
        {children}
      </div>
    ),
    Group: MockComponent,
    Value: ({ placeholder, children, ...props }: any) => (
      <span data-slot="select-value" data-placeholder={placeholder} {...props}>
        {placeholder || children}
      </span>
    ),
    Trigger: ({ children, ...props }: any) => (
      <button data-slot="select-trigger" {...props}>
        {children}
      </button>
    ),
    Content: ({ children, ...props }: any) => (
      <div data-slot="select-content" {...props}>
        {children}
      </div>
    ),
    Label: MockComponent,
    Item: ({ children, ...props }: any) => (
      <div data-slot="select-item" {...props}>
        {children}
      </div>
    ),
    ItemIndicator: MockComponent,
    ItemText: ({ children }: any) => <span>{children}</span>,
    Separator: MockComponent,
    ScrollUpButton: MockComponent,
    ScrollDownButton: MockComponent,
    Portal: ({ children }: any) => <>{children}</>,
    Icon: ({ children }: any) => <MockAsChild>{children}</MockAsChild>,
    Viewport: MockComponent,
  };
});

describe("Select", () => {
  const items = [
    { label: "사과", value: "apple" },
    { label: "바나나", value: "banana" },
  ];

  it("기본적으로 fullWidth 트리거를 렌더링한다", () => {
    const { container, getByText } = renderComponent(
      <Select
        items={items}
        placeholder="선택"
        value=""
        onValueChange={() => {}}
      />
    );

    const trigger = container.querySelector('[data-slot="select-trigger"]');
    expect(trigger).toHaveClass("w-full");
    expect(getByText("선택")).toBeInTheDocument();
  });

  it("fullWidth=false일 때 너비 유틸리티가 제거된다", () => {
    const { container } = renderComponent(
      <Select
        items={items}
        placeholder="선택"
        value=""
        onValueChange={() => {}}
        fullWidth={false}
      />
    );

    const trigger = container.querySelector('[data-slot="select-trigger"]');
    expect(trigger).not.toHaveClass("w-full");
    expect(trigger).toHaveClass("w-max");
  });

  it("items 배열을 기반으로 항목을 렌더링한다", () => {
    const { container } = renderComponent(
      <Select
        items={items}
        placeholder="선택"
        value=""
        onValueChange={() => {}}
      />
    );

    const selectItems = container.querySelectorAll('[data-slot="select-item"]');
    expect(selectItems).toHaveLength(items.length);
    expect(selectItems[0]).toHaveTextContent("사과");
  });
});
