import { useTranslation } from "react-i18next";
import { Globe } from "lucide-react";

export default function LanguageSelector() {
  const { i18n } = useTranslation();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    i18n.changeLanguage(e.target.value);
  };

  return (
    <div className="w-1/2 flex justify-end p-4 bg-slate-100 text-sm">
      <label htmlFor="lang" className="mr-2 font-medium flex items-center">
        <Globe className="mr-1 h-4 w-4" />
      </label>
      <select
        id="lang"
        onChange={handleChange}
        value={i18n.language}
        className="border rounded p-1 text-sm"
      >
        <option value="pt">Português</option>
        <option value="en">English</option>
      </select>
    </div>
  );
}
