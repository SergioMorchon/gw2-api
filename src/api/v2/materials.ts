import Client from "./client";
import { BASE_URI } from "../config";

const URI = `${BASE_URI}/v2/materials`;

type Material = {
	/**
	 * The category id.
	 */
	id: number;
	/**
	 * The category name.
	 */
	name: string;
	/**
	 * The ids of the items in this category.
	 */
	items: number[];
};

class MaterialClient extends Client<number, Material> {
	constructor() {
		super(URI);
	}
}

export default new MaterialClient();