export interface Discipline {
    name: string;
    score: number;
}

export interface Clan{
    discipline1 : string;
    discipline2 : string;
    discipline3 : string;
    id : number;
    name : string;
    weakness : string;
}

export interface Road{
    aura : string;
    ethics : string;
    id : number;
    name : string;
    pathName : string;
    sins : string;
    useConscience : boolean;
    useSelf_control : boolean;
}

export interface Character{
    academics : number;
    alertness : number;
    animal_kin : number;
    appearance : number;
    archery : number;
    athletics : number;
    awareness : number;
    bloodpool : number;
    brawl : number;
    charisma : number;
    clanDiscipline1 : number;
    clanDiscipline2 : number;
    clanDiscipline3 : number;
    clanId : number;
    concept : string;
    conscience : number;
    courage : number;
    crafts : number;
    demeanor : string;
    dexterity : number;
    disciplines: Discipline[];
    empathy : number;
    enigmas : number;
    etiquette : number;
    experience : number;
    expression : number;
    generation : number;
    heart_wisdom : number;
    id? : number;
    intelligence : number;
    intimidation : number;
    investigation : number;
    law : number;
    leadership : number;
    legerdemain : number;
    manipulation : number;
    medicine : number;
    melee : number;
    name : string;
    nature : string;
    occult : number;
    perception : number;
    performance : number;
    politics : number;
    ride : number;
    roadId : number;
    road_value : number;
    self_control : number;
    seneschal : number;
    sire : string;
    stamina : number;
    stealth : number;
    streetwise : number;
    strength : number;
    subterfuge : number;
    survival : number;
    theology : number;
    willpower : number;
    wits : number;
}