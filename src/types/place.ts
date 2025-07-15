export type PlaceType = 'Casa' | 'Hotel' | 'Igreja' | 'Cemitério' | 'Hospital' | 'Escola' | 'Ciência' | 'Supermercado' | 'Banco' | 'Loja' | 'Restaurante' | 'Parque' | 'Clube' | 'Polícia' | 'Bombeiro' | 'Prefeitura' | 'Shopping center' | 'Cinema' | 'Teatro' | 'Biblioteca' | 'Zoológico' | 'Aquário' | 'Museu' | 'Jardim botânico' | 'Periferia' | 'Trabalho' | 'Academia' | 'Posto' | 'Metro' | 'Marítimo' | 'Abandonado' | 'Outro';

export interface Domain{
    id : number | undefined;
    name : string;
    color : string;
    characterId : number | undefined;
}
export interface SubPlace{
    name : string;
    description : string;
}

export interface Place{
    id : number | undefined;
    name : string;
    description : string;
    x_coordinate : number | null;
    y_coordinate : number | null;
    type : PlaceType;
    image  : string;
    domainId : number | undefined;
    subPlaces : SubPlace[];
}

