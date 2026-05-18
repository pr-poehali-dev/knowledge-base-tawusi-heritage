import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import ru from "./locales/ru.json";
import en from "./locales/en.json";
import ku from "./locales/ku.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      ru: { translation: ru },
      en: { translation: en },
      ku: { translation: ku },
    },
    fallbackLng: "ru",
    supportedLngs: ["ru", "en", "ku"],
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
      lookupLocalStorage: "tawus_lang",
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
