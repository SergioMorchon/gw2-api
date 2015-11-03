import Client from "./client";
import { BASE_URI } from "../config";

const URI = `${BASE_URI}/v2/currencies`;

export type Currency = {
	/**
	 * The currency's ID.
	 */
	id: number;
	/**
	 * A description of the currency.
	 */
	name: string;
	/**
	 * A URL to an icon for the currency.
	 */
	icon: string;
	/**
	 * A number that can be used to sort the list of currencies when ordered from least to greatest.
	 */
	order: number;
};

export class CurrenciesClient extends Client<number, Currency> {
	constructor() {
		super(URI);
	}
}

export default new CurrenciesClient();