import Client from "./client";
import { BASE_URI } from "../config";

const URI = `${BASE_URI}/v2/worlds`;

export type World = {
	/**
	 * The world id.
	 */
	id: number;
	/**
	 * The world name.
	 */
	name: string;
	/**
	 * The world population level. One of: Low, Medium, High, VeryHigh, Full
	 */
	population: string;
};

export class WorldClient extends Client<number, World> {
	constructor() {
		super(URI);
	}
}

export default new WorldClient();