import Client from "./client";
import { BASE_URI } from "../config";

const URI = `${BASE_URI}/v2/skins`;

export type ArmorDetails = {
	/**
	 * The armor type (slot).
	 */
	type: string;
	/**
	 * The armor weight, either Clothing, Light, Medium or Heavy.
	 */
	weight_class: string;
};

export type WeaponDetails = {
	/**
	 * The weapon type.
	 */
	type: string;
	/**
	 * The damage type, either Physical, Fire, Lightning, or Ice.
	 */
	damage_type: string;
};

export type Skin = {
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

export class SkinClient extends Client<number, Skin> {
	constructor() {
		super(URI);
	}
}

export default new SkinClient();