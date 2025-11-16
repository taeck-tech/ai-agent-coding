const USDollar = Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export const formatPrice = (value: number) => USDollar.format(value);

const NumberFormat = Intl.NumberFormat("en-US");

export const formatNumber = (value: number) => NumberFormat.format(value);
