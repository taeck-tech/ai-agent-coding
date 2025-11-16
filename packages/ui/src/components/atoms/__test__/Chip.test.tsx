import { describe, expect, it } from "vitest";

import { Chip } from "../Chip";
import { renderComponent } from "../../___test___/utils";

describe("Chip", () => {
  it("기본적으로 filled 상태와 data-slot을 적용한다", () => {
    const { getByText } = renderComponent(<Chip>라벨</Chip>);

    const chip = getByText("라벨").parentElement?.parentElement;
    expect(chip).toHaveAttribute("data-slot", "chip");
    expect(chip).toHaveClass("bg-gray-50");
  });

  it("filled=false 일 때 투명 배경과 border 옵션을 반영한다", () => {
    const { getByText } = renderComponent(
      <Chip filled={false} border rounded="lg" color="primary">
        상태
      </Chip>
    );

    const chip = getByText("상태").parentElement?.parentElement;
    expect(chip).toHaveClass("bg-transparent");
    expect(chip).toHaveClass("border");
    expect(chip).toHaveClass("rounded-full");
    expect(chip).toHaveClass("text-white");
  });
});
