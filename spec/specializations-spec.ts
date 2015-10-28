/// <reference path="import" />

import { api } from "../build/main";

describe("specializations", () => {

	describe("getIds", () => {

		it("must get the ids", done => {
			api.specializations.getIds().then(ids => {
				expect(Array.isArray(ids)).toBe(true);
				done();
			}).catch(e => {
				throw e;
			});
		});
	});

	describe("get", () => {

		it("must get the specializations", done => {
			api.specializations.getIds().then(ids => {
				api.specializations.get(ids[0]).then(specialization => {
					expect(typeof specialization.id).toBe("number");
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