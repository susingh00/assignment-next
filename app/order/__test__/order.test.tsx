import { render } from "@testing-library/react";
import BookOrder from "../page";
import { act } from "react-dom/test-utils";
import renderer from "react-test-renderer";
const bookOrder = [
  [25898, 1, 0.00707441],
  [25895, 1, 0.02233],

  [25872, 5, 0.18770075],

  [25931, 1, -1.05682096],
  [25932, 1, -5.8784],
  [25933, 2, -1.13829102],
  [25934, 4, -1.55582939],
];
describe("Book Order", () => {
  it("Render Book Order", () => {
    render(<BookOrder />);
    const tree = renderer.create(<BookOrder />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
