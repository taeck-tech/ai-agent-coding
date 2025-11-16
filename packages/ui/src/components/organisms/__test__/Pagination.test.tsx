import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { Pagination } from "../Pagination";
import { renderComponent } from "../../___test___/utils";

describe("Pagination", () => {
  it("현재 페이지와 페이지 그룹을 렌더링한다", async () => {
    const handlePageChange = vi.fn();
    const { getByRole, getByText } = renderComponent(
      <Pagination
        totalPages={10}
        currentPage={1}
        onPageChange={handlePageChange}
        pageGroupSize={5}
      />
    );
    const user = userEvent.setup();

    expect(getByText("2")).toHaveAttribute("data-active", "true");
    await user.click(getByText("3"));
    expect(handlePageChange).toHaveBeenCalledWith(2);

    const nextButton = getByRole("button", { name: /go to next page/i });
    await user.click(nextButton);
    expect(handlePageChange).toHaveBeenCalledTimes(2);
    expect(handlePageChange.mock.calls[1][0]).toBe(2);
  });

  it("첫 페이지에서는 이전 버튼이 비활성화된다", () => {
    const handlePageChange = vi.fn();
    const { getByRole } = renderComponent(
      <Pagination
        totalPages={3}
        currentPage={0}
        onPageChange={handlePageChange}
      />
    );

    const previous = getByRole("button", {
      name: /go to previous page/i,
    }) as HTMLButtonElement;
    expect(previous.disabled).toBe(true);
  });
});
