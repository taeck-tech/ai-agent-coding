import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { toast, Toaster } from "../Toaster";
import { renderComponent } from "../../___test___/utils";

const customMock = vi.fn();
const dismissMock = vi.fn();
const toasterProps: { current: any } = { current: null };

vi.mock("sonner", () => ({
  __esModule: true,
  Toaster: (props: any) => {
    toasterProps.current = props;
    return <div data-slot="sonner-toaster" />;
  },
  toast: {
    custom: customMock,
    dismiss: dismissMock,
  },
}));

describe("Toaster", () => {
  it("각 toast 변형이 sonner custom을 호출한다", async () => {
    toast.success("완료", { size: "lg" });

    expect(customMock).toHaveBeenCalledTimes(1);
    const renderer = customMock.mock.calls[0][0];
    const { getByText, container } = renderComponent(renderer("toast-id"));

    const root = container.firstElementChild as HTMLElement;
    expect(root).toHaveClass("bg-success-50");
    expect(root).toHaveClass("text-success");
    expect(getByText("완료")).toBeInTheDocument();

    const closeArea = root.querySelector("div:last-child") as HTMLElement;
    const user = userEvent.setup();
    await user.click(closeArea);
    expect(dismissMock).toHaveBeenCalledWith("toast-id");
  });

  it("Toaster 컴포넌트가 기본 옵션을 전달한다", () => {
    renderComponent(<Toaster />);
    expect(toasterProps.current.toastOptions.duration).toBe(5000);
    expect(toasterProps.current.theme).toBe("light");
    expect(toasterProps.current.richColors).toBe(false);
  });
});
