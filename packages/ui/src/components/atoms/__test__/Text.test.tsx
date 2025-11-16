import { describe, expect, it } from "vitest";

import { Text } from "../Text";
import { renderComponent } from "../../___test___/utils";

describe("Text", () => {
  it("기본적으로 p 요소를 사용하고 기본 스타일을 적용한다", () => {
    const { getByText } = renderComponent(<Text>본문</Text>);

    const element = getByText("본문");
    expect(element.tagName.toLowerCase()).toBe("p");
    expect(element).toHaveClass("text-caption");
    expect(element).toHaveClass("font-regular");
  });

  it("as, variant, weight, color 조합을 반영한다", () => {
    const { getByText } = renderComponent(
      <Text as="span" variant="body2" weight="bold" color="primary">
        강조
      </Text>
    );

    const element = getByText("강조");
    expect(element.tagName.toLowerCase()).toBe("span");
    expect(element).toHaveClass("text-body2");
    expect(element).toHaveClass("font-bold");
    expect(element).toHaveClass("text-primary");
  });
});
