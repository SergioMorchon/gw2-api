import xhr from "../../xhr";

type XhrParams = {[name: string]: string};

class Client<Id, Item> {
	private url: string;
	
	constructor(url: string) {
		this.url = url;
	}
	
	protected xhr<T>(params?: XhrParams) {
		let request: xhr.Options = {
			uri: this.url
		};
		if (params) {
			request.data = params;
		}
		return xhr<T>(request);
	}
	
	getAll(params: XhrParams = {}) {
		params["ids"] = "all";
		return this.xhr<Item[]>(params);
	}
	
	getIds(params?: XhrParams) {
		return this.xhr<Id[]>(params);
	}
	
	get(id: Id, params?: XhrParams): Promise<Item>;
	get(ids: Id[], params?: XhrParams): Promise<Item[]>;
	get(idOrIds: Id | Id[], params: XhrParams = {}): Promise<Item | Item[]> {
		let request: xhr.Options = Object.create(params);
		if (Array.isArray(idOrIds)) {
		request.uri = this.url;
			request.data = request.data || {};
			request.data["ids"] = (<Id[]>idOrIds).join(",");
			return xhr<Item[]>(request);
		} else {
			request.uri = `${this.url}/${idOrIds}`;
			if (params) {
				request.data = params;
			}
			return xhr<Item>(request);
		}
	}
}

export default Client;