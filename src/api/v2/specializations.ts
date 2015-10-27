import Client from "./client";
import { BASE_URI } from "../config";

const URI = `${BASE_URI}/v2/specializations`;

export type Specialization = {
	/**
	 * The specialization's ID.
	 */
	id: number;
	/**
	 * The name of the specialization.
	 */
	name: string;
	/**
	 * The profession that this specialization belongs to.
	 */
	profession: string;
	/**
	 * if this specialization is an Elite Specialization, false otherwise.
	 */
	elite: boolean;
	/**
	 * A URL to an icon of the specialization.
	 */
	icon: string;
	/**
	 * A URL to the background image of the specialization.
	 */
	background: string;
	/**
	 * Contains a list of IDs specifying the minor traits in the specialization.
	 */
	minor_traits: number[];
	/**
	 * Contains a list of IDs specifying the major traits in the specialization.
	 */
	major_traits: number[];
};

export class SpecializationClient extends Client<number, Specialization> {
	constructor() {
		super(URI);
	}
}

export default new SpecializationClient();