import { BASE_URI } from "../config";
import xhr from "../../xhr";

const URI = `${BASE_URI}/v2/specializations`;

type Specialization = {
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

function getIds() {
	return xhr<number[]>(URI);
}

function getSpecialization(id: number, lang?: string) {
	return new Promise((resolve, reject) => {
		getSpecializations([id], lang).then(specializations => {
			resolve(specializations[0]);
		}).catch(reject);
	});
}

function getSpecializations(ids: number[], lang?: string) {
	let request: xhr.Options = {
		uri: URI,
		data: {
			ids: ids.join(",")
		}
	};
	if (lang) {
		request.data.lang = lang;
	}
	return xhr<Specialization[]>(request);
}

function get(id: number, lang?: string): Promise<Specialization>;
function get(ids: number[], lang?: string): Promise<Specialization[]>;
function get(idOrIds: number | number[], lang?: string): Promise<Specialization | Specialization[]> {
	return typeof idOrIds === "number"? getSpecialization(idOrIds, lang) : getSpecializations(idOrIds, lang);
}

export {
	getIds,
	get
};