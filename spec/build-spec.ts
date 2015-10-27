/// <reference path="import" />

import { api } from "../build/main";

describe("build", () => {
	
	describe("get", () => {
		
		it("must get the build", done => {
			api.build.get().then(build => {
				expect(typeof build).toBe("number");
				expect(build).toBeGreaterThan(0);
				done();
			}).catch(e => {
				throw e;
			});
		});
	});
});