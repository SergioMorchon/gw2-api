/// <reference path="import" />

import { api } from "../build/main";

describe("recipes", () => {

	describe("getIds", () => {

		it("must get the ids", done => {
			api.recipes.getIds().then(ids => {
				expect(Array.isArray(ids)).toBe(true);
				done();
			}).catch(e => {
				throw e;
			});
		});
	});

	describe("get", () => {

		it("must get the prices", done => {
			api.recipes.getIds().then(ids => {
				api.recipes.get(ids[0]).then(recipe => {
					expect(typeof recipe.id).toBe("number");
					done();
				}).catch(e => {
					throw e;
				});
			}).catch(e => {
				throw e;
			});
		});
	});

	describe("search", () => {

		describe("input", () => {

			it("must search the inputs for an item", done => {
				api.recipes.getIds().then(ids => {
					api.recipes.search.input(ids[0]).then(ids => {
						expect(Array.isArray(ids)).toBe(true);
						done();
					}).catch(e => {
						throw e;
					});
				}).catch(e => {
					throw e;
				});
			});
		});

		describe("output", () => {

			it("must search the outputs for an item", done => {
				api.recipes.getIds().then(ids => {
					api.recipes.search.output(ids[0]).then(ids => {
						expect(Array.isArray(ids)).toBe(true);
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