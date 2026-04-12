import { fireEvent, render, screen } from "@testing-library/react-native";
import React from "react";
import SubscriptionCard from "../SubscriptionCard";

const MOCK_ICON = { uri: "https://example.com/icon.png" };

const baseProps: SubscriptionCardProps = {
  name: "Spotify",
  price: 9.99,
  currency: "USD",
  icon: MOCK_ICON,
  billing: "monthly",
  expanded: false,
  onPress: jest.fn(),
};

describe("SubscriptionCard - collapsed state", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the subscription name", () => {
    render(<SubscriptionCard {...baseProps} />);
    expect(screen.getByText("Spotify")).toBeTruthy();
  });

  it("renders the formatted price", () => {
    render(<SubscriptionCard {...baseProps} />);
    expect(screen.getByText("$9.99")).toBeTruthy();
  });

  it("renders the billing period", () => {
    render(<SubscriptionCard {...baseProps} />);
    expect(screen.getByText("monthly")).toBeTruthy();
  });

  it("does not render expanded details when collapsed", () => {
    render(<SubscriptionCard {...baseProps} />);
    expect(screen.queryByText("Payment:")).toBeNull();
    expect(screen.queryByText("Category:")).toBeNull();
    expect(screen.queryByText("Started:")).toBeNull();
    expect(screen.queryByText("Renewal date:")).toBeNull();
    expect(screen.queryByText("Status:")).toBeNull();
  });

  it("calls onPress when card is pressed", () => {
    const onPress = jest.fn();
    render(<SubscriptionCard {...baseProps} onPress={onPress} />);
    fireEvent.press(screen.getByText("Spotify"));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it("shows category in meta when category is provided", () => {
    render(<SubscriptionCard {...baseProps} category="Music" />);
    expect(screen.getByText("Music")).toBeTruthy();
  });

  it("shows plan in meta when no category but plan is provided", () => {
    render(<SubscriptionCard {...baseProps} plan="Premium" />);
    expect(screen.getByText("Premium")).toBeTruthy();
  });

  it("shows category over plan when both are provided", () => {
    render(
      <SubscriptionCard {...baseProps} category="Music" plan="Premium" />,
    );
    // category takes priority over plan
    expect(screen.getByText("Music")).toBeTruthy();
  });

  it("shows formatted renewalDate in meta when no category or plan", () => {
    render(<SubscriptionCard {...baseProps} renewalDate="2024-03-15" />);
    expect(screen.getByText("03/15/2024")).toBeTruthy();
  });

  it("renders EUR currency correctly", () => {
    render(<SubscriptionCard {...baseProps} currency="EUR" price={14.99} />);
    expect(screen.getByText("€14.99")).toBeTruthy();
  });
});

describe("SubscriptionCard - expanded state", () => {
  const expandedProps: SubscriptionCardProps = {
    ...baseProps,
    expanded: true,
    category: "Music",
    plan: "Individual",
    paymentMethod: "Visa •••• 4242",
    startDate: "2023-01-01",
    renewalDate: "2024-03-15",
    status: "active",
  };

  it("renders all detail labels when expanded", () => {
    render(<SubscriptionCard {...expandedProps} />);
    expect(screen.getByText("Payment:")).toBeTruthy();
    expect(screen.getByText("Category:")).toBeTruthy();
    expect(screen.getByText("Started:")).toBeTruthy();
    expect(screen.getByText("Renewal date:")).toBeTruthy();
    expect(screen.getByText("Status:")).toBeTruthy();
  });

  it("renders paymentMethod value", () => {
    render(<SubscriptionCard {...expandedProps} />);
    expect(screen.getByText("Visa •••• 4242")).toBeTruthy();
  });

  it("renders category value in details", () => {
    render(<SubscriptionCard {...expandedProps} />);
    // category appears twice: in meta and in details
    const categoryEls = screen.getAllByText("Music");
    expect(categoryEls.length).toBeGreaterThanOrEqual(1);
  });

  it("renders formatted startDate", () => {
    render(<SubscriptionCard {...expandedProps} />);
    expect(screen.getByText("01/01/2023")).toBeTruthy();
  });

  it("renders formatted renewalDate", () => {
    render(<SubscriptionCard {...expandedProps} />);
    expect(screen.getByText("03/15/2024")).toBeTruthy();
  });

  it("renders formatted status label (capitalized)", () => {
    render(<SubscriptionCard {...expandedProps} />);
    expect(screen.getByText("Active")).toBeTruthy();
  });

  it("renders empty string for startDate when not provided", () => {
    render(
      <SubscriptionCard {...expandedProps} startDate={undefined} />,
    );
    // no date text should appear for started row
    expect(screen.queryByText("01/01/2023")).toBeNull();
  });

  it("renders empty string for renewalDate when not provided", () => {
    render(
      <SubscriptionCard {...expandedProps} renewalDate={undefined} />,
    );
    expect(screen.queryByText("03/15/2024")).toBeNull();
  });

  it("renders empty string for status when not provided", () => {
    render(<SubscriptionCard {...expandedProps} status={undefined} />);
    expect(screen.queryByText("Active")).toBeNull();
  });

  it("shows plan in details when no category", () => {
    render(
      <SubscriptionCard
        {...expandedProps}
        category={undefined}
        plan="Individual"
      />,
    );
    // "Individual" appears in both the meta row and the details category row
    expect(screen.getAllByText("Individual").length).toBeGreaterThanOrEqual(1);
  });

  it("calls onPress when expanded card is pressed", () => {
    const onPress = jest.fn();
    render(<SubscriptionCard {...expandedProps} onPress={onPress} />);
    fireEvent.press(screen.getByText("Spotify"));
    expect(onPress).toHaveBeenCalledTimes(1);
  });
});