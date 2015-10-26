import { BASE_URI } from "../config";
import xhr from "../../xhr";

const URI = `${BASE_URI}/v2/currencies`;

type Currency = {
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

function getIds() {
	return xhr<number[]>(URI);
}

function getCurrency(id: number, lang?: string) {
	return new Promise<Currency>((resolve, reject) => {
		getCurrencies([id], lang).then(currencies => {
			resolve(currencies[0]);
		}).catch(reject);
	});
}

function getCurrencies(ids: number[], lang?: string) {
	let request: xhr.Options = {
		uri: URI,
		data: {
			ids: ids.join(",")
		}
	};
	if (lang) {
		request.data.lang = lang;
	}
	return xhr<Currency[]>(request);
}

function get(id: number, lang?: string): Promise<Currency>;
function get(ids: number[], lang?: string): Promise<Currency[]>;
function get(idOrIds: number | number[], lang?: string): Promise<Currency | Currency[]> {
	return typeof idOrIds === "number"? getCurrency(idOrIds, lang) : getCurrencies(idOrIds, lang);
}

export {
	getIds,
	get
};