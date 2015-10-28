/// <reference path="import" />

import { api } from "../build/main";

describe("worlds", () => {

	describe("getIds", () => {

		it("must get the ids", done => {
			api.worlds.getIds().then(ids => {
				expect(Array.isArray(ids)).toBe(true);
				done();
			}).catch(e => {
				throw e;
			});
		});
	});

	describe("get", () => {

		it("must get the worlds", done => {
			api.worlds.getIds().then(ids => {
				api.worlds.get(ids[0]).then(world => {
					expect(typeof world.id).toBe("number");
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