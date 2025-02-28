import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        welcome: "Welcome to News App",
        business: "Business",
        sports: "Sports",
        political: "Political",
        general: "General",
        social: "Social",
        fashion: "Fashion",
      },
    },
    hi: {
      translation: {
        welcome: "न्यूज़ ऐप में आपका स्वागत है",
        business: "व्यापार",
        sports: "खेल",
        political: "राजनीतिक",
        general: "सामान्य",
        social: "सामाजिक",
        fashion: "फैशन",
      },
    },
  },
  lng: "en", // Default language
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
