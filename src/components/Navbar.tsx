import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useAuth } from "@/context/AuthContext";

const NAV_KEYS = [
  { id: "home", key: "nav.home" },
  { id: "tree", key: "nav.tree" },
  { id: "culture", key: "nav.culture" },
  { id: "library", key: "nav.library" },
  { id: "cabinet", key: "nav.cabinet" },
  { id: "contact", key: "nav.contact" },
];

interface NavbarProps {
  activeSection: string;
  mobileMenuOpen: boolean;
  onScrollTo: (id: string) => void;
  onToggleMobile: () => void;
}

export default function Navbar({ activeSection, mobileMenuOpen, onScrollTo, onToggleMobile }: NavbarProps) {
  const { t } = useTranslation();
  const { user, logout } = useAuth();

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4"
        style={{
          background: "rgba(13,10,6,0.85)",
          backdropFilter: "blur(16px)",
          borderBottom: "1px solid rgba(201,168,76,0.1)",
        }}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center animate-pulse-gold"
            style={{ background: "linear-gradient(135deg, #8B6F2E, #C9A84C)" }}
          >
            <Icon name="Sun" size={16} style={{ color: "#0D0A06" }} />
          </div>
          <span
            className="text-xl font-bold"
            style={{ fontFamily: "'Cormorant Garamond', serif", color: "var(--gold)", letterSpacing: "0.05em" }}
          >
            Êzidî Heritage
          </span>
        </div>

        <div className="hidden md:flex items-center gap-7">
          {NAV_KEYS.map((item) => (
            <button
              key={item.id}
              onClick={() => onScrollTo(item.id)}
              className={`nav-link ${activeSection === item.id ? "active" : ""}`}
            >
              {t(item.key)}
            </button>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <LanguageSwitcher />
          {user ? (
            <div className="flex items-center gap-3">
              <span
                className="flex items-center gap-1.5 text-sm"
                style={{ color: "rgba(232,201,122,0.65)", fontFamily: "'IBM Plex Sans', sans-serif" }}
              >
                <Icon name="UserCircle" size={15} style={{ color: "var(--gold)" }} />
                {user.name}
              </span>
              <button
                onClick={() => logout()}
                className="btn-outline-gold px-4 py-2 rounded text-sm"
              >
                {t("auth.logout")}
              </button>
            </div>
          ) : (
            <>
              <Link to="/login" className="btn-outline-gold px-4 py-2 rounded text-sm">
                {t("nav.login")}
              </Link>
              <Link to="/login" className="btn-gold px-4 py-2 rounded text-sm">
                {t("nav.register")}
              </Link>
            </>
          )}
        </div>

        <button
          className="md:hidden"
          style={{ color: "var(--gold)" }}
          onClick={onToggleMobile}
        >
          <Icon name={mobileMenuOpen ? "X" : "Menu"} size={22} />
        </button>
      </nav>

      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 pt-16 px-6 pb-8 flex flex-col gap-4"
          style={{ background: "rgba(13,10,6,0.97)", backdropFilter: "blur(20px)" }}
        >
          {NAV_KEYS.map((item) => (
            <button
              key={item.id}
              onClick={() => onScrollTo(item.id)}
              className="nav-link text-left text-base py-3 border-b"
              style={{ borderColor: "rgba(201,168,76,0.1)" }}
            >
              {t(item.key)}
            </button>
          ))}
          <div className="flex flex-col gap-3 mt-4">
            <LanguageSwitcher />
            {user ? (
              <button onClick={() => logout()} className="btn-outline-gold py-3 rounded text-sm">
                {t("auth.logout")}
              </button>
            ) : (
              <>
                <Link to="/login" onClick={onToggleMobile} className="btn-outline-gold py-3 rounded text-sm text-center">
                  {t("nav.login")}
                </Link>
                <Link to="/login" onClick={onToggleMobile} className="btn-gold py-3 rounded text-sm text-center">
                  {t("nav.register")}
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
