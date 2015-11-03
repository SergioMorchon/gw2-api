import { BASE_URI } from "../../config";
import xhr from "../../../xhr";

const URI = `${BASE_URI}/v2/recipes/search`;

function searchInput(recipe: number) {
	return xhr<number[]>(URI, {
		input: recipe
	});
}

function searchOutput(recipe: number) {
	return xhr<number[]>(URI, {
		output: recipe
	});
}

export {
	searchInput as input,
	searchOutput as output
};