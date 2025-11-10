import { ReactElement, cloneElement } from "react";
import { describe, expect, it, vi } from "vitest";

import { Tooltip } from "../Tooltip";
import { renderComponent } from "../../___test___/utils";

const providerProps: { current: any } = { current: null };

vi.mock("@radix-ui/react-tooltip", () => {
  return {
    __esModule: true,
    Provider: ({ children, ...props }: any) => {
      providerProps.current = props;
      return (
        <div data-slot="tooltip-provider" {...props}>
          {children}
        </div>
      );
    },
    Root: ({ children }: any) => <div data-slot="tooltip-root">{children}</div>,
    Trigger: ({ asChild, children, ...props }: any) => {
      if (asChild && children && typeof children === "object") {
        return cloneElement(children as ReactElement, props);
      }
      return (
        <button data-slot="tooltip-trigger" {...props}>
          {children}
        </button>
      );
    },
    Content: ({ children, className, ...props }: any) => (
      <div data-slot="tooltip-content" className={className} {...props}>
        {children}
      </div>
    ),
    Portal: ({ children }: any) => <>{children}</>,
    Arrow: ({ className }: any) => (
      <div data-slot="tooltip-arrow" className={className} />
    ),
  };
});

describe("Tooltip", () => {
  it("label 텍스트와 provider 기본 delay를 설정한다", () => {
    const { getByText } = renderComponent(
      <Tooltip label="설명">
        <button type="button">아이콘</button>
      </Tooltip>
    );

    expect(providerProps.current.delayDuration).toBe(0);
    expect(getByText("설명")).toBeInTheDocument();
    const content = getByText("설명").parentElement;
    expect(content).toHaveClass("border-1");
    expect(getByText("아이콘")).toBeInTheDocument();
  });
});
