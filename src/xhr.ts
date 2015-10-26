/// <reference path="import" />

const STATUS_OK = 200;

const STATE_UNINITIALIZED = 0;
const STATE_LOADING = 1;
const STATE_LOADED = 2;
const STATE_INTERACTIVE = 3;
const STATE_COMPLETED = 4;

function buildUriWithParams(uri: string, params: any) {
	return `${uri}?${Object.keys(params).map(key => `${key}=${params[key]}`).join("&")}`;
}

function xhr<T>(options: xhr.Options): Promise<T>;
function xhr<T>(url: string): Promise<T>;
function xhr<T>(optionsOrUrl: xhr.Options | string) {
	return new Promise<T>((resolve, reject) => {
		
		let options = typeof optionsOrUrl === "string"? <xhr.Options>{
			uri: optionsOrUrl
		} : optionsOrUrl;
		options.method = (options.method || "get").toLowerCase();
		let req = new XMLHttpRequest();

		function doReject() {
			reject(req);
		}

		function doResolve() {
			if (req.readyState === STATE_COMPLETED && req.status === STATUS_OK) {
				resolve(JSON.parse(req.responseText));
			} else {
				doReject();
			}
		}

		req.addEventListener("load", doResolve);
		req.addEventListener("error", doReject);
		req.addEventListener("abort", doReject);

		if (options.data) {
			options.uri = buildUriWithParams(options.uri, options.data);
		}
		req.open(options.method, options.uri, true);
		switch (options.method) {
			case "get":
				req.send();
				break;
			default:
				req.send(options.data);
		}
	});
};

namespace xhr {
	export interface Options {
		uri: string;
		method?: string,
		data?: any;
	}
}

export default xhr;