import { describe, expect, it } from "vitest";

import { Title } from "../Title";
import { renderComponent } from "../../___test___/utils";

describe("Title", () => {
  it("기본적으로 h1 요소와 기본 타이포그래피 클래스를 적용한다", () => {
    const { getByText } = renderComponent(<Title>제목</Title>);

    const element = getByText("제목");
    expect(element.tagName.toLowerCase()).toBe("h1");
    expect(element).toHaveClass("text-subtitle1");
    expect(element).toHaveClass("font-regular");
  });

  it("variant와 weight, color를 조합해 적용한다", () => {
    const { getByText } = renderComponent(
      <Title as="h2" variant="headline2" weight="semibold" color="warning">
        경고
      </Title>
    );

    const element = getByText("경고");
    expect(element.tagName.toLowerCase()).toBe("h2");
    expect(element).toHaveClass("text-headline2");
    expect(element).toHaveClass("font-semibold");
    expect(element).toHaveClass("text-warning");
  });
});
