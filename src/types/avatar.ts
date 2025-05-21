export type AccessoryType = 'kurt' | 'prescription01' | 'prescription02' | 'round' | 'sunglasses' | 'wayfarers' | 'eyepatch';
export type ClothingType = 'blazerAndShirt' | 'blazerAndSweater' | 'collarAndSweater' | 'graphicShirt' | 'hoodie' | 'overall' | 'shirtCrewNeck' | 'shirtScoopNeck' | 'shirtVNeck';
export type EyebrowsType = 'angryNatural' | 'defaultNatural' | 'flatNatural' | 'frownNatural' | 'raisedExcitedNatural' | 'sadConcernedNatural' | 'unibrowNatural' | 'upDownNatural' | 'angry' | 'default' | 'raisedExcited' | 'sadConcerned' | 'upDown';
export type TopType = 'bigHair' | 'bob' | 'bun' | 'curly' | 'curvy' | 'dreads' | 'dreads01' | 'dreads02' | 'frida' | 'frizzle' | 'fro' | 'froBand' | 'hat' | 'hijab' | 'longButNotTooLong' | 'miaWallace' | 'shaggy' | 'shaggyMullet' | 'shavedSides' | 'shortCurly' | 'shortFlat' | 'shortRound' | 'shortWaved' | 'sides' | 'straight01' | 'straight02' | 'straightAndStrand' | 'theCaesar' | 'theCaesarAndSidePart' | 'turban' | 'winterHat1' | 'winterHat02' | 'winterHat03' | 'winterHat04';
export type MouthType = 'concerned'| 'default'| 'grimace'| 'sad'| 'serious'| 'smile' | 'screamOpen';
export type FacialHairType = 'beardLight' | 'beardMajestic' | 'beardMedium' | 'moustacheFancy' | 'moustacheMagnum';


export interface Avatar{
    id : number;
    hairColor : string;
    skinColor : string;
    accessory : AccessoryType | undefined;
    accessoryColor : string;
    clotheColor : string;
    clothing : ClothingType;
    eyebrows : EyebrowsType;
    top : TopType;
    mouth : MouthType;
    facialHair : FacialHairType | undefined;
    eyeColor : string;
}