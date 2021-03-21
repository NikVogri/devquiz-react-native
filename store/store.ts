export enum Currency {
	coins = "coins",
	usd = "usd",
}

export enum ProductType {
	refill_hearts = "refill_hearts",
	purchase_gold_coins = "purchase_gold_coins",
}
export interface Product {
	id: number;
	title: string;
	image: any;
	currency: Currency;
	description: string;
	price: number;
	type: ProductType;
}

export default [
	{
		id: 1,
		title: "200 gold coins",
		image: require("../assets/images/products/coins.png"),
		currency: Currency.usd,
		description:
			"Purchase 200 gold coins that you can use to unlock quizes and refill hearts.",
		price: 200,
		type: ProductType.purchase_gold_coins,
	},
	{
		id: 2,
		title: "Refill hearts",
		image: require("../assets/images/products/hearts.png"),
		description: `Refills your hearts.`,
		currency: Currency.coins,
		price: 200,
		type: ProductType.refill_hearts,
	},
];
