import { BASE_URI } from "../config";
import xhr from "../../xhr";

const URI = `${BASE_URI}/v2/materials`;

type material = {
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

function getIds() {
	return new Promise<number[]>((resolve, reject) => {
		xhr(URI).then(response => {
			resolve(<number[]>JSON.parse(response));
		}).catch(reject);
	});
}

function getMaterial(id: number, lang?: string) {
	return new Promise<material>((resolve, reject) => {
		getMaterials([id], lang).then(materials => {
			resolve(materials[0]);
		}).catch(reject);
	});
}

function getMaterials(ids: number[], lang?: string) {
	return new Promise<material>((resolve, reject) => {
		let request: xhr.Options = {
			uri: URI,
			data: {
				ids: ids.join(",")
			}
		};
		if (lang) {
			request.data.lang = lang;
		}
		xhr(request).then(response => {
			resolve(<material>JSON.parse(response));
		}).catch(reject);
	});
}

function get(id: number, lang?: string): Promise<material>;
function get(ids: number[], lang?: string): Promise<material[]>;
function get(idOrIds: number | number[], lang?: string): Promise<material | material[]> {
	return typeof idOrIds === "number"? getMaterial(idOrIds, lang) : getMaterials(idOrIds, lang);
}

export {
	getIds,
	get
};