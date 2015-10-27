import Client from "./client";
import { BASE_URI } from "../config";

const URI = `${BASE_URI}/v2/items`;

type File = {
	/**
	 * The item id.
	 */
	id: number;
	/**
	 * The item name.
	 */
	name: string;
	/**
	 * The full icon URL.
	 */
	icon: string;
	/**
	 * The item description.
	 */
	description?: string;
	/**
	 * The item type (see below). Possible values:
	 * 	- Armor – Armor
	 * 	- Back – Back item
	 * 	- Bag – Bags
	 * 	- Consumable – Consumables
	 * 	- Container – Containers
	 * 	- CraftingMaterial – Crafting materials
	 * 	- Gathering – Gathering tools
	 * 	- Gizmo – Gizmos
	 * 	- MiniPet – Miniatures
	 * 	- Tool – Salvage kits
	 * 	- Trait – Trait guides
	 * 	- Trinket – Trinkets
	 * 	- Trophy – Trophies
	 * 	- UpgradeComponent – Upgrade components
	 * 	- Weapon – Weapons
	 */
	type: string;
	/**
	 * The item rarity. Possible values:
	 * 	- Junk
	 * 	- Basic
	 * 	- Fine
	 * 	- Masterwork
	 * 	- Rare
	 * 	- Exotic
	 * 	- Ascended
	 * 	- Legendary
	 */
	rarity: string;
	/**
	 * The required level.
	 */
	level: number;
	/**
	 * The value in coins when selling to a vendor (can be non-zero even when the item has the NoSell flag).
	 */
	vendor_value: number;
	/**
	 * The default skin id.
	 */
	default_skin?: number;
	/**
	 * Flags applying to the item. Possible values:
	 * 	- AccountBindOnUse – Account bound on use
	 * 	- AccountBound – Account bound on acquire
	 * 	- HideSuffix – Hide the suffix of the upgrade component
	 * 	- MonsterOnly
	 * 	- NoMysticForge – Not usable in the Mystic Forge
	 * 	- NoSalvage – Not salvageable
	 * 	- NoSell – Not sellable
	 * 	- NotUpgradeable – Not upgradeable
	 * 	- NoUnderwater – Not available underwater
	 * 	- SoulbindOnAcquire – Soulbound on acquire
	 * 	- SoulBindOnUse – Soulbound on use
	 * 	- Unique – Unique
	 */
	flags: string[];
	/**
	 * The game types in which the item is usable. At least one game type is specified. Possible values:
	 * 	- Activity – Usable in activities
	 * 	- Dungeon – Usable in dungeons
	 * 	- Pve – Usable in general PvE
	 * 	- Pvp – Usable in PvP
	 * 	- PvpLobby – Usable in the Heart of the Mists
	 * 	- Wvw – Usable in World vs. World
	 */
	game_types: string[];
	/**
	 * Restrictions applied to the item. Possible values:
	 * 	- Asura
	 * 	- Charr
	 * 	- Human
	 * 	- Norn
	 * 	- Sylvari
	 * 	- Guardian
	 * 	- Mesmer
	 * 	- Ranger
	 * 	- Warrior
	 */
	restrictions: string[];
	/**
	 * Additional item details if applicable, depending on the item type.
	 */
	details?: Armor | BackItem;
};

type Armor = {
	/**
	 * The armor slot type.
	 * 	- Boots – Feet slot
	 * 	- Coat – Chest slot
	 * 	- Gloves – Hands slot
	 * 	- Helm – Helm slot
	 * 	- HelmAquatic – Breathing apparatus slot
	 * 	- Leggings – Legs slot
	 * 	- Shoulders – Shoulders slot
	 */
	type: string;
	/**
	 * The weight class of the armor piece.
	 * 	- Heavy – Heavy armor
	 * 	- Medium – Medium armor
	 * 	- Light – Light armor
	 * 	- Clothing – Town clothing
	 */
	weight_class: string;
	/**
	 * The defense value of the armor piece.
	 */
	defense: number;
	/**
	 * Infusion slots of the armor piece.
	 */
	infusion_slots: Infusion[];
	/**
	 * The infix upgrade object.
	 */
	infix_upgrade?: InfinixUpgrade;
	/**
	 * The suffix item id. This is usually a rune.
	 */
	suffix_item_id?: number;
	/**
	 * The secondary suffix item id. Equals to an empty string for all currently discovered items.
	 */
	secondary_suffix_item_id: string;
};

type BackItem = {
	/**
	 * Infusion slots of the back item.
	 */
	infusion_slots: Infusion[];
	/**
	 * The infix upgrade objec.
	 */
	infix_upgrade?: InfinixUpgrade;
	/**
	 * The suffix item id. This is usually a jewel.
	 */
	suffix_item_id?: number;
	/**
	 * The secondary suffix item id. Equals to an empty string for all currently discovered items.
	 */
	secondary_suffix_item_id: string;
};

type Bag = {
	/**
	 * The number of bag slots.
	 */
	size: number;
	/**
	 * Whether the bag is invisible/safe, and contained items won't show up at merchants etc.
	 */
	no_sell_or_sort: boolean;
};

type Consumable = {
	/**
	 * Consumable type. Possible values:
	 * 	- AppearanceChange – For Total Makeover Kits, Self-Style Hair Kits, and Name Change Contracts
	 * 	- Booze – Alcohol consumables
	 * 	- ContractNpc – For Trading Post Express, Merchant Express, Golem Banker
	 * 	- Food – Food consumables
	 * 	- Generic – Various consumables
	 * 	- Halloween – Some boosters
	 * 	- Immediate – Consumables granting immediate effect (most boosters, Heavy Tome of Knowledge)
	 * 	- Transmutation – Skin consumables
	 * 	- Unlock – Unlock consumables
	 * 	- UpgradeRemoval – For Upgrade Extractor
	 * 	- Utility – Utility boosts (Potions etc.)
	 */
	type: string;
	/**
	 * Effect description for consumables applying an effect.
	 */
	description?: string;
	/**
	 * Effect duration in milliseconds.
	 */
	duration_ms?: number;
	/**
	 * Unlock type for unlock consumables. Possible values:
	 * 	- BagSlot – For Bag Slot Expansion
	 * 	- BankTab – For Bank Tab Expansion
	 * 	- CollectibleCapacity – For Storage Expander
	 * 	- Content – Finishers and Collection unlocks, and Commander's Compendium
	 * 	- CraftingRecipe – Crafting recipes
	 * 	- Dye – Dyes
	 * 	- Unknown – Outfits
	 */
	unlock_type?: string;
	/**
	 * The dye id for dye unlocks.
	 */
	color_id?: number;
	/**
	 * The recipe id for recipe unlocks.
	 */
	recipe_id?: number;
};

type Container = {
	/**
	 * The container type. Possible values:
	 * 	- Default
	 * 	- GiftBox – For some presents and most dye kits
	 * 	- OpenUI – For containers that have their own UI when opening (Black Lion Chest)
	 */
	type: string;
};

type GatheringTools = {
	/**
	 * The tool type. Possible values:
	 * 	- Foraging – For harvesting sickles
	 * 	- Logging – For logging axes
	 * 	- Mining – For mining picks
	 */
	type: string;
};

type Gizmo = {
	/**
	 * The gizmo type. Possible values:
	 * 	- Default
	 * 	- ContainerKey – For Black Lion Chest Keys.
	 * 	- RentableContractNpc – For time-limited NPC services (e.g. Golem Banker, Personal Merchant Express)
	 * 	- UnlimitedConsumable – For Permanent Self-Style Hair Kit
	 */
	type: string;
};

type SalvageKits = {
	/**
	 * The tool type. Always Salvage.
	 */
	type: string;
	/**
	 * Number of charges.
	 */
	charges: number;
};

type Trinket = {
	/**
	 * The trinket type. Possible values:
	 * 	- Accessory – Accessory
	 * 	- Amulet – Amulet
	 * 	- Ring – Ring
	 */
	type: string;
	/**
	 * Infusion slots of the trinket.
	 */
	infusion_slots: Infusion[];
	/**
	 * The infix upgrade object.
	 */
	infix_upgrade: InfinixUpgrade;
	/**
	 * The suffix item id. This is usually a jewel or gem.
	 */
	suffix_item_id?: number;
	/**
	 * The secondary suffix item id. Equals to an empty string for all currently discovered items.
	 */
	secondary_suffix_item_id: string;
};

type UpgradeComponent = {
	/**
	 * The type of the upgrade component. Possible values:
	 * 	- Default – Infusions and Jewels (and historical PvP runes/sigils)
	 * 	- Gem – Universal upgrades (Gemstones, Doubloons, and Marks/Crests/etc.)
	 * 	- Rune – Rune
	 * 	- Sigil – Sigil
	 */
	type: string;
	/**
	 * The items that can be upgraded with the upgrade component. Possible values:
	 * 	- Weapons: Axe, Dagger, Focus,Greatsword, Hammer, Harpoon, LongBow, Mace, Pistol, Rifle, Scepter, Shield, ShortBow, Speargun, Staff, Sword, Torch, Trident, Warhorn
	 * 	- Armor: HeavyArmor, MediumArmor, LightArmor
	 * 	- Trinkets: Trinket
	 */
	flags: string[];
	/**
	 * Applicable infusion slot for infusion upgrades. Possible values:
	 * 	- Defense – Defensive infusion
	 * 	- Offense – Offensive infusion
	 * 	- Utility – Utility infusion
	 */
	infusion_upgrade_flags: string[];
	/**
	 * The suffix appended to the item name when the component is applied.
	 */
	suffix: string;
	/**
	 * Bonus the upgrade grants.
	 */
	infix_upgrade: InfinixUpgrade;
	/**
	 * The bonuses from runes.
	 */
	bonuses?: string[];
};

type Weapon = {
	/**
	 * The weapon type.
	 * 	- One-handed main hand: Axe, Dagger, Mace, Pistol, Scepter, Sword
	 * 	- One-handed off hand: Focus, Shield, Torch, Warhorn
	 * 	- Two-handed: Greatsword, Hammer, LongBow, Rifle, ShortBow, Staff
	 * 	- Aquatic: Harpoon, Speargun, Trident
	 * 	- Other: LargeBundle, SmallBundle, Toy, TwoHandedToy
	 */
	type: string;
	/**
	 * The damage type.
	 * 	- Fire – Fire damage
	 * 	- Ice – Ice damage
	 * 	- Lightning – Lighting damage
	 * 	- Physical – Physical damage.
	 * 	- Choking – (not used)
	 */
	damage_type: string;
	/**
	 * Minimum weapon strength.
	 */
	min_power: number;
	/**
	 * Maximum weapon strength.
	 */
	max_power: number;
	/**
	 * The defense value of the weapon (for shields).
	 */
	defense: number;
	/**
	 * Infusion slots of the weapon.
	 */
	infusion_slots: Infusion[];
	/**
	 * The infix upgrade object.
	 */
	infix_upgrade?: InfinixUpgrade;
	/**
	 * The suffix item id. This is usually a sigil.
	 */
	suffix_item_id?: number;
	/**
	 * The secondary suffix item id. Equals to an empty string for all currently discovered items.
	 */
	secondary_suffix_item_id: string;
};

type CraftingMaterial = {
	
};

type Miniature = {
	
};

type Trophies = {
	
};

type InfinixUpgrade = {
	/**
	 * List of attribute bonuses.
	 */
	attributes: {
		/**
		 * Attribute this bonus applies to. Possible values:
		 * 	- ConditionDamage – Condition Damage
		 * 	- CritDamage – Ferocity
		 * 	- Healing – Healing Power
		 * 	- Power – Power
		 * 	- Precision – Precision
		 * 	- Toughness – Toughness
		 * 	- Vitality – Vitality
		 */
		attribute: string;
		/**
		 * The modifier value.
		 */
		modifier: number;
	}[];
	/**
	 * Object containing an additional effect. This is used for Boon Duration, Condition Duration, or additional attribute bonuses for ascended trinkets or back items.
	 */
	buff?: {
		/**
		 * The skill id of the effect.
		 */
		skill_id: number;
		/**
		 * The effect's description.
		 */
		description: string;
	};
};

type Infusion = {
	/**
	 * Infusion slot type of infusion upgrades. The array contains a maximum of one value. 
	 * An empty array means an agony infusion slot. Possible values:
	 * 	- Defense – Defensive infusion slot
	 * 	- Offense – Offensive infusion slot (not used for normal armor)
	 * 	- Utility – Utility infusion slot (only used for trinkets)
	 */
	flags: string[];
	/**
	 * The infusion upgrade already in the armor piece. Only used for +5 Agony Infusions (id 49428).
	 */
	item_id?: number;
};

class ItemsClient extends Client<number, File> {
	constructor() {
		super(URI);
	}
}

export default new ItemsClient();