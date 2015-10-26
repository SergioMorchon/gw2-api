import { BASE_URI } from "../config";
import xhr from "../../xhr";

const URI = `${BASE_URI}/v2/files`;

type File = {
	/**
	 * The file identifier.
	 */
	id: string;
	/**
	 * The URL to the image.
	 */
	icon: string;
};

function getIds() {
	return xhr<number[]>(URI);
}

function getFile(id: string, lang?: string) {
	return new Promise((resolve, reject) => {
		getFiles([id], lang).then(specializations => {
			resolve(specializations[0]);
		}).catch(reject);
	});
}

function getFiles(ids: string[], lang?: string) {
	let request: xhr.Options = {
		uri: URI,
		data: {
			ids: ids.join(",")
		}
	};
	if (lang) {
		request.data.lang = lang;
	}
	return xhr<File[]>(request);
}

function get(id: string, lang?: string): Promise<File>;
function get(ids: string[], lang?: string): Promise<File[]>;
function get(idOrIds: string | string[], lang?: string): Promise<File | File[]> {
	return typeof idOrIds === "string"? getFile(idOrIds, lang) : getFiles(idOrIds, lang);
}

export {
	getIds,
	get
};