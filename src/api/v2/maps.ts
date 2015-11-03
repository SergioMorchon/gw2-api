import Client from "./client";
import { BASE_URI } from "../config";
import { Coord2D, Coord3D } from "./common";

const URI = `${BASE_URI}/v2/maps`;

export type Rectangle = [Coord2D, Coord2D];

export type Map = {
	/**
	 * The map id.
	 */
	id: number;
	/**
	 * The map name.
	 */
	name: string;
	/**
	 * The minimal level of this map.
	 */
	min_level: number;
	/**
	 * The maximum level of this map.
	 */
	max_level: number;
	/**
	 * The default floor of this map.
	 */
	default_floor: number;
	/**
	 * A list of available floors for this map.
	 */
	floors: number[];
	/**
	 * The id of the region this map belongs to.
	 */
	region_id: number;
	/**
	 * The name of the region this map belongs to.
	 */
	region_name: string;
	/**
	 * The id of the continent this map belongs to.
	 */
	continent_id: number;
	/**
	 * The name of the continent this map belongs to.
	 */
	continent_name: string;
	/**
	 * The dimensions of the map, given as the coordinates of the lower-left (SW) and upper-right (NE) corners.
	 */
	map_rect: Rectangle;
	/**
	 * The dimensions of the map within the continent coordinate system, given as the coordinates of the upper-left (NW) and lower-right (SE) corners.
	 */
	continent_rect: Rectangle;
};

export class MapsClient extends Client<number, Map> {
	constructor() {
		super(URI);
	}
}

export default new MapsClient();