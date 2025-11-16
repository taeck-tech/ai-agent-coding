import { render } from "@testing-library/react";
import type { ReactElement } from "react";

export const renderComponent = (ui: ReactElement) => {
  return render(ui);
};
