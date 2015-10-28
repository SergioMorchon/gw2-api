/// <reference path="import" />

import { api } from "../build/main";

describe("quaggans", () => {

	describe("getIds", () => {

		it("must get the ids", done => {
			api.quaggans.getIds().then(ids => {
				expect(Array.isArray(ids)).toBe(true);
				done();
			}).catch(e => {
				throw e;
			});
		});
	});

	describe("get", () => {

		it("must get the quaggans", done => {
			api.quaggans.getIds().then(ids => {
				api.quaggans.get(ids[0]).then(quaggan => {
					expect(typeof quaggan.id).toBe("string");
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