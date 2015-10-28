/// <reference path="import" />

import { api } from "../build/main";

describe("build", () => {

	describe("get", () => {

		it("must get the build", done => {
			api.build.get().then(build => {
				expect(typeof build).toBe("number");
				done();
			}).catch(e => {
				throw e;
			});
		});
	});
});