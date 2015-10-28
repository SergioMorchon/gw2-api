import Client from "../client";
import { BASE_URI } from "../../config";

const URI = `${BASE_URI}/v2/commerce/prices`;

export type Buy = {
	/**
	 * The highest buy order or lowest sell offer price in coins.
	 */
	unit_price: number;
	/**
	 * The amount of items being sold/bought.
	 */
	quantity: number;
};

export type Sell = Buy;

export type Price = {
	/**
	 * The item id.
	 */
	id: number;
	/**
	 * Buy information.
	 */
	buys: Buy;
	/**
	 * Sell information.
	 */
	sells: Sell;
};

export class PricesClient extends Client<number, Price> {
	constructor() {
		super(URI);
	}
}

export default new PricesClient();