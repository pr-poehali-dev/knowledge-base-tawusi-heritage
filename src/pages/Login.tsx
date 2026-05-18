import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import Icon from "@/components/ui/icon";
import LanguageSwitcher from "@/components/LanguageSwitcher";

type Mode = "login" | "register";

export default function Login() {
  const { t } = useTranslation();
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const [mode, setMode] = useState<Mode>("login");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const inputStyle = {
    background: "var(--dark-card)",
    border: "1px solid rgba(201,168,76,0.15)",
    color: "rgba(232,201,122,0.85)",
    fontFamily: "'IBM Plex Sans', sans-serif",
    outline: "none",
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.style.borderColor = "rgba(201,168,76,0.45)";
  };
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.style.borderColor = "rgba(201,168,76,0.15)";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (mode === "register" && password !== passwordConfirm) {
      setError(t("register.error_passwords"));
      return;
    }

    setLoading(true);
    try {
      if (mode === "login") {
        await login(email, password);
      } else {
        await register(email, name, password);
      }
      navigate("/");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "";
      if (msg === "invalid_credentials") setError(t("login.error_invalid"));
      else if (msg === "email_taken") setError(t("register.error_email_taken"));
      else setError(t("login.error_network"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: "var(--dark-bg)" }}
    >
      {/* Top bar */}
      <div
        className="flex items-center justify-between px-6 py-4"
        style={{ borderBottom: "1px solid rgba(201,168,76,0.08)" }}
      >
        <Link to="/" className="flex items-center gap-2 group">
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #8B6F2E, #C9A84C)" }}
          >
            <Icon name="Sun" size={14} style={{ color: "#0D0A06" }} />
          </div>
          <span
            style={{ fontFamily: "'Cormorant Garamond', serif", color: "var(--gold)", fontSize: "1.05rem" }}
          >
            Êzidî Heritage
          </span>
        </Link>

        <div className="flex items-center gap-4">
          <LanguageSwitcher />
          <Link
            to="/"
            className="flex items-center gap-1.5 text-xs transition-all"
            style={{ color: "rgba(201,168,76,0.45)" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(201,168,76,0.8)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(201,168,76,0.45)")}
          >
            <Icon name="ArrowLeft" size={13} />
            <span style={{ fontFamily: "'IBM Plex Sans', sans-serif", letterSpacing: "0.05em" }}>
              {t("login.back_home")}
            </span>
          </Link>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          {/* Decorative rings */}
          <div className="relative flex justify-center mb-8">
            <div
              className="absolute rounded-full animate-float"
              style={{
                width: 180,
                height: 180,
                border: "1px solid rgba(201,168,76,0.07)",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                pointerEvents: "none",
              }}
            />
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center animate-pulse-gold"
              style={{
                background: "linear-gradient(135deg, #5A4520, #C9A84C, #5A4520)",
                border: "2px solid rgba(201,168,76,0.5)",
                boxShadow: "0 0 40px rgba(201,168,76,0.2)",
                zIndex: 1,
              }}
            >
              <Icon name="Sun" size={28} style={{ color: "#0D0A06" }} />
            </div>
          </div>

          {/* Heading */}
          <div className="text-center mb-8">
            <h1
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "2.4rem",
                fontWeight: 300,
                color: "#F0DFA0",
                letterSpacing: "-0.01em",
              }}
            >
              {mode === "login" ? t("login.title") : t("register.title")}
            </h1>
            <p className="mt-2" style={{ color: "rgba(232,201,122,0.45)", fontSize: "0.9rem" }}>
              {mode === "login" ? t("login.description") : t("register.subtitle")}
            </p>
          </div>

          {/* Tab switcher */}
          <div
            className="flex rounded-sm mb-7 p-0.5"
            style={{ background: "rgba(201,168,76,0.05)", border: "1px solid rgba(201,168,76,0.1)" }}
          >
            {(["login", "register"] as Mode[]).map((m) => (
              <button
                key={m}
                onClick={() => { setMode(m); setError(""); }}
                className="flex-1 py-2.5 rounded-sm text-sm transition-all"
                style={{
                  fontFamily: "'IBM Plex Sans', sans-serif",
                  letterSpacing: "0.04em",
                  background: mode === m ? "linear-gradient(135deg, #8B6F2E, #C9A84C)" : "transparent",
                  color: mode === m ? "#0D0A06" : "rgba(201,168,76,0.5)",
                  fontWeight: mode === m ? 600 : 400,
                }}
              >
                {m === "login" ? t("nav.login") : t("nav.register")}
              </button>
            ))}
          </div>

          {/* Form card */}
          <div
            className="rounded-lg p-8"
            style={{
              background: "var(--dark-card)",
              border: "1px solid rgba(201,168,76,0.13)",
              boxShadow: "0 0 50px rgba(201,168,76,0.04)",
            }}
          >
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {mode === "register" && (
                <div>
                  <label
                    className="block mb-1.5 text-xs"
                    style={{ color: "rgba(201,168,76,0.55)", fontFamily: "'IBM Plex Sans', sans-serif", letterSpacing: "0.08em", textTransform: "uppercase" }}
                  >
                    {t("register.name")}
                  </label>
                  <input
                    type="text"
                    placeholder={t("register.name_placeholder")}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    required
                    className="w-full rounded px-4 py-3 text-sm transition-all"
                    style={inputStyle}
                  />
                </div>
              )}

              <div>
                <label
                  className="block mb-1.5 text-xs"
                  style={{ color: "rgba(201,168,76,0.55)", fontFamily: "'IBM Plex Sans', sans-serif", letterSpacing: "0.08em", textTransform: "uppercase" }}
                >
                  {t(`${mode}.email`)}
                </label>
                <input
                  type="email"
                  placeholder={t(`${mode}.email_placeholder`)}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  required
                  className="w-full rounded px-4 py-3 text-sm transition-all"
                  style={inputStyle}
                />
              </div>

              <div>
                <label
                  className="block mb-1.5 text-xs"
                  style={{ color: "rgba(201,168,76,0.55)", fontFamily: "'IBM Plex Sans', sans-serif", letterSpacing: "0.08em", textTransform: "uppercase" }}
                >
                  {t(`${mode}.password`)}
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder={t(`${mode}.password_placeholder`)}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    required
                    minLength={8}
                    className="w-full rounded px-4 py-3 text-sm transition-all pr-11"
                    style={inputStyle}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                    style={{ color: "rgba(201,168,76,0.4)" }}
                  >
                    <Icon name={showPassword ? "EyeOff" : "Eye"} size={16} />
                  </button>
                </div>
              </div>

              {mode === "register" && (
                <div>
                  <label
                    className="block mb-1.5 text-xs"
                    style={{ color: "rgba(201,168,76,0.55)", fontFamily: "'IBM Plex Sans', sans-serif", letterSpacing: "0.08em", textTransform: "uppercase" }}
                  >
                    {t("register.password_confirm")}
                  </label>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder={t("register.password_confirm_placeholder")}
                    value={passwordConfirm}
                    onChange={(e) => setPasswordConfirm(e.target.value)}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    required
                    className="w-full rounded px-4 py-3 text-sm transition-all"
                    style={inputStyle}
                  />
                </div>
              )}

              {mode === "login" && (
                <div className="flex items-center justify-end">
                  <button
                    type="button"
                    className="text-xs transition-all"
                    style={{ color: "rgba(201,168,76,0.4)", fontFamily: "'IBM Plex Sans', sans-serif" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(201,168,76,0.7)")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(201,168,76,0.4)")}
                  >
                    {t("login.forgot_password")}
                  </button>
                </div>
              )}

              {error && (
                <div
                  className="flex items-center gap-2 px-4 py-3 rounded text-sm"
                  style={{ background: "rgba(220,50,50,0.1)", border: "1px solid rgba(220,50,50,0.25)", color: "rgba(255,120,120,0.9)" }}
                >
                  <Icon name="AlertCircle" size={15} />
                  <span>{error}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="btn-gold py-3.5 rounded-sm text-sm tracking-widest uppercase mt-1"
                style={{ opacity: loading ? 0.7 : 1, cursor: loading ? "not-allowed" : "pointer" }}
              >
                {loading
                  ? t(`${mode}.submitting`)
                  : mode === "login" ? t("login.submit") : t("register.submit")}
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-3 my-5">
              <div className="flex-1 ornament-line" />
              <span className="section-tag">{t("login.or")}</span>
              <div className="flex-1 ornament-line" />
            </div>

            <p className="text-center text-sm" style={{ color: "rgba(201,168,76,0.4)", fontFamily: "'IBM Plex Sans', sans-serif" }}>
              {mode === "login" ? t("login.no_account") : t("register.have_account")}{" "}
              <button
                onClick={() => { setMode(mode === "login" ? "register" : "login"); setError(""); }}
                className="transition-all"
                style={{ color: "var(--gold)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--gold-light)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--gold)")}
              >
                {mode === "login" ? t("login.create_account") : t("register.sign_in")}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
