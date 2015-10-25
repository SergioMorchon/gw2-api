import { BASE_URI } from "../config";
import xhr from "../../xhr";

const URI = `${BASE_URI}/v2/skins`;

type ArmorDetails = {
	/**
	 * The armor type (slot).
	 */
	type: string;
	/**
	 * The armor weight, either Clothing, Light, Medium or Heavy.
	 */
	weight_class: string;
};

type WeaponDetails = {
	/**
	 * The weapon type.
	 */
	type: string;
	/**
	 * The damage type, either Physical, Fire, Lightning, or Ice.
	 */
	damage_type: string;
};

type Skin = {
	/**
	 * The skin id.
	 */
	id: number;
	/**
	 * The name of the skin.
	 */
	name: string;
	/**
	 * The skin type, either Armor, Weapon, or Back.
	 */
	type: string;
	/**
	 * Additional skin flags. Possible flags are:
	 * 	- ShowInWardrobe – When displayed in the account wardrobe (set for all skins listed in the API).
	 * 	- NoCost – When applying the skin is free.
	 * 	- HideIfLocked – When the skin is hidden until it is unlocked.
	 */
	flags: string[];
	/**
	 * Race restrictions that apply to the skin, e.g. Human will be a listed restriction, if the skin can only be applies to human characters.
	 */
	restrictions: string[];
	/**
	 * The full icon URL.
	 */
	icon: string;
	/**
	 * Optional skin description.
	 */
	description: string;
	/**
	 * Additional skin details if applicable, depending on the skin type (see below).
	 */
	details?: ArmorDetails | WeaponDetails;
};

function getIds() {
	return new Promise<number[]>((resolve, reject) => {
		xhr(URI).then(response => {
			resolve(<number[]>JSON.parse(response));
		}).catch(reject);
	});
}

function getSkin(id: number, lang?: string) {
	return new Promise<Skin>((resolve, reject) => {
		let request: xhr.Options = {
			uri: `${URI}/${id}`
		};
		if (lang) {
			request.data.lang = lang;
		}
		xhr(request).then(response => {
			resolve(<Skin>JSON.parse(response));
		}).catch(reject);
	});
}

function getSkins(ids: number[], lang?: string) {
	return Promise.all(ids.map(id => getSkin(id)));
}

function get(id: number, lang?: string): Promise<Skin>;
function get(ids: number[], lang?: string): Promise<Skin[]>;
function get(idOrIds: number | number[], lang?: string): Promise<Skin | Skin[]> {
	return typeof idOrIds === "number"? getSkin(idOrIds, lang) : getSkins(idOrIds, lang);
}

export {
	getIds,
	get
};