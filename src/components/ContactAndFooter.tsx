import Icon from "@/components/ui/icon";

interface ContactForm {
  name: string;
  email: string;
  message: string;
}

interface ContactAndFooterProps {
  contactForm: ContactForm;
  onSetContactForm: (form: ContactForm) => void;
}

export default function ContactAndFooter({ contactForm, onSetContactForm }: ContactAndFooterProps) {
  return (
    <>
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
              onChange={(e) => onSetContactForm({ ...contactForm, name: e.target.value })}
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
              onChange={(e) => onSetContactForm({ ...contactForm, email: e.target.value })}
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
              onChange={(e) => onSetContactForm({ ...contactForm, message: e.target.value })}
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
    </>
  );
}
