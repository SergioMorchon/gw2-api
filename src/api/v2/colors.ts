import Client from "./client";
import { BASE_URI } from "../config";

const URI = `${BASE_URI}/v2/colors`;

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
	 * The color id.
	 */
	id: number;
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

class ColorsClient extends Client<number, Color> {
	constructor() {
		super(URI);
	}
}

export default new ColorsClient();