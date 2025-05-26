export const mixinCurrency = {
  computed: {
    currencyFormatter:  () => {
      const currencyFormatter = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
      });
      return currencyFormatter;
    },
  },
};
