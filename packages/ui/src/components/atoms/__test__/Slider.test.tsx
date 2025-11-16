import { waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { Slider } from "../Slider";
import { renderComponent } from "../../___test___/utils";

const renderedProps: { current: any } = { current: null };

vi.mock("rc-slider", () => {
  return {
    __esModule: true,
    default: (props: any) => {
      renderedProps.current = props;
      return <div data-testid="rc-slider" />;
    },
  };
});

describe("Slider", () => {
  it("기본적으로 range 슬라이더와 스타일 클래스를 전달한다", () => {
    renderComponent(<Slider defaultValue={[0, 10]} />);

    expect(renderedProps.current.range).toBe(true);
    expect(renderedProps.current.classNames).toMatchObject({
      track: "!bg-primary-500",
      rail: "!bg-primary-050",
      handle: "!bg-white !border-primary-500 !opacity-100",
    });
  });

  it("onChange 호출 시 슬라이더 값을 업데이트하고 콜백을 실행한다", async () => {
    const handleChange = vi.fn();
    renderComponent(<Slider defaultValue={[20, 40]} onChange={handleChange} />);

    renderedProps.current.onChange([30, 50]);

    await waitFor(() => {
      expect(handleChange).toHaveBeenCalledWith([30, 50]);
      expect(renderedProps.current.value).toEqual([30, 50]);
    });
  });
});
