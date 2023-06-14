import { render } from "@testing-library/react";
import { OhlcChart } from "..";
import renderer from "react-test-renderer";
describe("OHLC", () => {
  it("Render OHLC Screen", async () => {
    render(<OhlcChart />);
    const tree = renderer.create(<OhlcChart />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
