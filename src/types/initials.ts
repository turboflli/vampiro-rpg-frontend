import { Character } from "./character";
import { Avatar } from "./avatar";
import { Routine } from "./routine";
import { Domain, Place } from "./place";

export const initialCharacter: Character = {
    id: undefined,
    name: "",
    clanId: 0,
    roadId: 0,
    generation: 12,
    sire: "",
    nature: "",
    demeanor: "",
    concept: "",
    strength: 1, dexterity: 1, stamina: 1,
    charisma: 1, manipulation: 1, appearance: 1,
    perception: 1, intelligence: 1, wits: 1,
    alertness: 0, athletics: 0, awareness: 0, brawl: 0, empathy: 0, expression: 0, intimidation: 0, leadership: 0, streetwise: 0, subterfuge: 0,
    animal_kin: 0, archery: 0, crafts: 0, etiquette: 0, legerdemain: 0, melee: 0, performance: 0, ride: 0, stealth: 0, survival: 0,
    academics: 0, enigmas: 0, heart_wisdom: 0, investigation: 0, law: 0, medicine: 0, occult: 0, politics: 0, seneschal: 0, theology: 0,
    clanDiscipline1: 0, clanDiscipline2: 0, clanDiscipline3: 0,
    conscience: 1, courage: 1, self_control: 1,
    road_value: 1, willpower: 5, bloodpool: 10, experience: 0,
    disciplines: [], backgrounds: [], merits: [], flaws: [],
};

export const initialAvatar: Avatar = {
    id: undefined,
    hairColor: '#2c1b18',
    skinColor: 'ffdbb4',
    accessory: undefined,
    accessoryColor: '#3c4f5c',
    clotheColor: '#000',
    clothing: 'shirtCrewNeck',
    eyebrows: 'defaultNatural',
    top: 'bob',
    mouth: 'smile',
    facialHair: undefined,
    eyeColor: '#3377ff',
};

export const initialRoutine: Routine = {
    id: undefined,
    characterId: undefined,
    placeId: undefined,
    weekday: 0,
    startTime: "18:00",
    endTime: "06:00",
    description: "Em casa",
};

export const initialPlace: Place = {
    id: undefined,
    name: "",
    description: "",
    x_coordinate: null,
    y_coordinate: null,
    type: "Outro",
    image: "",
    domainId: undefined,
    subPlaces: [],
};

export const initialDomain: Domain = {
    id: undefined,
    name: "",
    color: "#FF0000",
    characterId: undefined,
};