import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import YouTube from "./YouTube";

describe("<YouTube />", () => {
  it("render an iframe with the correct embed url", () => {
    render(<YouTube videoUrl="https://www.youtube.com/watch?v=ldwYV4FwciQ" />);
    const iframe = screen.getByTitle("Youtube-video");
    expect(iframe).toBeInTheDocument();
    expect(iframe.getAttribute("src")).toEqual(
      "https://www.youtube.com/embed/ldwYV4FwciQ"
    );
  });

  it("render nothing if no url supplied", () => {
    const { container } = render(<YouTube videoUrl={null} />);
    expect(container.firstChild).toBeNull();
  });
});
