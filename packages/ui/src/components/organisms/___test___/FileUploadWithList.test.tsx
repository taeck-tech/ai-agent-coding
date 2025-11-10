import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { FileUploadWithList } from "../FileUploadWithList";
import { renderComponent } from "../../___test___/utils";

describe("FileUploadWithList", () => {
  it("파일 업로드와 리스트를 함께 렌더링하고 삭제 이벤트를 위임한다", async () => {
    const files = [new File(["내용"], "sample.txt")];
    const handleChange = vi.fn();
    const { getByText } = renderComponent(
      <FileUploadWithList
        files={files}
        onChangeFileList={handleChange}
        FileUploadProps={{ label: "파일 업로드" }}
      />
    );

    expect(getByText("파일 업로드")).toBeInTheDocument();
    expect(getByText("sample.txt")).toBeInTheDocument();

    const removeButton = getByText("sample.txt")
      .nextElementSibling as HTMLButtonElement;
    const user = userEvent.setup();
    await user.click(removeButton);
    expect(handleChange).toHaveBeenCalledWith([]);
  });
});
