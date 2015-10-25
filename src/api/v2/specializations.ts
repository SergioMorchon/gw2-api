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
	return new Promise<number[]>((resolve, reject) => {
		xhr(URI).then(response => {
			resolve(<number[]>JSON.parse(response));
		}).catch(reject);
	});
}

function getSpecialization(id: number, lang?: string) {
	return new Promise<Specialization>((resolve, reject) => {
		let request: xhr.Options = {
			uri: `${URI}/${id}`
		};
		if (lang) {
			request.data.lang = lang;
		}
		xhr(request).then(response => {
			resolve(<Specialization>JSON.parse(response));
		}).catch(reject);
	});
}

function getSpecializations(ids: number[], lang?: string) {
	return Promise.all(ids.map(id => getSpecialization(id)));
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