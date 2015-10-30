import Client from "../client";
import { BASE_URI } from "../../config";
import * as Search from "./search";

const URI = `${BASE_URI}/v2/recipes`;

export type Ingredient = {
	/**
	 * The ingredient's item id.
	 */
	item_id: number;
	/**
	 * The quantity of this ingredient.
	 */
	count: number;
};

export type Recipe = {
	/**
	 * The recipe id.
	 */
	id: number;
	/**
	 * The recipe type. Possible values:
     * 	- Weapon recipes: Axe, Dagger, Focus, Greatsword, Hammer, Harpoon, LongBow, Mace, Pistol, Rifle, Scepter, Shield, ShortBow, Speargun, Staff, Sword, Torch, Trident, Warhorn
     * 	- Armor recipes: Boots, Coat, Gloves, Helm, Leggings, Shoulders
     * 	- Trinket recipes: Amulet, Earring, Ring
     * 	- Food recipes: Dessert, Feast, IngredientCooking, Meal, Seasoning, Snack, Soup
     * 	- Crafting component recipes: Component, Inscription, Insignia
     * 	- Refinement recipes: Refinement, RefinementEctoplasm, RefinementObsidian
     * 	- Other recipes: Backpack, Bag, Bulk, Consumable, Dye, Potion, UpgradeComponent
	 */
	type: string;
	/**
	 * The item id of the produced item.
	 */
	output_item_id: number;
	/**
	 * The amount of items produced.
	 */
	output_item_count: number;
	/**
	 * The time in milliseconds it takes to craft the item.
	 */
	time_to_craft_ms: number;
	/**
	 * The crafting disciplines that can use the recipe. Possible values:
     * 	- Artificer
     * 	- Armorsmith
     * 	- Chef
     * 	- Huntsman
     * 	- Jeweler
     * 	- Leatherworker
     * 	- Tailor
     * 	- Weaponsmith
	 */
	disciplines: string[];
	/**
	 * The required rating to craft the recipe.
	 */
	min_rating: number;
	/**
	 * Flags applying to the recipe. Possible values:
     * 	- AutoLearned – Indicates that a recipe automatically unlocks upon reaching the required discipline rating.
     * 	- LearnedFromItem – Indicates that a recipe is unlocked by consuming a recipe sheet.
	 */
	flags: string[];
	/**
	 * List of recipe ingredients.
	 */
	ingredients: Ingredient[];
};

export class RecipesClient extends Client<number, Recipe> {
	
	search: typeof Search;
	
	constructor() {
		super(URI);
	}
}

RecipesClient.prototype.search = Search;

export default new RecipesClient();