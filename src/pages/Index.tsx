import { useState } from "react";
import Icon from "@/components/ui/icon";

const PEACOCK_IMAGE = "https://cdn.poehali.dev/projects/fa7a9dc1-94fe-4481-b369-7a53779b1282/files/66d766c9-eafb-42fc-83b2-481c5624befb.jpg";

const NAV_ITEMS = [
  { id: "home", label: "Главная" },
  { id: "tree", label: "Родовое древо" },
  { id: "culture", label: "Культура" },
  { id: "library", label: "Библиотека" },
  { id: "cabinet", label: "Личный кабинет" },
  { id: "contact", label: "Контакты" },
];

const CULTURE_CARDS = [
  {
    icon: "Sun",
    title: "Малак Тавус",
    subtitle: "Священный Павлин-Ангел",
    text: "Центральная фигура езидской веры — Малак Тавус символизирует возрождение, мудрость и красоту сотворённого мира.",
  },
  {
    icon: "Flame",
    title: "Священный огонь",
    subtitle: "Традиции и ритуалы",
    text: "Огонь занимает центральное место в езидских обрядах. Священные костры зажигаются в праздник Чаршама Сор — Красной среды.",
  },
  {
    icon: "Mountain",
    title: "Лалеш",
    subtitle: "Священная долина",
    text: "Лалеш — духовный центр езидов, где расположена гробница Шейха Ади ибн Мусафира, место ежегодного паломничества.",
  },
  {
    icon: "BookOpen",
    title: "Священные тексты",
    subtitle: "Китаб эль-Джилва и Мас'хафа Раш",
    text: "Езидская традиция хранит два основных священных текста, передававшихся устно из поколения в поколение.",
  },
];

const CHANTS = [
  {
    title: "Qewlê Şêxê Adî",
    subtitle: "Гимн Шейху Ади",
    duration: "4:32",
    tag: "Религиозный гимн",
    translation: "О Шейх Ади, благословенный из благословенных, ты свет нашего пути...",
  },
  {
    title: "Lalish Dengbêjî",
    subtitle: "Песнопение Лалеша",
    duration: "6:14",
    tag: "Священная песня",
    translation: "В священной долине, где поют ручьи, слышен голос предков...",
  },
  {
    title: "Qewlê Tawisî Melek",
    subtitle: "Гимн Малак Тавусу",
    duration: "5:48",
    tag: "Гимн",
    translation: "Павлин среди ангелов, ты несёшь свет в семь миров...",
  },
];

const TREE_FAMILIES = [
  { name: "Род Синджари", members: 847, region: "Синджар, Ирак", verified: true },
  { name: "Род Шайхани", members: 312, region: "Армения, Диаспора", verified: true },
  { name: "Род Малканди", members: 556, region: "Германия, Диаспора", verified: false },
];

export default function Index() {
  const [activeSection, setActiveSection] = useState("home");
  const [activeChant, setActiveChant] = useState<number | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [contactForm, setContactForm] = useState({ name: "", email: "", message: "" });

  const scrollTo = (id: string) => {
    setActiveSection(id);
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen" style={{ background: "var(--dark-bg)" }}>
      {/* ── NAVIGATION ── */}
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

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-7">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
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
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <Icon name={mobileMenuOpen ? "X" : "Menu"} size={22} />
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 pt-16 px-6 pb-8 flex flex-col gap-4"
          style={{ background: "rgba(13,10,6,0.97)", backdropFilter: "blur(20px)" }}
        >
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
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

      {/* ── HERO ── */}
      <section
        id="home"
        className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16"
      >
        <div className="absolute inset-0">
          <img
            src={PEACOCK_IMAGE}
            alt="Малак Тавус"
            className="w-full h-full object-cover"
            style={{ opacity: 0.18 }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 80% 80% at 50% 50%, transparent 20%, var(--dark-bg) 75%)",
            }}
          />
        </div>

        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full animate-float"
          style={{
            width: 500,
            height: 500,
            border: "1px solid rgba(201,168,76,0.07)",
            pointerEvents: "none",
          }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            width: 360,
            height: 360,
            border: "1px solid rgba(201,168,76,0.12)",
            pointerEvents: "none",
          }}
        />

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <div className="section-tag stagger-1 mb-5">Платформа сохранения наследия</div>

          <h1
            className="stagger-2 mb-6 leading-tight"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(2.8rem, 7vw, 5.5rem)",
              fontWeight: 300,
              color: "#F0DFA0",
              letterSpacing: "-0.01em",
            }}
          >
            Хранители{" "}
            <span className="animate-shimmer" style={{ display: "inline-block" }}>
              древней
            </span>{" "}
            мудрости
          </h1>

          <p
            className="stagger-3 mb-10 max-w-2xl mx-auto leading-relaxed"
            style={{ color: "rgba(232,201,122,0.55)", fontSize: "1.1rem", fontWeight: 300 }}
          >
            Платформа для сохранения и изучения езидской культуры, родословных и священных традиций.
            Объединяем семьи, храним память, передаём знания.
          </p>

          <div className="stagger-4 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => scrollTo("tree")}
              className="btn-gold px-8 py-3.5 rounded-sm text-sm tracking-widest uppercase"
            >
              Исследовать древо
            </button>
            <button
              onClick={() => scrollTo("culture")}
              className="btn-outline-gold px-8 py-3.5 rounded-sm text-sm tracking-widest uppercase"
            >
              О культуре
            </button>
          </div>

          <div className="stagger-5 flex justify-center gap-12 mt-16">
            {[
              { value: "1 200+", label: "Семей" },
              { value: "48", label: "Традиций" },
              { value: "320+", label: "Записей" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "2rem",
                    color: "var(--gold)",
                    fontWeight: 500,
                  }}
                >
                  {stat.value}
                </div>
                <div className="section-tag mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-float"
          style={{ color: "rgba(201,168,76,0.35)" }}
        >
          <Icon name="ChevronDown" size={24} />
        </div>
      </section>

      {/* ── FAMILY TREE ── */}
      <section id="tree" className="py-24 px-6 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="section-tag mb-4">Архив</div>
          <h2
            style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "3rem", color: "#F0DFA0", fontWeight: 300 }}
          >
            Интерактивное родовое древо
          </h2>
          <div className="ornament-line w-32 mx-auto mt-5" />
        </div>

        <div
          className="relative rounded-lg overflow-hidden mb-10 peacock-pattern"
          style={{
            background: "var(--dark-card)",
            border: "1px solid rgba(201,168,76,0.15)",
            minHeight: 280,
          }}
        >
          <div className="absolute inset-0 flex items-center justify-center p-8">
            <div className="flex items-center gap-4 flex-wrap justify-center">
              <div className="flex flex-col items-center gap-2 cursor-pointer group">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform"
                  style={{ background: "linear-gradient(135deg, #8B6F2E, #C9A84C)", border: "2px solid rgba(201,168,76,0.5)" }}
                >
                  <Icon name="User" size={24} style={{ color: "#0D0A06" }} />
                </div>
                <span className="section-tag text-center">Прародитель</span>
              </div>

              <div className="w-16 h-px" style={{ background: "rgba(201,168,76,0.3)" }} />

              <div className="flex flex-col items-center gap-2">
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center animate-pulse-gold"
                  style={{
                    background: "linear-gradient(135deg, #5A4520, #C9A84C, #5A4520)",
                    border: "2px solid var(--gold)",
                    boxShadow: "0 0 30px rgba(201,168,76,0.3)",
                  }}
                >
                  <Icon name="GitBranch" size={28} style={{ color: "#0D0A06" }} />
                </div>
                <span style={{ color: "var(--gold)", fontFamily: "'Cormorant Garamond', serif", fontSize: "1.1rem" }}>
                  Ваш род
                </span>
              </div>

              <div className="w-16 h-px" style={{ background: "rgba(201,168,76,0.3)" }} />

              <div className="flex flex-col items-center gap-2 cursor-pointer group">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform"
                  style={{ background: "rgba(201,168,76,0.1)", border: "1px solid rgba(201,168,76,0.35)" }}
                >
                  <Icon name="Users" size={22} style={{ color: "var(--gold)" }} />
                </div>
                <span className="section-tag text-center">Потомки</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {TREE_FAMILIES.map((fam, i) => (
            <div key={i} className="card-dark rounded-lg p-5 cursor-pointer">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3
                    style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.25rem", color: "#F0DFA0" }}
                  >
                    {fam.name}
                  </h3>
                  <p className="section-tag mt-1">{fam.region}</p>
                </div>
                {fam.verified && (
                  <div
                    className="flex items-center gap-1 px-2 py-1 rounded text-xs"
                    style={{ background: "rgba(201,168,76,0.1)", color: "var(--gold-light)" }}
                  >
                    <Icon name="CheckCircle" size={12} />
                    <span>Верифицирован</span>
                  </div>
                )}
              </div>
              <div className="ornament-line mb-3" />
              <div className="flex items-center justify-between">
                <span style={{ color: "rgba(232,201,122,0.5)", fontSize: "0.85rem" }}>
                  {fam.members} участников
                </span>
                <Icon name="ChevronRight" size={16} style={{ color: "rgba(201,168,76,0.4)" }} />
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <button className="btn-gold px-8 py-3 rounded-sm text-sm tracking-widest uppercase">
            Добавить свой род
          </button>
        </div>
      </section>

      {/* ── CULTURE ── */}
      <section
        id="culture"
        className="py-24 px-6"
        style={{ background: "rgba(201,168,76,0.02)" }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="section-tag mb-4">Традиции и история</div>
            <h2
              style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "3rem", color: "#F0DFA0", fontWeight: 300 }}
            >
              Езидская культура
            </h2>
            <div className="ornament-line w-32 mx-auto mt-5" />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {CULTURE_CARDS.map((card, i) => (
              <div key={i} className="card-dark rounded-lg p-7 cursor-pointer">
                <div className="flex items-start gap-5">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{
                      background: "linear-gradient(135deg, rgba(139,111,46,0.3), rgba(201,168,76,0.2))",
                      border: "1px solid rgba(201,168,76,0.25)",
                    }}
                  >
                    <Icon name={card.icon} size={20} style={{ color: "var(--gold)" }} />
                  </div>
                  <div>
                    <h3
                      style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.35rem", color: "#F0DFA0" }}
                    >
                      {card.title}
                    </h3>
                    <p className="section-tag mb-3">{card.subtitle}</p>
                    <p style={{ color: "rgba(232,201,122,0.5)", fontSize: "0.9rem", lineHeight: 1.7 }}>
                      {card.text}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <button className="btn-outline-gold px-8 py-3 rounded-sm text-sm tracking-widest uppercase">
              Читать полную историю
            </button>
          </div>
        </div>
      </section>

      {/* ── LIBRARY ── */}
      <section id="library" className="py-24 px-6 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="section-tag mb-4">Аудиоархив</div>
          <h2
            style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "3rem", color: "#F0DFA0", fontWeight: 300 }}
          >
            Библиотека священных песнопений
          </h2>
          <div className="ornament-line w-32 mx-auto mt-5" />
        </div>

        <div className="flex flex-col gap-4">
          {CHANTS.map((chant, i) => (
            <div
              key={i}
              className="card-dark rounded-lg p-6 cursor-pointer"
              onClick={() => setActiveChant(activeChant === i ? null : i)}
            >
              <div className="flex items-center gap-5">
                <button
                  className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 transition-all"
                  style={{
                    background:
                      activeChant === i
                        ? "linear-gradient(135deg, #8B6F2E, #C9A84C)"
                        : "rgba(201,168,76,0.1)",
                    border: "1px solid rgba(201,168,76,0.3)",
                  }}
                >
                  <Icon
                    name={activeChant === i ? "Pause" : "Play"}
                    size={18}
                    style={{ color: activeChant === i ? "#0D0A06" : "var(--gold)" }}
                  />
                </button>

                <div className="flex-1">
                  <h3
                    style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.2rem", color: "#F0DFA0" }}
                  >
                    {chant.title}
                  </h3>
                  <p style={{ color: "rgba(232,201,122,0.5)", fontSize: "0.85rem" }}>{chant.subtitle}</p>
                </div>

                <div className="flex items-center gap-4">
                  <span
                    className="px-2 py-1 rounded text-xs hidden sm:block"
                    style={{ background: "rgba(201,168,76,0.1)", color: "rgba(201,168,76,0.7)" }}
                  >
                    {chant.tag}
                  </span>
                  <span className="section-tag">{chant.duration}</span>
                </div>
              </div>

              {activeChant === i && (
                <div
                  className="mt-5 pt-5 animate-fade-in-up"
                  style={{ borderTop: "1px solid rgba(201,168,76,0.1)" }}
                >
                  <div className="mb-4 rounded-full h-1" style={{ background: "rgba(201,168,76,0.15)" }}>
                    <div
                      className="h-1 rounded-full"
                      style={{ width: "35%", background: "linear-gradient(90deg, #8B6F2E, #C9A84C)" }}
                    />
                  </div>
                  <div className="section-tag mb-2">Перевод:</div>
                  <p style={{ color: "rgba(232,201,122,0.5)", fontSize: "0.9rem", fontStyle: "italic", lineHeight: 1.7 }}>
                    {chant.translation}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <button className="btn-outline-gold px-8 py-3 rounded-sm text-sm tracking-widest uppercase">
            Вся библиотека (320+ записей)
          </button>
        </div>
      </section>

      {/* ── PERSONAL CABINET ── */}
      <section
        id="cabinet"
        className="py-24 px-6"
        style={{ background: "rgba(201,168,76,0.02)", borderTop: "1px solid rgba(201,168,76,0.08)" }}
      >
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <div className="section-tag mb-4">Личный кабинет</div>
            <h2
              style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "3rem", color: "#F0DFA0", fontWeight: 300 }}
            >
              История вашей семьи
            </h2>
            <div className="ornament-line w-32 mx-auto mt-5" />
          </div>

          <div
            className="rounded-lg p-10 text-center"
            style={{
              background: "var(--dark-card)",
              border: "1px solid rgba(201,168,76,0.15)",
              boxShadow: "0 0 60px rgba(201,168,76,0.04)",
            }}
          >
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 animate-float"
              style={{
                background: "linear-gradient(135deg, rgba(139,111,46,0.2), rgba(201,168,76,0.15))",
                border: "1px solid rgba(201,168,76,0.3)",
              }}
            >
              <Icon name="UserCircle" size={36} style={{ color: "var(--gold)" }} />
            </div>

            <h3
              className="mb-4"
              style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.8rem", color: "#F0DFA0" }}
            >
              Создайте свой профиль
            </h3>
            <p
              className="mb-8 max-w-md mx-auto"
              style={{ color: "rgba(232,201,122,0.45)", lineHeight: 1.8, fontSize: "0.95rem" }}
            >
              Добавьте историю своей семьи, загрузите документы, свяжитесь с родственниками и внесите свой вклад в сохранение езидского наследия.
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-10">
              {["Семейный архив", "Документы рода", "Связь с родными", "Проверка данных"].map((feat) => (
                <div
                  key={feat}
                  className="flex items-center gap-2 px-4 py-2 rounded"
                  style={{ background: "rgba(201,168,76,0.08)", border: "1px solid rgba(201,168,76,0.15)" }}
                >
                  <Icon name="Check" size={14} style={{ color: "var(--gold)" }} />
                  <span style={{ color: "rgba(232,201,122,0.7)", fontSize: "0.85rem" }}>{feat}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              <button className="btn-gold px-8 py-3.5 rounded-sm text-sm tracking-widest uppercase">
                Зарегистрироваться
              </button>
              <button className="btn-outline-gold px-8 py-3.5 rounded-sm text-sm tracking-widest uppercase">
                Войти
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="py-24 px-6 max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <div className="section-tag mb-4">Обратная связь</div>
          <h2
            style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "3rem", color: "#F0DFA0", fontWeight: 300 }}
          >
            Свяжитесь с нами
          </h2>
          <div className="ornament-line w-32 mx-auto mt-5" />
          <p className="mt-6" style={{ color: "rgba(232,201,122,0.45)", fontSize: "0.95rem" }}>
            Есть вопросы о платформе или хотите добавить информацию о своём роде?
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10">
          <div className="flex flex-col gap-5">
            {[
              { icon: "Mail", label: "Email", value: "heritage@ezidi.org" },
              { icon: "Globe", label: "Сайт", value: "ezidi-heritage.org" },
              { icon: "MapPin", label: "Офис", value: "Ереван, Армения" },
            ].map((contact) => (
              <div key={contact.label} className="flex items-center gap-4">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: "rgba(201,168,76,0.1)", border: "1px solid rgba(201,168,76,0.2)" }}
                >
                  <Icon name={contact.icon} size={16} style={{ color: "var(--gold)" }} />
                </div>
                <div>
                  <div className="section-tag">{contact.label}</div>
                  <div style={{ color: "rgba(232,201,122,0.7)", fontSize: "0.9rem" }}>{contact.value}</div>
                </div>
              </div>
            ))}
          </div>

          <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
            <input
              placeholder="Ваше имя"
              value={contactForm.name}
              onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
              className="rounded px-4 py-3 text-sm outline-none transition-all"
              style={{
                background: "var(--dark-card)",
                border: "1px solid rgba(201,168,76,0.15)",
                color: "rgba(232,201,122,0.8)",
                fontFamily: "'IBM Plex Sans', sans-serif",
              }}
              onFocus={(e) => (e.target.style.borderColor = "rgba(201,168,76,0.4)")}
              onBlur={(e) => (e.target.style.borderColor = "rgba(201,168,76,0.15)")}
            />
            <input
              placeholder="Email"
              type="email"
              value={contactForm.email}
              onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
              className="rounded px-4 py-3 text-sm outline-none transition-all"
              style={{
                background: "var(--dark-card)",
                border: "1px solid rgba(201,168,76,0.15)",
                color: "rgba(232,201,122,0.8)",
                fontFamily: "'IBM Plex Sans', sans-serif",
              }}
              onFocus={(e) => (e.target.style.borderColor = "rgba(201,168,76,0.4)")}
              onBlur={(e) => (e.target.style.borderColor = "rgba(201,168,76,0.15)")}
            />
            <textarea
              placeholder="Ваше сообщение..."
              rows={4}
              value={contactForm.message}
              onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
              className="rounded px-4 py-3 text-sm outline-none transition-all resize-none"
              style={{
                background: "var(--dark-card)",
                border: "1px solid rgba(201,168,76,0.15)",
                color: "rgba(232,201,122,0.8)",
                fontFamily: "'IBM Plex Sans', sans-serif",
              }}
              onFocus={(e) => (e.target.style.borderColor = "rgba(201,168,76,0.4)")}
              onBlur={(e) => (e.target.style.borderColor = "rgba(201,168,76,0.15)")}
            />
            <button className="btn-gold py-3 rounded-sm text-sm tracking-widest uppercase">
              Отправить сообщение
            </button>
          </form>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer
        className="py-10 px-6 text-center"
        style={{ borderTop: "1px solid rgba(201,168,76,0.1)" }}
      >
        <div className="flex items-center justify-center gap-3 mb-4">
          <div
            className="w-6 h-6 rounded-full flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #8B6F2E, #C9A84C)" }}
          >
            <Icon name="Sun" size={12} style={{ color: "#0D0A06" }} />
          </div>
          <span
            style={{ fontFamily: "'Cormorant Garamond', serif", color: "var(--gold)", fontSize: "1.1rem" }}
          >
            Êzidî Heritage
          </span>
        </div>
        <div className="ornament-line w-24 mx-auto mb-4" />
        <p className="section-tag">© 2024 · Платформа сохранения езидского наследия</p>
        <p className="mt-2" style={{ color: "rgba(201,168,76,0.2)", fontSize: "0.75rem" }}>
          Весь контент проходит проверку перед публикацией
        </p>
      </footer>
    </div>
  );
}