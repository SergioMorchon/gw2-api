import Client from "../client";
import { BASE_URI } from "../../config";

const URI = `${BASE_URI}/v2/wvw/objectives`;

export type Coord3D = [number, number, number];
export type Coord2D = [number, number, number];

export type Objective = {
	/**
	 * The objective id.
	 */
	id: string;
	/**
	 * The name of the objective.
	 */
	name: string;
	/**
	 * The type of the objective. Possible values include:
     * 	- Camp
     * 	- Castle
     * 	- Keep
     * 	- Mercenary
     * 	- Tower
     * 	- Ruins
     * 	- Resource
     * 	- Generic
     * 	- Spawn
	 */
	type: string;
	/**
	 * The map sector the objective can be found in.
	 */
	sector_id: number;
	/**
	 * The ID of the map that this objective can be found on.
	 */
	map_id: number;
	/**
	 * The map that this objective can be found on. One of: GreenHome, BlueHome, RedHome, Center, or EdgeOfTheMists.
	 */
	map_type: string;
	/**
	 * An array of three numbers representing the X, Y and Z coordinates of the objectives marker on the map.
	 */
	coord: Coord3D;
	/**
	 * An array of two numbers representing the X and Y coordinates of the sector centroid.
	 */
	label_coord: Coord2D;
	/**
	 * The icon link.
	 */
	marker: string;
};

export class ObjectivesClient extends Client<string, Objective> {
	constructor() {
		super(URI);
	}
}

export default new ObjectivesClient();