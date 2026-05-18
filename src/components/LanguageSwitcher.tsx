import { useTranslation } from "react-i18next";

const LANGS = [
  { code: "ru", label: "Рус" },
  { code: "en", label: "Eng" },
  { code: "ku", label: "Kur" },
];

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const current = i18n.language?.slice(0, 2);

  return (
    <div className="flex items-center gap-1">
      {LANGS.map((lang) => (
        <button
          key={lang.code}
          onClick={() => i18n.changeLanguage(lang.code)}
          className="px-2 py-1 rounded text-xs transition-all"
          style={{
            fontFamily: "'IBM Plex Sans', sans-serif",
            letterSpacing: "0.05em",
            color: current === lang.code ? "var(--gold)" : "rgba(201,168,76,0.4)",
            background: current === lang.code ? "rgba(201,168,76,0.1)" : "transparent",
            border: current === lang.code ? "1px solid rgba(201,168,76,0.3)" : "1px solid transparent",
          }}
        >
          {lang.label}
        </button>
      ))}
    </div>
  );
}
