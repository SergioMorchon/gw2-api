/// <reference path="import" />

import { api } from "../build/main";

describe("maps", () => {

	describe("getIds", () => {

		it("must get the ids", done => {
			api.maps.getIds().then(ids => {
				expect(Array.isArray(ids)).toBe(true);
				done();
			}).catch(e => {
				throw e;
			});
		});
	});

	describe("get", () => {

		it("must get the maps", done => {
			api.maps.getIds().then(ids => {
				api.maps.get(ids[0]).then(material => {
					expect(typeof material.id).toBe("number");
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