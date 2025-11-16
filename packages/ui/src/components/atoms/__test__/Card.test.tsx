import React from "react";
import { describe, expect, it } from "vitest";

import { Card } from "../Card";
import { renderComponent } from "../../___test___/utils";

describe("Card", () => {
  it("기본 색상과 data-slot 속성을 가진 div를 렌더링한다", () => {
    const { getByText } = renderComponent(<Card>내용</Card>);

    const card = getByText("내용").parentElement;
    expect(card).toHaveAttribute("data-slot", "card");
    expect(card).toHaveClass("bg-primary");
  });

  it("color와 className을 조합한다", () => {
    const { getByText } = renderComponent(
      <Card color="danger" className="shadow-lg">
        경고
      </Card>
    );

    const wrapper = getByText("경고").parentElement;
    expect(wrapper).toHaveClass("bg-danger-light");
    expect(wrapper).toHaveClass("shadow-lg");
  });
});
