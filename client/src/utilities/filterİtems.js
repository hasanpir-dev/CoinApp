function filterItems(items, filterParams) {
  return items.filter((item) => {
    return Object.entries(filterParams).every(([key, value]) => {
      if (key === "yearFrom" || key === "yearTo") {
        const year = item.year || "";
        const startYear =
          filterParams.yearFrom !== ""
            ? parseInt(filterParams.yearFrom, 10)
            : Number.MIN_VALUE;
        const endYear =
          filterParams.yearTo !== ""
            ? parseInt(filterParams.yearTo, 10)
            : Number.MAX_VALUE;
        return year >= startYear && year <= endYear;
      } else if (key === "priceFrom" || key === "priceTo") {
        const price = item.price || "";
        const startPrice =
          filterParams.priceFrom !== ""
            ? parseInt(filterParams.priceFrom, 10)
            : Number.MIN_VALUE;
        const endPrice =
          filterParams.priceTo !== ""
            ? parseInt(filterParams.priceTo, 10)
            : Number.MAX_VALUE;
        return price >= startPrice && price <= endPrice;
      } else if (value !== "") {
        return (
          item[key] && item[key].toLowerCase().includes(value.toLowerCase())
        );
      }
      return true;
    });
  });
}

export default filterItems;
