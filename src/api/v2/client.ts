import xhr from "../../xhr";

export type XhrParams = {[name: string]: string};

abstract class Client<Id, Item> {
	private url: string;
	
	constructor(url: string) {
		this.url = url;
	}
	
	protected xhr<T>(params?: XhrParams) {
		return xhr<T>(this.url, params);
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
		let data = Object.create(params);
		if (Array.isArray(idOrIds)) {
			data["ids"] = (<Id[]>idOrIds).join(",");
			return xhr<Item[]>(this.url, data);
		} else {
			return xhr<Item>(`${this.url}/${idOrIds}`, params);
		}
	}
}

export default Client;