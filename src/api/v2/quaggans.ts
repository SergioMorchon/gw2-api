import Client from "./client";
import { BASE_URI } from "../config";

const URI = `${BASE_URI}/v2/quaggans`;

export type Quaggan = {
	/**
	 * The quaggan identifier.
	 */
	id: string;
	/**
	 * The URL to the quaggan image.
	 */
	url: string;
};

export class QuagganClient extends Client<string, Quaggan> {
	constructor() {
		super(URI);
	}
}

export default new QuagganClient();