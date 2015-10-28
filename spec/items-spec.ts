/// <reference path="import" />

import { api } from "../build/main";

describe("items", () => {

	describe("getIds", () => {

		it("must get the ids", done => {
			api.items.getIds().then(ids => {
				expect(Array.isArray(ids)).toBe(true);
				done();
			}).catch(e => {
				throw e;
			});
		});
	});

	describe("get", () => {

		it("must get the items", done => {
			api.items.getIds().then(ids => {
				api.items.get(ids[0]).then(item => {
					expect(typeof item.id).toBe("number");
					done();
				}).catch(e => {
					throw e;
				});
			}).catch(e => {
				throw e;
			});
		});
	});
});