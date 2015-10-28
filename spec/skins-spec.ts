/// <reference path="import" />

import { api } from "../build/main";

describe("skins", () => {

	describe("getIds", () => {

		it("must get the ids", done => {
			api.skins.getIds().then(ids => {
				expect(Array.isArray(ids)).toBe(true);
				done();
			}).catch(e => {
				throw e;
			});
		});
	});

	describe("get", () => {

		it("must get the skins", done => {
			api.skins.getIds().then(ids => {
				api.skins.get(ids[0]).then(skin => {
					expect(typeof skin.id).toBe("number");
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