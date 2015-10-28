/// <reference path="import" />

import { api } from "../build/main";

describe("materials", () => {

	describe("getIds", () => {

		it("must get the ids", done => {
			api.materials.getIds().then(ids => {
				expect(Array.isArray(ids)).toBe(true);
				done();
			}).catch(e => {
				throw e;
			});
		});
	});

	describe("get", () => {

		it("must get the materials", done => {
			api.materials.getIds().then(ids => {
				api.materials.get(ids[0]).then(material => {
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