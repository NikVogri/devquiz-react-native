export const convertFromCents = (priceInCents: number) => {
	const price = priceInCents / 100;
	if (price === Math.round(price)) {
		return price + ".00";
	}

	return price;
};
