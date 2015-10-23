import { BASE_URI } from "../config";
import xhr from "../../xhr";

const URI = `${BASE_URI}/v2/worlds`;

type World = {
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

function getIds() {
	return new Promise<number[]>((resolve, reject) => {
		xhr(URI).then(response => {
			resolve(<number[]>JSON.parse(response));
		}).catch(reject);
	});
}

function getWorlds(ids: number[], lang?: string) {
	return new Promise<World[]>((resolve, reject) => {
		let request: xhr.Options = {
			uri: URI,
			data: {
				ids
			}
		};
		xhr(request).then(response => {
			resolve(<World[]>JSON.parse(response));
		}).catch(reject);
	});
}

function getWorld(id: number, lang?: string) {
	return new Promise<World>((resolve, reject) => {
		getWorlds([id], lang).then(worlds => {
			resolve(worlds[0]);
		}).catch(reject);
	});
}

function get(id: number, lang?: string): Promise<World>;
function get(ids: number[], lang?: string): Promise<World[]>;
function get(idOrIds: number | number[], lang?: string): Promise<World | World[]> {
	return typeof idOrIds === "number"? getWorld(idOrIds, lang) : getWorlds(idOrIds, lang);
}

export {
	getIds,
	get
};