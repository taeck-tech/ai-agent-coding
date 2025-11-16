import { describe, expect, it, vi } from "vitest";
import { waitFor } from "@testing-library/react";

import { SelectDatePopover } from "../SelectDatePopover";
import { renderComponent } from "../../___test___/utils";

const calendarProps: { current: any } = { current: null };

vi.mock("../components/molecules/Calendar", () => ({
  Calendar: (props: any) => {
    calendarProps.current = props;
    return <div data-testid="calendar" />;
  },
}));

vi.mock("@radix-ui/react-popover", () => ({
  __esModule: true,
  Root: ({ children }: any) => <div data-slot="popover-root">{children}</div>,
  Trigger: ({ asChild, children }: any) =>
    asChild ? children : <button>{children}</button>,
  Content: ({ children }: any) => <div>{children}</div>,
  Portal: ({ children }: any) => <>{children}</>,
  Close: ({ children }: any) => <button>{children}</button>,
  Anchor: ({ children }: any) => <div>{children}</div>,
}));

describe("SelectDatePopover", () => {
  it("single 모드에서 value를 입력 필드에 포맷팅해 표시한다", () => {
    const selected = new Date("2024-04-01");
    const { getByPlaceholderText } = renderComponent(
      <SelectDatePopover mode="single" value={selected} onChange={() => {}} />
    );

    const startInput = getByPlaceholderText("YYYY-MM-DD") as HTMLInputElement;
    expect(startInput.value).toBe("2024-04-01");
  });

  it("캘린더에서 날짜를 선택하면 onChange가 호출되고 입력 값이 업데이트된다", async () => {
    const handleChange = vi.fn();
    const { getByPlaceholderText } = renderComponent(
      <SelectDatePopover mode="single" onChange={handleChange} />
    );

    const nextDate = new Date("2024-07-15");
    calendarProps.current.onSelect(nextDate);

    await waitFor(() => {
      expect(handleChange).toHaveBeenCalledWith(nextDate);
      expect(
        (getByPlaceholderText("YYYY-MM-DD") as HTMLInputElement).value
      ).toBe("2024-07-15");
    });
  });

  it("hasErrorOnSelected가 true이면 외곽선 경고 클래스를 적용한다", () => {
    const { container } = renderComponent(
      <SelectDatePopover
        mode="range"
        hasErrorOnSelected
        value={{ from: undefined, to: undefined }}
      />
    );

    const wrapper = container.firstElementChild as HTMLElement;
    expect(wrapper).toHaveClass("border-red-500");
  });
});
