import Client from "../client";
import { BASE_URI } from "../../config";
import * as Prices from "./prices";

const URI = `${BASE_URI}/v2/commerce/listings`;


export type Buy = {
	/**
	 * The number of individual listings this object refers to (e.g. two players selling at the same price will end up in the same listing).
	 */
	listings: number;
} & Prices.Buy;

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