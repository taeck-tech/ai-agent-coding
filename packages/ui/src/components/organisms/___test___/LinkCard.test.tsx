import { describe, expect, it } from "vitest";

import { LinkCard } from "../LinkCard";
import { renderComponent } from "../../___test___/utils";

describe("LinkCard", () => {
  it("링크, 제목, 배경 이미지를 포함한 카드 구조를 렌더링한다", () => {
    const { getByText } = renderComponent(
      <LinkCard
        title="가이드"
        description="설명"
        caption="자세히 보기"
        source="출처"
        backgroundImage="https://example.com/bg.png"
        link="https://example.com"
      />
    );

    const anchor = getByText("가이드").closest("a") as HTMLAnchorElement;
    expect(anchor).toHaveAttribute("href", "https://example.com");
    expect(anchor.style.backgroundImage).toContain(
      "https://example.com/bg.png"
    );
    expect(getByText(">")).toBeInTheDocument();
    expect(getByText("출처")).toHaveClass("text-white");
  });
});
