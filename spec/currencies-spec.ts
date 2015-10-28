/// <reference path="import" />

import { api } from "../build/main";

describe("currencies", () => {

	describe("getIds", () => {

		it("must get the ids", done => {
			api.currencies.getIds().then(ids => {
				expect(Array.isArray(ids)).toBe(true);
				done();
			}).catch(e => {
				throw e;
			});
		});
	});

	describe("get", () => {

		it("must get the currency", done => {
			api.currencies.getIds().then(ids => {
				api.currencies.get(ids[0]).then(currency => {
					expect(typeof currency.id).toBe("number");
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