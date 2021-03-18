import { MAX_HEARTS } from "../constants/Constants";

export enum Currency {
	coins = "coins",
	usd = "usd",
}
export interface Product {
	id: number;
	title: string;
	image: any;
	currency: Currency;
    description: string;
	price: number;
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
	},
	{
		id: 2,
		title: "Refill hearts",
		image: require("../assets/images/products/hearts.png"),
		description: `Refill ${MAX_HEARTS} hearts once.`,
		currency: Currency.coins,
		price: 200,
	},
];
