import Client from "../client";
import { BASE_URI } from "../../config";

const URI = `${BASE_URI}/v2/wvw/matches`;

export type TeamTuple = {
	red: number;
	blue: number;
	green: number;
};

export type Bonus = {
	/**
	 * A shorthand name for the bonus. Currently can only be bloodlust.
	 */
	type: string;
	/**
	 * The current owner of the bonus. Can be any one of Red, Green, or Blue. Neutral-owned bonuses are not listed.
	 */
	owner: string;
};

export type Objective = {
	/**
	 * The objective id.
	 */
	id: string;
	/**
	 * The current owner of the objective. Can be any one of Red, Green, Blue or Neutral.
	 */
	owner: string;
	/**
	 * The time at which this objective was last captured by a server. (ISO-8601 Standard).
	 */
	last_flipped: string;
	/**
	 * The guild id of the guild currently claiming the objective, or null if not claimed.
	 */
	claimed_by: string;
	/**
	 * The time the objective was claimed by the claimed_by guild (ISO-8601 Standard), or null if not claimed.
	 */
	claimed_at: string;
	/**
	 * A list of all bonuses being granted by this map. If no player team owns a bonus from the map, this list is empty.
	 */
	bonuses: Bonus[];
};

export type Map = {
	/**
	 * The identifier for the map. Can be either RedHome, GreenHome or BlueHome for the borderlands or Center for Eternal Battlegrounds.
	 */
	type: string;
	/**
	 * An object containing the score of the three servers for only the specified map, under the values red, blue, and green.
	 */
	scores: TeamTuple;
	/**
	 * An object containing the total kills of the three servers for only the specified map, under the values red, blue, and green.
	 */
	kills: TeamTuple;
	/**
	 * An object containing the total deaths of the three servers for only the specified map, under the values red, blue, and green.
	 */
	deaths: TeamTuple;
	/**
	 * A list of objective objects for this map.
	 */
	objectives: Objective[];
};

export type Match = {
	/**
	 * The WvW match id.
	 */
	id: string;
	/**
	 * The starting time of the matchup. (ISO-8601 Standard).
	 */
    start_time: string;
	/**
	 * The ending time of the matchup. (ISO-8601 Standard).
	 */
    end_time: string;
	/**
	 * An object containing the score of the three servers, under the values red, blue, and green.
	 */
    scores: TeamTuple;
	/**
	 * An object containing the world IDs of the three servers, under the values red, blue, and green.
	 */
    worlds: TeamTuple;
	/**
	 * An object containing the total kills of the three servers, under the values red, blue, and green.
	 */
    kills: TeamTuple;
	/**
	 * An object containing the total deaths of the three servers, under the values red, blue, and green.
	 */
    deaths: TeamTuple;
	/**
	 * A list of objects containing detailed information about each of the four maps.
	 */
    maps: Map[];
};

export class MatchesClient extends Client<string, Match> {
	constructor() {
		super(URI);
	}
}

export default new MatchesClient();