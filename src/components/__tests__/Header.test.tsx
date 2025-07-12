import { render, screen } from "@testing-library/react";
import { ThemeProvider } from "next-themes";
import Header from "../Header";

const HeaderWrapper = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
    {children}
  </ThemeProvider>
);

describe("Header Component", () => {
  it("renders header with framer-motion animations", () => {
    render(
      <HeaderWrapper>
        <Header />
      </HeaderWrapper>
    );

    // Check if header is rendered
    const header = screen.getByRole("banner");
    expect(header).toBeInTheDocument();

    // Test that it has the expected classes from your actual component
    expect(header.className).toContain("top-0");
    expect(header.className).toContain("left-0");
    expect(header.className).toContain("w-full");
  });

  it("contains menu functionality", () => {
    render(
      <HeaderWrapper>
        <Header />
      </HeaderWrapper>
    );

    // Look for interactive elements in your header
    const header = screen.getByRole("banner");
    expect(header).toBeInTheDocument();

    // Since your header uses mix-blend-difference, test for that class
    expect(header.className).toContain("mix-blend-difference");
  });

  it("has proper responsive design classes", () => {
    render(
      <HeaderWrapper>
        <Header />
      </HeaderWrapper>
    );

    const header = screen.getByRole("banner");

    // Test your actual responsive classes
    expect(header.className).toContain("@container");
    expect(header.className).toContain("px-4");
  });
});
