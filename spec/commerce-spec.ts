/// <reference path="import" />

import { api } from "../build/main";

describe("commerce", () => {

	describe("prices", () => {

		describe("getIds", () => {

			it("must get the ids", done => {
				api.commerce.prices.getIds().then(ids => {
					expect(Array.isArray(ids)).toBe(true);
					done();
				}).catch(e => {
					throw e;
				});
			});
		});

		describe("get", () => {

			it("must get the prices", done => {
				api.commerce.prices.getIds().then(ids => {
					api.commerce.prices.get(ids[0]).then(price => {
						expect(typeof price.id).toBe("number");
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