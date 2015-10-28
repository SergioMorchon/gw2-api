import Client from "./client";
import { BASE_URI } from "../config";

const URI = `${BASE_URI}/v2/files`;

export type File = {
	/**
	 * The file identifier.
	 */
	id: string;
	/**
	 * The URL to the image.
	 */
	icon: string;
};

export class FilesClient extends Client<string, File> {
	constructor() {
		super(URI);
	}
}

export default new FilesClient();