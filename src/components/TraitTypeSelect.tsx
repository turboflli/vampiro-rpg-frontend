import { useTranslation } from "react-i18next";
type Props = {
    onChange: (v: string) => void;
    value?: string;
}

export default function TraitTypeSelect({ onChange, value }: Props) {
    const { t } = useTranslation();
    return (
        <div className="flex items-center mb-1 border border-gray-300 rounded-md p-2 shadow-sm">
          <select  onChange={(e) => onChange(e.target.value)} value={value}>
            <option value="">{t("select")}</option>
            <option value="Fisico">{t("physical")}</option>
            <option value="Mental">{t("mental")}</option>
            <option value="Social">{t("social")}</option>
            <option value="Sobrenatural">{t("supernatural")}</option>
          </select>
        </div>
      );
}