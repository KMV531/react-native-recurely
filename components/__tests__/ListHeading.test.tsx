import { fireEvent, render, screen } from "@testing-library/react-native";
import React from "react";
import ListHeading from "../ListHeading";

describe("ListHeading", () => {
  it("renders the provided title", () => {
    render(<ListHeading title="Upcoming" />);
    expect(screen.getByText("Upcoming")).toBeTruthy();
  });

  it("renders the 'View all' action button", () => {
    render(<ListHeading title="All Subscriptions" />);
    expect(screen.getByText("View all")).toBeTruthy();
  });

  it("renders a different title string correctly", () => {
    render(<ListHeading title="All Subscriptions" />);
    expect(screen.getByText("All Subscriptions")).toBeTruthy();
  });

  it("renders title and View all together", () => {
    render(<ListHeading title="Recent" />);
    expect(screen.getByText("Recent")).toBeTruthy();
    expect(screen.getByText("View all")).toBeTruthy();
  });

  it("View all button is pressable (TouchableOpacity)", () => {
    render(<ListHeading title="Test" />);
    const viewAll = screen.getByText("View all");
    // Should not throw when pressed (no onPress handler wired up currently)
    fireEvent.press(viewAll);
    expect(screen.getByText("View all")).toBeTruthy();
  });

  it("renders an empty title string", () => {
    render(<ListHeading title="" />);
    expect(screen.getByText("View all")).toBeTruthy();
  });
});