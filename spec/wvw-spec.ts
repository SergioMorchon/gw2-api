/// <reference path="import" />

import { api } from "../build/main";

describe("wvw", () => {

	describe("matches", () => {

		describe("getIds", () => {

			it("must get the ids", done => {
				api.wvw.matches.getIds().then(ids => {
					expect(Array.isArray(ids)).toBe(true);
					done();
				}).catch(e => {
					throw e;
				});
			});
		});

		describe("get", () => {

			it("must get the matches", done => {
				api.wvw.matches.getIds().then(ids => {
					api.wvw.matches.get(ids[0]).then(price => {
						expect(typeof price.id).toBe("string");
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

	describe("objectives", () => {

		describe("getIds", () => {

			it("must get the ids", done => {
				api.wvw.objectives.getIds().then(ids => {
					expect(Array.isArray(ids)).toBe(true);
					done();
				}).catch(e => {
					throw e;
				});
			});
		});

		describe("get", () => {

			it("must get the objectives", done => {
				api.wvw.objectives.getIds().then(ids => {
					api.wvw.objectives.get(ids[0]).then(price => {
						expect(typeof price.id).toBe("string");
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
});