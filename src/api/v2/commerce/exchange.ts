import { BASE_URI } from "../../config";
import xhr from "../../../xhr";

const URI = `${BASE_URI}/v2/commerce/exchange`;

function getAll() {
	return xhr<string[]>(URI);
}

export {
	getAll
};