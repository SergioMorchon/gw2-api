import { BASE_URI } from "../config";
import xhr from "../../xhr";

const URI = `${BASE_URI}/v2/quaggans`;

type Quaggan = {
	/**
	 * The quaggan identifier.
	 */
	id: string;
	/**
	 * The URL to the quaggan image.
	 */
	url: string;
};

function getIds() {
	return xhr<number[]>(URI);
}

function getQuaggan(id: string, lang?: string) {
	return new Promise((resolve, reject) => {
		getQuaggans([id], lang).then(quaggans => {
			resolve(quaggans[0]);
		}).catch(reject);
	});
}

function getQuaggans(ids: string[], lang?: string) {
	return new Promise<Quaggan>((resolve, reject) => {
		let request: xhr.Options = {
			uri: URI,
			data: {
				ids: ids.join(",")
			}
		};
		if (lang) {
			request.data.lang = lang;
		}
		xhr(request).then(resolve).catch(reject);
	});
}

function get(id: string, lang?: string): Promise<Quaggan>;
function get(ids: string[], lang?: string): Promise<Quaggan[]>;
function get(idOrIds: string | string[], lang?: string): Promise<Quaggan | Quaggan[]> {
	return typeof idOrIds === "string"? getQuaggan(idOrIds, lang) : getQuaggans(idOrIds, lang);
}

export {
	getIds,
	get
};