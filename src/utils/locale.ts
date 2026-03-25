export const getDecimalSeparator = () => {
  const locale = getLocale();
  const numberWithDecimal = 1.1;
  const formatted = new Intl.NumberFormat(locale).format(numberWithDecimal);
  const separator = formatted.replace(/\d/g, "").trim();

  return separator || ".";
};

export const getLocale = () => {
  return navigator.language || "en-US";
};
