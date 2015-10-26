import Client from "./client";
import { BASE_URI } from "../config";

const URI = `${BASE_URI}/v2/traits`;

interface Fact {
	/**
	 * An arbitrary localized string describing the fact. Not included with all facts.
	 */
	text?: string;
	/**
	 * A URL to the icon shown with the fact. Not included with all facts.
	 */
	icon?: string;
	/**
	 * Defines what additional fields the object will contain, and what type of fact it is. Can be one of the following:
     * 	- AttributeAdjust
     * 	- Buff
     * 	- BuffConversion
     * 	- ComboField
     * 	- ComboFinisher
     * 	- Damage
     * 	- Distance
     * 	- NoData
     * 	- Number
     * 	- Percent
     * 	- PrefixedBuff
     * 	- Radius
     * 	- Range
     * 	- Recharge
     * 	- Time
     * 	- Unblockable
	 */
	type: string;
}

interface TraitedFact extends Fact {
	/**
	 * Specifies which trait has to be selected in order for this fact to take effect.
	 */
	requires_trait: number;
	/**
	 * This specifies the array index of the facts object it will override, if the trait specified in requires_trait is selected. If this field is omitted, then the fact contained within this object is to be appended to the existing facts array.
	 */
	overrides?: number;
}

//#region Fact types
type AttributeAdjust = {
	/**
	 * The amount target gets adjusted, based on a level 80 character at base stats.
	 */
	value: number;
	/**
	 * The attribute this fact adjusts. Note that a value of Healing indicates the fact is a heal, and Ferocity is encoded at CritDamage.
	 */
	target: string;
};

interface Buff {
	/**
	 * The boon, condition, or effect referred to by the fact.
	 */
	status: string;
	/**
	 * The description of the status effect.
	 */
	description?: string;
	/**
	 * The number of stacks applied.
	 */
	apply_count?: number;
	/**
	 * The duration of the effect in seconds. Note that some facts of this type are just used to display the buff icon with text; in this case, duration is usually 0, or omitted entirely.
	 */
	duration?: number;
}

type BuffConversion = {
	/**
	 * The attribute that is used to calculate the attribute gain.
	 */
	source: string;
	/**
	 * How much of the source attribute is added to target.
	 */
	percent: number;
	/**
	 * The attribute that gets added to.
	 */
	target: string;
};

type ComboField = {
	/**
	 * The type of field. One of: Air, Dark, Fire, Ice, Light, Lightning, Poison, Smoke, Ethereal, Water.
	 */
	field_type: string;
};

type ComboFinisher = {
	/**
	 * The type of finisher. One of: Blast, Leap, Projectile, Whirl.
	 */
	finisher_type: string;
	/**
	 * The percent chance that the finisher will trigger.
	 */
	percent: number;
};

type Damage = {
	/**
	 * The amount of times the damage hits.
	 */
	hit_count: number;
};

type Distance = {
	/**
	 * The distance value.
	 */
	distance: number;
};

type NoData = {
	
};

type Number = {
	/**
	 * The number value as referenced by text.
	 */
	value: number;
};

type Percent = {
	/**
	 * The percentage value as referenced by text.
	 */
	percent: number;
};

type Prefix = {
	text: string;
	icon: string;
	status: string;
	description: string;
};

interface PrefixedBuff extends Buff {
	prefix: Prefix;
}

type Radius = {
	/**
	 * The radius value.
	 */
	distance: number;
};

type Range = {
	/**
	 * The range of the trait/skill.
	 */
	value: number;
};

type Recharge = {
	/**
	 * The recharge time in seconds.
	 */
	value: number;
};

type Time = {
	/**
	 * The time value in seconds.
	 */
	duration: number;
};

type Unblockable = {
	/**
	 * Always true.
	 */
	value: boolean;
};
//#endregion

type Skill = {
	/**
	 * The ID of the skill.
	 */
	id: number;
	/**
	 * The name of the skill.
	 */
	name: string;
	/**
	 * The description of the skill.
	 */
	description: string;
	/**
	 * The URL for the icon of the skill.
	 */
	icon: string;
	/**
	 * A list of tooltip facts associated with the skill.
	 */
	facts?: Fact[];
	/**
	 * A list of additions or changes to tooltip facts where there is interplay between traits.
	 */
	traited_facts?: TraitedFact[];
};

type Trait = {
	/**
	 * The trait id.
	 */
	id: number;
	/**
	 * The trait name.
	 */
	name: string;
	/**
	 * The trait's icon URL.
	 */
	icon: string;
	/**
	 * The trait description.
	 */
	description: string;
	/**
	 * The id of the specialization this trait belongs to.
	 */
	specialization: number;
	/**
	 * The trait's tier (Adept, Master, Grandmaster) as a value from 1-3. Elite specializations also contain a tier 0 minor trait, describing which weapon the elite specialization gains access to.
	 */
	tier: number;
	/**
	 * Either Major or Minor depending on the trait's slot. Minor traits are the ones given immediately when choosing a specialization.
	 */
	slot: string;
	/**
	 * A list of tooltip facts associated with the trait itself.
	 */
	facts?: Fact[];
	/**
	 * A list of additions or changes to tooltip facts where there is interplay between traits.
	 */
	traited_facts?: TraitedFact[];
	/**
	 * A list of skills which may be triggered by the trait.
	 */
	skills?: Skill[];
};

class TraitClient extends Client<number, Trait> {
	constructor() {
		super(URI);
	}
}

export default new TraitClient();