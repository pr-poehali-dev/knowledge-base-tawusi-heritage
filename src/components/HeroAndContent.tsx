import Icon from "@/components/ui/icon";

const PEACOCK_IMAGE = "https://cdn.poehali.dev/projects/fa7a9dc1-94fe-4481-b369-7a53779b1282/files/66d766c9-eafb-42fc-83b2-481c5624befb.jpg";

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

const TREE_FAMILIES = [
  { name: "Род Синджари", members: 847, region: "Синджар, Ирак", verified: true },
  { name: "Род Шайхани", members: 312, region: "Армения, Диаспора", verified: true },
  { name: "Род Малканди", members: 556, region: "Германия, Диаспора", verified: false },
];

interface HeroAndContentProps {
  onScrollTo: (id: string) => void;
}

export default function HeroAndContent({ onScrollTo }: HeroAndContentProps) {
  return (
    <>
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
              onClick={() => onScrollTo("tree")}
              className="btn-gold px-8 py-3.5 rounded-sm text-sm tracking-widest uppercase"
            >
              Исследовать древо
            </button>
            <button
              onClick={() => onScrollTo("culture")}
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
    </>
  );
}
