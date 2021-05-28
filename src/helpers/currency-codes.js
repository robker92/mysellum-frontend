// export { getCurrencySymbol };

export function getCurrencySymbolHelper(currencyCode) {
  if (currencyCode === "USD") {
    return "$";
  }
  return "€";
}
