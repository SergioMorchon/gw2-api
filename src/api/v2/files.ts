import Client from "./client";
import { BASE_URI } from "../config";

const URI = `${BASE_URI}/v2/files`;

type File = {
	/**
	 * The file identifier.
	 */
	id: string;
	/**
	 * The URL to the image.
	 */
	icon: string;
};

class FilesClient extends Client<string, File> {
	constructor() {
		super(URI);
	}
}

export default new FilesClient();