/// <reference path="import" />

import { api } from "../build/main";

describe("traits", () => {

	describe("getIds", () => {

		it("must get the ids", done => {
			api.traits.getIds().then(ids => {
				expect(Array.isArray(ids)).toBe(true);
				done();
			}).catch(e => {
				throw e;
			});
		});
	});

	describe("get", () => {

		it("must get the traits", done => {
			api.traits.getIds().then(ids => {
				api.traits.get(ids[0]).then(trait => {
					expect(typeof trait.id).toBe("number");
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