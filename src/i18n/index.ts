import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import pt from "./locales/pt/common.json";
import en from "./locales/en/common.json";
import ptAvatar from "./locales/pt/avatar.json";
import enAvatar from "./locales/en/avatar.json";
import ptMenu from "./locales/pt/menu.json";
import enMenu from "./locales/en/menu.json";
import ptPlace from "./locales/pt/place.json";
import enPlace from "./locales/en/place.json";

i18n.use(initReactI18next).init({
  ns: ['common', 'avatar', 'menu', 'place'],
  defaultNS: 'common',
  resources: {
    pt: { common: pt, avatar: ptAvatar, menu: ptMenu, place: ptPlace },
    en: { common: en, avatar: enAvatar, menu: enMenu, place: enPlace }
  },
  lng: "pt", // idioma padrão
  fallbackLng: "pt",
  interpolation: { escapeValue: false }
});

export default i18n;
