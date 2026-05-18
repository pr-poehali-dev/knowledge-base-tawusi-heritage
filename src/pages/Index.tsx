import { useState } from "react";
import Navbar from "@/components/Navbar";
import HeroAndContent from "@/components/HeroAndContent";
import LibraryAndCabinet from "@/components/LibraryAndCabinet";
import ContactAndFooter from "@/components/ContactAndFooter";

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
      <Navbar
        activeSection={activeSection}
        mobileMenuOpen={mobileMenuOpen}
        onScrollTo={scrollTo}
        onToggleMobile={() => setMobileMenuOpen(!mobileMenuOpen)}
      />
      <HeroAndContent onScrollTo={scrollTo} />
      <LibraryAndCabinet
        activeChant={activeChant}
        onSetActiveChant={setActiveChant}
      />
      <ContactAndFooter
        contactForm={contactForm}
        onSetContactForm={setContactForm}
      />
    </div>
  );
}
