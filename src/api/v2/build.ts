import { BASE_URI } from "../config";
import xhr from "../../xhr";

const URI = `${BASE_URI}/v2/build`;

type Build = {
	id: number;
};


/**
 * This resource returns the current build id of the game. This can be used to for example register when event timers reset due to server restarts.
 *
 * @see http://wiki.guildwars2.com/wiki/API:1/build
 */
function get() {
	return new Promise<number>((resolve, reject) => {
		xhr<Build>(URI).then(response => {
			resolve(response.id);
		}).catch(reject);
	});
}

export {
	get
};