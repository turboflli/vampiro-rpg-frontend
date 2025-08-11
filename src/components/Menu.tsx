import { AlignJustify } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import LanguageSelector from "./LanguageSelector";

export default function Menu() {
    const { t } = useTranslation("menu");
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        navigate(e.target.value);
    };
    return (
        <div className="flex justify-between">
        <div className="w-1/2 flex justify-start p-4 bg-slate-100 text-sm">
            <label htmlFor="menu" className="mr-2 font-medium flex items-center">
                <AlignJustify className="mr-1 h-4 w-4" />
            </label>
            <select
                id="menu"
                value={""}
                onChange={handleChange}
                className="border rounded p-1 text-sm"
            >
                <option value="" disabled>menu</option>
                <option value="/">{t("character")}</option>
                <option value="/create">{t("newCharacter")}</option>
                <option value="/domain">{t("domain")}</option>
                <option value="/createDomain">{t("newDomain")}</option>
                <option value="/place">{t("places")}</option>
                <option value="/createPlace">{t("newPlace")}</option>
                <option value="/map">{t("map")}</option>
                <option value="/routine">{t("routine")}</option>
                <option value="/createRoutine">{t("newRoutine")}</option>
            </select>
        </div>
        <LanguageSelector />
        </div>
    );
}