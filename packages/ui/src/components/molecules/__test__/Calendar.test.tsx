import { describe, expect, it, vi } from "vitest";

import { Calendar } from "../Calendar";
import { renderComponent } from "../../___test___/utils";

const renderedProps: { current: any } = { current: null };

vi.mock("react-day-picker", () => ({
  __esModule: true,
  DayPicker: (props: any) => {
    renderedProps.current = props;
    return <div data-testid="day-picker" />;
  },
  getDefaultClassNames: () => ({}),
}));

describe("Calendar", () => {
  it("single 모드로 DayPicker를 구성한다", () => {
    const selectedDate = new Date("2024-01-01");
    const handleSelect = vi.fn();
    renderComponent(
      <Calendar mode="single" selected={selectedDate} onSelect={handleSelect} />
    );

    expect(renderedProps.current.mode).toBe("single");
    expect(renderedProps.current.selected).toBe(selectedDate);
    expect(renderedProps.current.showOutsideDays).toBe(true);
    expect(renderedProps.current.className).toContain("text-body-03");
    expect(renderedProps.current.classNames.caption_label).toContain(
      "hover:cursor-pointer"
    );
  });

  it("range 모드에서 동일 일자를 선택하면 to를 undefined로 전달한다", () => {
    const handleSelect = vi.fn();
    const baseDate = new Date("2024-02-02");
    renderComponent(
      <Calendar
        mode="range"
        selected={{ from: undefined, to: undefined }}
        onSelect={handleSelect}
      />
    );

    renderedProps.current.onSelect({ from: baseDate, to: baseDate });
    expect(handleSelect).toHaveBeenCalledWith({
      from: baseDate,
      to: undefined,
    });
  });
});
