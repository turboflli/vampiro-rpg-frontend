import { ChevronLeft, ChevronRight } from "lucide-react";
import { PlaceType } from "../types/place";
import PlaceIconType from "./PlaceIconType";
import { useTranslation } from "react-i18next";

interface Props {
    onChange: (value: PlaceType) => void;
    value?: PlaceType;
}

const options: PlaceType[] = [
    "Casa",
    "Hotel",
    "Igreja",
    "Cemitério",
    "Hospital",
    "Escola",
    "Ciência",
    "Supermercado",
    "Banco",
    "Loja",
    "Restaurante",
    "Parque",
    "Clube",
    "Polícia",
    "Bombeiro",
    "Prefeitura",
    "Shopping center",
    "Cinema",
    "Teatro",
    "Biblioteca",
    "Zoológico",
    "Aquário",
    "Museu",
    "Jardim botânico",
    "Periferia",
    "Trabalho",
    "Academia",
    "Posto",
    "Metro",
    "Marítimo",
    "Abandonado",
    "Outro"
];

export default function PlaceTypeSelect({ onChange, value }: Props) {
    const { t } = useTranslation('place');
    const optionFoward = () => {
        if (!value) {
            onChange(options[0]);
            return;
        }
        const index = options.indexOf(value);
        if (index == options.length - 1 ) {
            onChange(options[0]);
        } else {
            onChange(options[(index + 1)]);
        }
    }

    const optionBack = () => {
        if (!value) {
            onChange(options[options.length - 1]);
            return;
        }
        const index = options.indexOf(value);
        if (index == 0) {
            onChange(options[options.length - 1]);
        } else {
            onChange(options[(index - 1)]);
        }
    }

    const makeLabel = () => {
        if (!value) {
            return <label className="block font-semibold">{t("Outro")}</label>;;
        }
        return <label className="block font-semibold">{t(value)}</label>;
    }
    return (
        <div className="flex items-center space-x-2">
            <button type="button" onClick={optionBack} aria-label="optionBack"><ChevronLeft className="w-5 h-5" /></button>
            <PlaceIconType type={value || 'Outro'} />
            {makeLabel()}
            <button type="button" onClick={optionFoward} aria-label="optionFoward"><ChevronRight className="w-5 h-5" /></button>
        </div>
    );
}