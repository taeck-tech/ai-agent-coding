import { describe, expect, it } from "vitest";

import { Skeleton } from "../Skeleton";
import { renderComponent } from "../../___test___/utils";

describe("Skeleton", () => {
  it("기본적인 로딩 스타일을 가진 div를 렌더링한다", () => {
    const { container } = renderComponent(<Skeleton className="h-4 w-8" />);

    const skeleton = container.querySelector('[data-slot="skeleton"]');
    expect(skeleton).toHaveClass("animate-pulse");
    expect(skeleton).toHaveClass("h-4");
    expect(skeleton).toHaveClass("w-8");
  });
});
