import { render, screen } from "@testing-library/react-native";
import React from "react";
import UpcomingSubscriptinCard from "../UpcomingSubscriptinCard";

const MOCK_ICON = { uri: "https://example.com/icon.png" };

const baseProps: UpcomingSubscription = {
  id: "1",
  name: "Netflix",
  price: 15.99,
  currency: "USD",
  daysLeft: 5,
  icon: MOCK_ICON,
};

describe("UpcomingSubscriptinCard", () => {
  it("renders the subscription name", () => {
    render(<UpcomingSubscriptinCard {...baseProps} />);
    expect(screen.getByText("Netflix")).toBeTruthy();
  });

  it("renders the formatted price in USD", () => {
    render(<UpcomingSubscriptinCard {...baseProps} />);
    expect(screen.getByText("$15.99")).toBeTruthy();
  });

  it("renders formatted price in EUR", () => {
    render(
      <UpcomingSubscriptinCard {...baseProps} currency="EUR" price={9.99} />,
    );
    expect(screen.getByText("€9.99")).toBeTruthy();
  });

  it("shows 'X days left' when daysLeft > 1", () => {
    render(<UpcomingSubscriptinCard {...baseProps} daysLeft={5} />);
    expect(screen.getByText("5 days left")).toBeTruthy();
  });

  it("shows 'X days left' when daysLeft is 2", () => {
    render(<UpcomingSubscriptinCard {...baseProps} daysLeft={2} />);
    expect(screen.getByText("2 days left")).toBeTruthy();
  });

  it("shows 'Last day' when daysLeft is 1", () => {
    render(<UpcomingSubscriptinCard {...baseProps} daysLeft={1} />);
    expect(screen.getByText("Last day")).toBeTruthy();
  });

  it("shows 'Last day' when daysLeft is 0", () => {
    render(<UpcomingSubscriptinCard {...baseProps} daysLeft={0} />);
    expect(screen.getByText("Last day")).toBeTruthy();
  });

  it("shows 'Last day' when daysLeft is negative", () => {
    render(<UpcomingSubscriptinCard {...baseProps} daysLeft={-3} />);
    expect(screen.getByText("Last day")).toBeTruthy();
  });

  it("renders a large daysLeft value correctly", () => {
    render(<UpcomingSubscriptinCard {...baseProps} daysLeft={30} />);
    expect(screen.getByText("30 days left")).toBeTruthy();
  });

  it("renders price with two decimal places for whole number price", () => {
    render(<UpcomingSubscriptinCard {...baseProps} price={10} />);
    expect(screen.getByText("$10.00")).toBeTruthy();
  });

  it("uses USD as default when currency is not provided", () => {
    const propsWithoutCurrency = { ...baseProps };
    delete (propsWithoutCurrency as Partial<UpcomingSubscription>).currency;
    render(<UpcomingSubscriptinCard {...propsWithoutCurrency} />);
    expect(screen.getByText("$15.99")).toBeTruthy();
  });
});