/// <reference path="import" />

import { api } from "../build/main";

describe("achievements", () => {

	describe("getIds", () => {

		it("must get the ids", done => {
			api.achievements.getIds().then(ids => {
				expect(Array.isArray(ids)).toBe(true);
				done();
			}).catch(e => {
				throw e;
			});
		});
	});

	describe("get", () => {

		it("must get the achievement", done => {
			api.achievements.getIds().then(ids => {
				api.achievements.get(ids[0]).then(achievement => {
					expect(typeof achievement.id).toBe("number");
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