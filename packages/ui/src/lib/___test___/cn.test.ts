import { describe, expect, it } from "vitest";

import { cn } from "../utils";

describe("cn", () => {
  it("clsx와 tailwind-merge를 이용해 클래스를 정리한다", () => {
    const className = cn(
      "px-2",
      undefined,
      { hidden: false, flex: true },
      "px-4",
      "text-sm"
    );
    expect(className).toBe("flex px-4 text-sm");
  });
});
