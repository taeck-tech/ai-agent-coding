import { ReactElement, cloneElement } from "react";
import { describe, expect, it, vi } from "vitest";

import { Popover } from "../Popover";
import { renderComponent } from "../../___test___/utils";

function mergeClassName(child: ReactElement, className?: string) {
  const existing = child.props.className ? `${child.props.className} ` : "";
  return existing + (className ?? "");
}

vi.mock("@radix-ui/react-popover", () => {
  return {
    __esModule: true,
    Root: ({ children, ...props }: any) => (
      <div data-slot="popover" {...props}>
        {children}
      </div>
    ),
    Trigger: ({ asChild, children, className, ...props }: any) => {
      if (asChild && children && typeof children === "object") {
        return (
          <div data-slot="popover-trigger-wrapper">
            {cloneElement(children as ReactElement, {
              ...props,
              className: mergeClassName(children as ReactElement, className),
            })}
          </div>
        );
      }
      return (
        <button data-slot="popover-trigger" className={className} {...props}>
          {children}
        </button>
      );
    },
    Content: ({ children, className, ...props }: any) => (
      <div data-slot="popover-content" className={className} {...props}>
        {children}
      </div>
    ),
    Portal: ({ children }: any) => <>{children}</>,
    Close: ({ children, ...props }: any) => (
      <button data-slot="popover-close" {...props}>
        {children}
      </button>
    ),
    Anchor: ({ children, ...props }: any) => (
      <div data-slot="popover-anchor" {...props}>
        {children}
      </div>
    ),
  };
});

describe("Popover", () => {
  it("trigger 요소에 hover 클래스가 병합된다", () => {
    const { getByText } = renderComponent(
      <Popover trigger={<button className="base">열기</button>}>
        <div>콘텐츠</div>
      </Popover>
    );

    const trigger = getByText("열기");
    expect(trigger).toHaveClass("hover:cursor-pointer");
    expect(trigger).toHaveClass("base");
    expect(getByText("콘텐츠").parentElement).toHaveClass("rounded-md");
  });
});
