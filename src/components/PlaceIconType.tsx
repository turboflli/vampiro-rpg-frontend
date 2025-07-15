import { House, Hotel, Church, Hospital, School, BicepsFlexed, BookMarked, Building2, Dog, Fish, Fuel, Ghost, TreePine, Landmark, Popcorn, Siren, ShoppingBasket, BriefcaseBusiness, Sprout, SprayCan, Store, Theater, TrainFrontTunnel, CircleDollarSign, Skull, Hamburger, FireExtinguisher, Ship, MicVocal, Atom, CircleDashed, University } from "lucide-react";
import { PlaceType } from "../types/place";

interface Props {
    type: PlaceType;
    style?: React.CSSProperties;
}
export default function PlaceIconType({ type, style }: Props) {
    const getIcon = (type: PlaceType) => {
        switch (type) {
            case "Casa":
                return <House className="h-5 w-5" style={style} />
            case "Hotel":
                return <Hotel className="h-5 w-5" style={style} />
            case "Igreja":
                return <Church className="h-5 w-5" style={style} />
            case "Cemitério":
                return <Skull className="h-5 w-5" style={style} />
            case "Hospital":
                return <Hospital className="h-5 w-5" style={style} />
            case "Escola":
                return <School className="h-5 w-5" style={style} />
            case "Ciência":
                return <Atom className="h-5 w-5" style={style} />
            case "Supermercado":
                return <ShoppingBasket className="h-5 w-5" style={style} />
            case "Banco":
                return <CircleDollarSign className="h-5 w-5" style={style} />
            case "Loja":
                return <Store className="h-5 w-5" style={style} />
            case "Restaurante":
                return <Hamburger className="h-5 w-5" style={style} />
            case "Parque":
                return <TreePine className="h-5 w-5" style={style} />
            case "Clube":
                return <MicVocal className="h-5 w-5" style={style} />
            case "Polícia":
                return <Siren className="h-5 w-5" style={style} />
            case "Bombeiro":
                return <FireExtinguisher className="h-5 w-5" style={style} />
            case "Prefeitura":
                return <University className="h-5 w-5" style={style} />
            case "Shopping center":
                return <Building2 className="h-5 w-5" style={style} />
            case "Cinema":
                return <Popcorn className="h-5 w-5" style={style} />
            case "Teatro":
                return <Theater className="h-5 w-5" style={style} />
            case "Biblioteca":
                return <BookMarked className="h-5 w-5" style={style} />
            case "Zoológico":
                return <Dog className="h-5 w-5" style={style} />
            case "Aquário":
                return <Fish className="h-5 w-5" style={style} />
            case "Museu":
                return <Landmark className="h-5 w-5" style={style} />
            case "Jardim botânico":
                return <Sprout className="h-5 w-5" style={style} />
            case "Periferia":
                return <SprayCan className="h-5 w-5" style={style} />
            case "Trabalho":
                return <BriefcaseBusiness className="h-5 w-5" style={style} />
            case "Academia":
                return <BicepsFlexed className="h-5 w-5" style={style} />
            case "Posto":
                return <Fuel className="h-5 w-5" style={style} />
            case "Metro":
                return <TrainFrontTunnel className="h-5 w-5" style={style} />
            case "Marítimo":
                return <Ship className="h-5 w-5" style={style} />
            case "Abandonado":
                return <Ghost className="h-5 w-5" style={style} />
            case "Outro":
                return <CircleDashed className="h-5 w-5" style={style} />
        }
    }

    return (
        <>
            {getIcon(type)}
        </>
    )
}