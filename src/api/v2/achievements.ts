import Client from "./client";
import { BASE_URI } from "../config";

const URI = `${BASE_URI}/v2/achievements`;

export type Achievement = {
	/**
	 * The achievement id.
	 */
	id: number;
	/**
	 * The achievement name.
	 */
	name: string;
	/**
	 * The achievement description.
	 */
	description: string;
	/**
	 * The achievement icon.
	 */
	icon?: string;
	/**
	 * The achievement requirement as listed in-game.
	 */
	requirement: string;
	/**
	 * The achievement type. Possible values:
	 * 	- Default - A default achievement.
     * 	- ItemSet - Achievement is linked to Collections.
	 */
	type: string;
	/**
	 * Achievement categories. Possible values:
	 * 	- Pvp - can only get progress in PvP or WvW.
     * 	- CategoryDisplay - is a meta achievement.
     * 	- MoveToTop - affects in-game UI collation.
     * 	- IgnoreNearlyComplete - doesn't appear in the "nearly complete" UI.
	 */
	flags: string[];
};

export class AchievementsClient extends Client<number, Achievement> {
	constructor() {
		super(URI);
	}
}

export default new AchievementsClient();