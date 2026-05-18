import Icon from "@/components/ui/icon";

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

interface LibraryAndCabinetProps {
  activeChant: number | null;
  onSetActiveChant: (index: number | null) => void;
}

export default function LibraryAndCabinet({ activeChant, onSetActiveChant }: LibraryAndCabinetProps) {
  return (
    <>
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
              onClick={() => onSetActiveChant(activeChant === i ? null : i)}
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
    </>
  );
}
