import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import pt from "./locales/pt/common.json";
import en from "./locales/en/common.json";
import ptAvatar from "./locales/pt/avatar.json";
import enAvatar from "./locales/en/avatar.json";

i18n.use(initReactI18next).init({
  ns: ['common', 'avatar'],
  defaultNS: 'common',
  resources: {
    pt: { common: pt, avatar: ptAvatar },
    en: { common: en, avatar: enAvatar }
  },
  lng: "pt", // idioma padrão
  fallbackLng: "pt",
  interpolation: { escapeValue: false }
});

export default i18n;
