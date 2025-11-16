import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { Carousel } from "../Carousel";
import { renderComponent } from "../../___test___/utils";

const listeners: Record<string, Array<(api: any) => void>> = {};
const mockScrollPrev = vi.fn();
const mockScrollNext = vi.fn();
const mockApi = {
  canScrollPrev: vi.fn(() => true),
  canScrollNext: vi.fn(() => true),
  scrollPrev: mockScrollPrev,
  scrollNext: mockScrollNext,
  on: vi.fn((event: string, handler: (api: any) => void) => {
    listeners[event] = listeners[event] || [];
    listeners[event].push(handler);
  }),
  off: vi.fn((event: string, handler: (api: any) => void) => {
    listeners[event] = (listeners[event] || []).filter((cb) => cb !== handler);
  }),
};

const mockRefCallback = vi.fn();

vi.mock("embla-carousel-react", () => {
  return {
    __esModule: true,
    default: (options: any, plugins: any) => {
      return [mockRefCallback, mockApi] as const;
    },
  };
});

vi.mock("embla-carousel-autoplay", () => ({
  __esModule: true,
  default: () => ({ plugin: "autoplay" }),
}));

describe("Carousel", () => {
  const slides = [<div key="1">슬라이드1</div>, <div key="2">슬라이드2</div>];

  it("children을 carousel-item으로 감싼다", () => {
    const setApi = vi.fn();
    const { container } = renderComponent(
      <Carousel wrapperProps={{ setApi }} itemsSizePerPage={1} loop>
        {slides}
      </Carousel>
    );

    const items = container.querySelectorAll('[data-slot="carousel-item"]');
    expect(items).toHaveLength(slides.length);
    expect(setApi).toHaveBeenCalledWith(mockApi);
  });

  it("이전/다음 버튼이 scroll 함수를 호출한다", async () => {
    const { container } = renderComponent(
      <Carousel itemsSizePerPage={1} loop>
        {slides}
      </Carousel>
    );

    const prev = container.querySelector(
      '[data-slot="carousel-previous"]'
    ) as HTMLButtonElement;
    const next = container.querySelector(
      '[data-slot="carousel-next"]'
    ) as HTMLButtonElement;
    const user = userEvent.setup();

    await user.click(prev);
    await user.click(next);

    expect(mockScrollPrev).toHaveBeenCalledTimes(1);
    expect(mockScrollNext).toHaveBeenCalledTimes(1);
    expect(prev.disabled).toBe(false);
    expect(next.disabled).toBe(false);
  });

  it("useArrows=false일 때 컨트롤을 렌더링하지 않는다", () => {
    const { container } = renderComponent(
      <Carousel itemsSizePerPage={1} loop useArrows={false}>
        {slides}
      </Carousel>
    );

    expect(
      container.querySelector('[data-slot="carousel-previous"]')
    ).toBeNull();
    expect(container.querySelector('[data-slot="carousel-next"]')).toBeNull();
  });
});
