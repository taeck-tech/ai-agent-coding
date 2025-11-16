import { describe, expect, it } from "vitest";

import { StepBar } from "../StepBar";
import { renderComponent } from "../../___test___/utils";

const steps = [
  { key: "s1", label: "1단계" },
  { key: "s2", label: "2단계" },
  { key: "s3", label: "3단계" },
];

describe("StepBar", () => {
  it("단계 라벨과 dot 요소를 렌더링한다", () => {
    const { getByText, container } = renderComponent(
      <StepBar steps={steps} currentStep={1} color="primary" />
    );

    expect(getByText("1단계")).toBeInTheDocument();
    const dots = container.querySelectorAll(".bg-gray-700");
    expect(dots.length).toBeGreaterThan(0);
    const passedBars = container.querySelectorAll(".bar.passed");
    expect(passedBars.length).toBeGreaterThan(0);
  });

  it("useDot=false이면 dot이 렌더링되지 않는다", () => {
    const { container } = renderComponent(
      <StepBar steps={steps} currentStep={2} useDot={false} />
    );

    const dots = container.querySelectorAll(".bg-gray-700");
    expect(dots.length).toBe(0);
  });
});
