import Icon from "@/components/ui/icon";

const NAV_ITEMS = [
  { id: "home", label: "Главная" },
  { id: "tree", label: "Родовое древо" },
  { id: "culture", label: "Культура" },
  { id: "library", label: "Библиотека" },
  { id: "cabinet", label: "Личный кабинет" },
  { id: "contact", label: "Контакты" },
];

interface NavbarProps {
  activeSection: string;
  mobileMenuOpen: boolean;
  onScrollTo: (id: string) => void;
  onToggleMobile: () => void;
}

export default function Navbar({ activeSection, mobileMenuOpen, onScrollTo, onToggleMobile }: NavbarProps) {
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
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => onScrollTo(item.id)}
              className={`nav-link ${activeSection === item.id ? "active" : ""}`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <button className="btn-outline-gold px-4 py-2 rounded text-sm">Войти</button>
          <button className="btn-gold px-4 py-2 rounded text-sm">Регистрация</button>
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
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => onScrollTo(item.id)}
              className="nav-link text-left text-base py-3 border-b"
              style={{ borderColor: "rgba(201,168,76,0.1)" }}
            >
              {item.label}
            </button>
          ))}
          <div className="flex flex-col gap-3 mt-4">
            <button className="btn-outline-gold py-3 rounded text-sm">Войти</button>
            <button className="btn-gold py-3 rounded text-sm">Регистрация</button>
          </div>
        </div>
      )}
    </>
  );
}
