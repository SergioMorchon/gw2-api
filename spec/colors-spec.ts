/// <reference path="import" />

import { api } from "../build/main";

describe("colors", () => {
	
	describe("getIds", () => {
		
		it("must get the ids", done => {
			api.colors.getIds().then(ids => {
				expect(Array.isArray(ids)).toBe(true);
				done();
			}).catch(e => {
				throw e;
			});
		});
	});
	
	describe("get", () => {
		
		it("must get the color", done => {
			api.colors.getIds().then(ids => {
				api.colors.get(ids[0]).then(color => {
					expect(typeof color.id).toBe("number");
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