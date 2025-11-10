import { ReactElement } from "react";
import { describe, expect, it, vi } from "vitest";

import { Dialog } from "../Dialog";
import { renderComponent } from "../../___test___/utils";

const withAsChild = (Component: any) =>
  function Wrapped({ asChild, children, ...props }: any) {
    if (asChild && children && typeof children === "object") {
      return Component({ ...props, children: children as ReactElement });
    }
    return Component({ ...props, children });
  };

vi.mock("@radix-ui/react-dialog", () => {
  const createComponent = (
    slot: string,
    tag: keyof HTMLElementTagNameMap = "div"
  ) =>
    function Component({ children, className, ...props }: any) {
      const Tag = tag as any;
      return (
        <Tag data-slot={slot} className={className} {...props}>
          {children}
        </Tag>
      );
    };

  return {
    __esModule: true,
    Root: createComponent("dialog", "div"),
    Trigger: createComponent("dialog-trigger", "button"),
    Portal: ({ children }: any) => <>{children}</>,
    Overlay: createComponent("dialog-overlay", "div"),
    Content: createComponent("dialog-content", "div"),
    Title: createComponent("dialog-title", "h2"),
    Description: createComponent("dialog-description", "p"),
    Close: withAsChild((props: any) => (
      <button data-slot="dialog-close" {...props}>
        {props.children}
      </button>
    )),
  };
});

describe("Dialog", () => {
  it("제목과 본문, 기본 버튼을 렌더링한다", () => {
    const { getByText, container } = renderComponent(
      <Dialog open title="알림" onOpenChange={() => {}}>
        안내 메시지
      </Dialog>
    );

    expect(getByText("알림")).toBeInTheDocument();
    expect(getByText("안내 메시지")).toBeInTheDocument();
    const confirmButton = getByText("확인");
    const cancelButton = getByText("취소");

    expect(confirmButton.parentElement).toHaveAttribute("data-slot", "button");
    expect(cancelButton.parentElement).toHaveClass("bg-transparent");
    expect(
      container.querySelector('[data-slot="dialog-content"]')
    ).toBeInTheDocument();
  });
});
