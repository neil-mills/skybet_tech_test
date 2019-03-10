export const formatPrice = (price, isDecimal) => {
    const { decimal, num, den } = price;
    price = isDecimal ? Number(decimal).toFixed(2) : `${num}/${den}`;
    return price;
}