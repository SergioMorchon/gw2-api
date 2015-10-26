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
	return new Promise<string[]>((resolve, reject) => {
		xhr(URI).then(response => {
			resolve(<string[]>JSON.parse(response));
		}).catch(reject);
	});
}

function getFile(id: string, lang?: string) {
	return new Promise((resolve, reject) => {
		getFiles([id], lang).then(specializations => {
			resolve(specializations[0]);
		}).catch(reject);
	});
}

function getFiles(ids: string[], lang?: string) {
	return new Promise<File>((resolve, reject) => {
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
			resolve(<File>JSON.parse(response));
		}).catch(reject);
	});
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