export interface Routine{
    id : number | undefined;
    characterId : number | undefined;
    placeId : number | undefined;
    weekday : number;
    startTime : string;
    endTime : string;
    description : string;
}