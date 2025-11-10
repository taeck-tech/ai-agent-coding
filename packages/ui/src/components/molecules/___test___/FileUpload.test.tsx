import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { FileUpload } from "../FileUpload";
import { renderComponent } from "../../___test___ /utils";

describe("FileUpload", () => {
  const baseFile = new File(["테스트"], "test.txt", { type: "text/plain" });

  it("dragover 시 시각적 상태를 업데이트한다", async () => {
    const { container } = renderComponent(
      <FileUpload files={null} onFileChange={() => {}} label="업로드" />
    );

    const label = container.querySelector("label");
    expect(label).not.toHaveClass("border-blue-500");

    const user = userEvent.setup();
    await user.hover(label!);
    expect(label).toHaveClass("border-blue-500");

    await user.unhover(label!);
    expect(label).not.toHaveClass("border-blue-500");
  });

  it("drop 이벤트로 파일 목록을 전달한다", async () => {
    const handleFileChange = vi.fn();
    const { container } = renderComponent(
      <FileUpload
        files={[baseFile]}
        onFileChange={handleFileChange}
        label="업로드"
        maxFileLength={3}
      />
    );

    const label = container.querySelector("label");
    const newFile = new File(["두번째"], "second.txt", { type: "text/plain" });

    const user = userEvent.setup();
    await user.upload(label!, [newFile]);

    expect(handleFileChange).toHaveBeenCalledWith([baseFile, newFile]);
  });

  it("최대 파일 개수에 도달하면 input을 비활성화한다", () => {
    const files = [baseFile, new File(["다른"], "another.txt")];
    const { container } = renderComponent(
      <FileUpload
        files={files}
        onFileChange={() => {}}
        label="업로드"
        maxFileLength={2}
      />
    );

    const input = container.querySelector('input[type="file"]');
    expect(input).toBeDisabled();
  });
});
