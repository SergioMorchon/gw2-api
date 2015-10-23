import { BASE_URI } from "../config";
import xhr from "../../xhr";

const COLORS_URI = `${BASE_URI}/v2/colors`;

type RGB = [number, number, number];

type DetailedInformation = {
	/**
	 * The brightness
	 */
	brightness: number;
	/**
	 * The contrast.
	 */
	contrast: number;
	/**
	 * The hue in the HSL colorspace.
	 */
	hue: number;
	/**
	 * The saturation in the HSL colorspace.
	 */
	saturation: number;
	/**
	 * The lightness in the HSL colorspace.
	 */
	lightness: number;
	/**
	 * A list containing precalculated RGB values.
	 */
	rgb: RGB;
}

type Color = {
	/**
	 * The name of the dye.
	 */
	name: string;
	/**
	 * The base RGB values.
	 */
	baseRgb: RGB;
	/**
	 * Detailed information on its appearance when applied on cloth armor.
	 */
	cloth: DetailedInformation;
	leather: DetailedInformation;
	metal: DetailedInformation;
};

type ColorRequestMultiple = {
	ids: string;
	lang?: string;
};

type ColorIdsResponse = number[];


function getColors(ids: number[], lang?: string) {
	return new Promise<Color[]>((resolve, reject) => {
		let request: xhr.Options = {
			uri: COLORS_URI,
			data: {
				ids: ids.join()
			}
		};
		if (lang) {
			request.data.lang = lang;
		}
		xhr(request).then(response => {
			resolve(<Color[]>JSON.parse(response));
		}).catch(reject);
	});
}

function getColor(id: number, lang?: string) {
	return new Promise<Color>((resolve, reject) => {
		getColors([id], lang).then(colors => {
			resolve(colors[0]);
		}).catch(reject);
	});
}

/**
 * This resource returns all dyes in the game, including localized names and their color component information.
 *
 * @see http://wiki.guildwars2.com/wiki/API:2/colors
 * @param id The color id.
 * @param lang The language to query the names for.
 */
function get(id: number, lang?: string): Promise<Color>;
/**
 * This resource returns all dyes in the game, including localized names and their color component information.
 *
 * @see http://wiki.guildwars2.com/wiki/API:2/colors
 * @param ids The color ids.
 * @param lang The language to query the names for.
 */
function get(ids: number[], lang?: string): Promise<Color[]>;
function get(idOrIds: number | number[], lang?: string): Promise<Color | Color[]> {
	return Array.isArray(idOrIds)? getColors(<number[]>idOrIds) : getColor(<number>idOrIds);
}

function getIds() {
	return new Promise<ColorIdsResponse>((resolve, reject) => {
		xhr(COLORS_URI).then(response => {
			resolve(<ColorIdsResponse>JSON.parse(response));
		}).catch(reject);
	});
}

export {
	getIds,
	get
};