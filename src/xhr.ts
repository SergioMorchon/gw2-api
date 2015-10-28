/// <reference path="import" />

declare var require;

const STATUS_OK = 200;

const STATE_UNINITIALIZED = 0;
const STATE_LOADING = 1;
const STATE_LOADED = 2;
const STATE_INTERACTIVE = 3;
const STATE_COMPLETED = 4;

type Options = {
	uri: string;
	method?: string,
	data?: any;
};

interface Xhr {
	send<T>(url: string, data?: any): Promise<T>;
}

function hasXMLHttpRequest() {
	return typeof XMLHttpRequest !== "undefined";
}

let nodeHttps = hasXMLHttpRequest()? null : require("https");

class BrowserXhr implements Xhr {
	send<T>(url: string, data: any): Promise<T> {
		return new Promise<T>((resolve, reject) => {
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
	
			if (data) {
				url = buildUriWithParams(url, data);
			}
			req.open("get", url, true);
			req.send();
		});
	}
}

class NodeXhr implements Xhr {
	send<T>(url: string, data?: any): Promise<T> {
		return new Promise<T>((resolve, reject) => {
			if (data) {
				url = buildUriWithParams(url, data);
			}
			nodeHttps.get(url, req => {
				let response = "";
				req.on("data", data => {
					response += data;
				}).on("end", () => {
					resolve(<T>JSON.parse(response));
				}).on("error", reject).on("abort", reject);
				
			}).on("error", e => {
				reject(e);
			});
		});
	}
}


function buildUriWithParams(uri: string, params: any) {
	return `${uri}?${Object.keys(params).map(key => `${key}=${params[key]}`).join("&")}`;
}

function getXhr() {
	return hasXMLHttpRequest()? new BrowserXhr() : new NodeXhr();
}

let XHR = getXhr();

function xhr<T>(url: string, data?: any): Promise<T> {
	return XHR.send<T>(url, data);
};

export default xhr;