import {
  formatCurrency,
  formatStatusLabel,
  formatSubscriptionDateTime,
} from "../utils";

describe("formatCurrency", () => {
  it("formats USD by default", () => {
    expect(formatCurrency(9.99)).toBe("$9.99");
  });

  it("formats USD explicitly", () => {
    expect(formatCurrency(9.99, "USD")).toBe("$9.99");
  });

  it("formats EUR", () => {
    expect(formatCurrency(9.99, "EUR")).toBe("€9.99");
  });

  it("formats zero", () => {
    expect(formatCurrency(0)).toBe("$0.00");
  });

  it("always shows two decimal places for whole numbers", () => {
    expect(formatCurrency(10)).toBe("$10.00");
  });

  it("always shows two decimal places for one decimal number", () => {
    expect(formatCurrency(10.5)).toBe("$10.50");
  });

  it("rounds to two decimal places", () => {
    expect(formatCurrency(10.999)).toBe("$11.00");
  });

  it("formats large numbers with commas", () => {
    expect(formatCurrency(1234567.89)).toBe("$1,234,567.89");
  });

  it("formats negative values", () => {
    expect(formatCurrency(-9.99)).toBe("-$9.99");
  });

  it("falls back to toFixed(2) for invalid currency codes", () => {
    // An invalid currency code causes Intl.NumberFormat to throw
    const result = formatCurrency(9.99, "INVALID_CURRENCY");
    expect(result).toBe("9.99");
  });

  it("falls back to toFixed(2) for another invalid currency", () => {
    const result = formatCurrency(100, "XYZ_FAKE");
    expect(result).toBe("100.00");
  });
});

describe("formatSubscriptionDateTime", () => {
  it("returns 'Not provided' for undefined", () => {
    expect(formatSubscriptionDateTime(undefined)).toBe("Not provided");
  });

  it("returns 'Not provided' for empty string", () => {
    expect(formatSubscriptionDateTime("")).toBe("Not provided");
  });

  it("formats a valid ISO date string as MM/DD/YYYY", () => {
    expect(formatSubscriptionDateTime("2024-01-15")).toBe("01/15/2024");
  });

  it("formats a date with time component", () => {
    expect(formatSubscriptionDateTime("2024-06-30T00:00:00.000Z")).toBe(
      "06/30/2024",
    );
  });

  it("formats a date-time string", () => {
    expect(formatSubscriptionDateTime("2023-12-01T10:30:00")).toBe(
      "12/01/2023",
    );
  });

  it("returns 'Not provided' for an invalid date string", () => {
    expect(formatSubscriptionDateTime("not-a-date")).toBe("Not provided");
  });

  it("returns 'Not provided' for a nonsense string", () => {
    expect(formatSubscriptionDateTime("hello world")).toBe("Not provided");
  });

  it("formats a date at year boundary (Dec 31)", () => {
    expect(formatSubscriptionDateTime("2024-12-31")).toBe("12/31/2024");
  });

  it("formats a date at year start (Jan 1)", () => {
    expect(formatSubscriptionDateTime("2024-01-01")).toBe("01/01/2024");
  });

  it("zero-pads single-digit month and day", () => {
    expect(formatSubscriptionDateTime("2024-03-05")).toBe("03/05/2024");
  });
});

describe("formatStatusLabel", () => {
  it("returns 'Unknown' for undefined", () => {
    expect(formatStatusLabel(undefined)).toBe("Unknown");
  });

  it("returns 'Unknown' for empty string", () => {
    expect(formatStatusLabel("")).toBe("Unknown");
  });

  it("capitalizes first letter of a lowercase word", () => {
    expect(formatStatusLabel("active")).toBe("Active");
  });

  it("capitalizes first letter of 'cancelled'", () => {
    expect(formatStatusLabel("cancelled")).toBe("Cancelled");
  });

  it("capitalizes first letter of 'paused'", () => {
    expect(formatStatusLabel("paused")).toBe("Paused");
  });

  it("leaves already-capitalized string unchanged", () => {
    expect(formatStatusLabel("Active")).toBe("Active");
  });

  it("only capitalizes the first character, preserving the rest", () => {
    expect(formatStatusLabel("active now")).toBe("Active now");
  });

  it("handles a single character string", () => {
    expect(formatStatusLabel("a")).toBe("A");
  });

  it("handles all-uppercase input", () => {
    expect(formatStatusLabel("ACTIVE")).toBe("ACTIVE");
  });

  it("handles status with mixed casing after first char", () => {
    expect(formatStatusLabel("trialing")).toBe("Trialing");
  });
});