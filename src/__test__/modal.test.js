import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import FormDialog from "../component/dialog/Dialog";
import store from "../redux/store";

test("success render button", () => {
  render(<Provider store={store}><FormDialog title="Create"/></Provider>);
  const button = screen.getByRole("button");
  expect(button).toBeInTheDocument();
  userEvent.click(button);
  expect(screen.getByText("Create"));
});
