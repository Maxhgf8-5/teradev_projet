import { useEffect, useRef, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import robotGlobe from "./assets/robot-globe.jpg";

function BubbleField() {
  const bubbles = [
    {
      left: "5%",
      size: 200,
      dur: 26,
      delay: 0,
      o: 0.16,
      c: "rgba(165,205,72,.55)",
    },
    {
      left: "18%",
      size: 90,
      dur: 18,
      delay: 4,
      o: 0.14,
      c: "rgba(12,41,49,.45)",
    },
    {
      left: "30%",
      size: 320,
      dur: 34,
      delay: 2,
      o: 0.12,
      c: "rgba(169,189,145,.6)",
    },
    {
      left: "45%",
      size: 60,
      dur: 16,
      delay: 7,
      o: 0.18,
      c: "rgba(165,205,72,.5)",
    },
    {
      left: "55%",
      size: 150,
      dur: 22,
      delay: 1,
      o: 0.13,
      c: "rgba(12,41,49,.4)",
    },
    {
      left: "65%",
      size: 260,
      dur: 30,
      delay: 6,
      o: 0.1,
      c: "rgba(165,205,72,.5)",
    },
    {
      left: "76%",
      size: 70,
      dur: 17,
      delay: 3,
      o: 0.16,
      c: "rgba(124,130,134,.5)",
    },
    {
      left: "84%",
      size: 190,
      dur: 28,
      delay: 9,
      o: 0.13,
      c: "rgba(12,41,49,.45)",
    },
    {
      left: "92%",
      size: 110,
      dur: 20,
      delay: 5,
      o: 0.15,
      c: "rgba(165,205,72,.55)",
    },
    {
      left: "14%",
      size: 240,
      dur: 32,
      delay: 11,
      o: 0.11,
      c: "rgba(169,189,145,.6)",
    },
  ];
  return (
    <div className="bubbles">
      {bubbles.map((b, i) => (
        <span
          key={i}
          className="bubble"
          style={{
            left: b.left,
            width: b.size,
            height: b.size,
            background: b.c,
            "--bo": b.o,
            animationDuration: `${b.dur}s`,
            animationDelay: `${b.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

const partners = [
  { name: "AfriGeo", tag: "Géomatique", initials: "AF", bg: "bg-[#7fae35]" },
  {
    name: "TerraPlus",
    tag: "Développement",
    initials: "TP",
    bg: "bg-[#0c2931]",
  },
  { name: "CityLab", tag: "Urbanisme", initials: "CL", bg: "bg-[#a9bd91]" },
  { name: "AgriData", tag: "Données", initials: "AD", bg: "bg-[#88ae3b]" },
  { name: "EcoMap", tag: "Environnement", initials: "EM", bg: "bg-[#173d43]" },
  { name: "UrbanDev", tag: "Projets", initials: "UD", bg: "bg-[#5a7d63]" },
  { name: "HydroTer", tag: "Eau & Sols", initials: "HT", bg: "bg-[#4a7c8f]" },
  { name: "GeoCoop", tag: "Coopération", initials: "GC", bg: "bg-[#7fae35]" },
];

function PartnersSlider() {
  const trackRef = useRef(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(true);
  const [paused, setPaused] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const resumeT = useRef(null);

  const hold = (ms = 4000) => {
    setPaused(true);
    clearTimeout(resumeT.current);
    resumeT.current = setTimeout(() => setPaused(false), ms);
  };
  const release = () => {
    setPaused(false);
    clearTimeout(resumeT.current);
  };

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const update = () => {
      setCanLeft(el.scrollLeft > 4);
      setCanRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
    };
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      clearTimeout(resumeT.current);
    };
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    if (paused) return;
    let raf = 0;
    const speed = 0.6;
    const copyWidth = () => el.scrollWidth / 2;
    const tick = () => {
      el.scrollLeft += speed;
      if (el.scrollLeft >= copyWidth()) {
        el.scrollLeft -= copyWidth();
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [paused]);

  const scrollBy = (dir) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({
      left: dir * Math.min(320, el.clientWidth * 0.75),
      behavior: "smooth",
    });
    hold();
  };

  return (
    <div className="relative z-[2]">
      <button
        type="button"
        aria-label="Partenaires précédents"
        onClick={() => scrollBy(-1)}
        disabled={!canLeft}
        className="absolute left-[6px] top-1/2 -translate-y-1/2 z-[3] w-[44px] h-[44px] rounded-full bg-white shadow-[0_10px_24px_rgba(12,41,49,.22)] grid place-items-center text-[20px] text-[#0c2931] hover:text-green hover:scale-105 transition disabled:opacity-35 disabled:cursor-default"
      >
        ‹
      </button>
      <button
        type="button"
        aria-label="Partenaires suivants"
        onClick={() => scrollBy(1)}
        disabled={!canRight}
        className="absolute right-[6px] top-1/2 -translate-y-1/2 z-[3] w-[44px] h-[44px] rounded-full bg-white shadow-[0_10px_24px_rgba(12,41,49,.22)] grid place-items-center text-[20px] text-[#0c2931] hover:text-green hover:scale-105 transition disabled:opacity-35 disabled:cursor-default"
      >
        ›
      </button>

      <div
        ref={trackRef}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={release}
        onTouchStart={() => setPaused(true)}
        onTouchEnd={() => hold(3000)}
        className="flex gap-[20px] overflow-x-auto no-scrollbar py-[12px] px-[24px]"
      >
        {[...partners, ...partners].map((p, i) => (
          <div
            key={`${p.name}-${i}`}
            className="w-[230px] shrink-0  rounded-[20px] shadow-[0_18px_40px_rgba(12,41,49,.12)] flex flex-col items-center gap-[14px] py-[26px] px-[20px]"
          >
            <div
              className={`w-[72px] h-[72px] rounded-2xl grid place-items-center font-display font-bold text-[22px] text-white ${p.bg}`}
            >
              {p.initials}
            </div>
            <div className="text-center">
              <span className="block font-display font-bold text-[16px] text-[#7b888b]">
                {p.name}
              </span>
              <span className="block text-[9px] tracking-[2px] uppercase text-[#7b888b] mt-[4px]">
                {p.tag}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Counter({ to, suffix = "" }) {
  const ref = useRef(null);
  const [val, setVal] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (!("IntersectionObserver" in window)) {
      setTimeout(() => setVal(to), 0);
      return;
    }
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        obs.disconnect();
        if (reduce) {
          setVal(to);
          return;
        }
        let start = null;
        const duration = 1600;
        const step = (ts) => {
          if (start === null) start = ts;
          const p = Math.min((ts - start) / duration, 1);
          setVal(Math.round(to * (1 - Math.pow(1 - p, 3))));
          if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      },
      { threshold: 0.3 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [to]);

  return (
    <span ref={ref}>
      {val}
      {suffix}
    </span>
  );
}

function App() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) setMenuOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const menuLinks = [
    { href: "#home", label: "Accueil" },
    { href: "#cabinet", label: "Le cabinet" },
    { href: "#expertise", label: "Pôles d'expertise" },
    { href: "#method", label: "Notre méthode" },
    { href: "#partners", label: "Nos partenaires" },
    { href: "#stats", label: "Chiffres clés" },
    { href: "#contact", label: "Contact" },
  ];

  useEffect(() => {
    AOS.init({
      once: true,
      duration: 800,
      easing: "ease-out-cubic",
      offset: 60,
    });
  }, []);

  return (
    <div className="max-w-[1440px] mx-auto bg-bg overflow-hidden font-sans text-ink">
      {/* ========== HEADER (fixe) ========== */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 h-[105px] max-[650px]:h-[78px] transition-colors duration-300 ${
          scrolled
            ? "bg-dark/95 backdrop-blur-[10px] border-b border-white/[.08] shadow-[0_12px_32px_rgba(0,0,0,.28)]"
            : "border-b border-white/[.12]"
        }`}
      >
        <div className="max-w-[1440px] mx-auto h-full px-[7%] max-[650px]:px-[6%] flex items-center justify-between text-white">
          <a
            href="#home"
            className="flex items-center gap-[10px] font-display font-bold text-[23px]"
          >
            <span className="brand-icon-wrap">
              <i />
              <b />
            </span>
            <span>
              TERA<span className="text-green">DEV</span>
            </span>
          </a>

          <nav className="hidden lg:flex gap-[18px] xl:gap-[30px] ml-[60px] xl:ml-[100px]">
            <a className="text-xs font-medium" href="#home">
              Accueil
            </a>
            <a
              className="text-white/[.6] text-xs font-medium hover:text-white transition"
              href="#cabinet"
            >
              Le cabinet
            </a>
            <a
              className="text-white/[.6] text-xs font-medium hover:text-white transition"
              href="#expertise"
            >
              Pôles d'expertise
            </a>
            <a
              className="text-white/[.6] text-xs font-medium hover:text-white transition"
              href="#method"
            >
              Notre méthode
            </a>
            <a
              className="text-white/[.6] text-xs font-medium hover:text-white transition"
              href="#partners"
            >
              Nos partenaires
            </a>
            <a
              className="text-white/[.6] text-xs font-medium hover:text-white transition"
              href="#stats"
            >
              Chiffres clés
            </a>
            <a
              className="text-white/[.6] text-xs font-medium hover:text-white transition"
              href="#contact"
            >
              Contact
            </a>
          </nav>

          <div className="flex items-center gap-[16px]">
            <a
              className="hidden lg:inline-flex items-center gap-[8px] bg-green text-[#183037] py-[12px] px-[18px] rounded-full text-[11px] font-bold hover:-translate-y-0.5 hover:brightness-110 transition-all"
              href="#contact"
            >
              Nous contacter <span className="text-green2">↗</span>
            </a>

            <button
              type="button"
              aria-label="Ouvrir le menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((o) => !o)}
              className="lg:hidden relative w-[44px] h-[44px] grid place-items-center transition"
            >
              <span
                className="absolute w-[18px] h-[2px] bg-white rounded-full transition-all duration-300"
                style={{
                  transform: menuOpen ? "rotate(45deg)" : "translateY(-5px)",
                }}
              />
              <span
                className="absolute w-[18px] h-[2px] bg-white rounded-full transition-opacity duration-200"
                style={{ opacity: menuOpen ? 0 : 1 }}
              />
              <span
                className="absolute w-[18px] h-[2px] bg-white rounded-full transition-all duration-300"
                style={{
                  transform: menuOpen ? "rotate(-45deg)" : "translateY(5px)",
                }}
              />
            </button>
          </div>
        </div>
      </header>

      {/* ========== MENU MOBILE / TABLETTE ========== */}
      <div
        className={`fixed inset-0 z-[70] lg:hidden ${menuOpen ? "" : "pointer-events-none"}`}
      >
        <div
          className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${menuOpen ? "opacity-100" : "opacity-0"}`}
          onClick={() => setMenuOpen(false)}
        ></div>

        <aside
          className={`absolute right-0 top-0 h-full w-[90%] max-w-[420px] bg-[#0c2931] text-white shadow-2xl transition-transform duration-400 ease-out flex flex-col ${menuOpen ? "translate-x-0" : "translate-x-full"}`}
        >
          <div className="h-[105px] max-[650px]:h-[78px] px-[7%] max-[650px]:px-[6%] flex items-center justify-between shrink-0">
            <a
              href="#home"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-[10px] font-display font-bold text-[23px]"
            >
              <span className="brand-icon-wrap">
                <i />
                <b />
              </span>
              <span>
                TERA<span className="text-green">DEV</span>
              </span>
            </a>
            <button
              type="button"
              aria-label="Fermer le menu"
              onClick={() => setMenuOpen(false)}
              className="w-[44px] h-[44px] rounded-full border border-white/[.18] bg-white/[.06] grid place-items-center text-[20px] text-white hover:text-green transition"
            >
              ✕
            </button>
          </div>

          <nav className="px-[8%] max-[650px]:px-[7%] pt-[10px] flex flex-col gap-[20px] overflow-y-auto">
            {menuLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="font-display text-[24px] max-[650px]:text-[22px] text-white/[.78] hover:text-green transition flex items-center justify-between group"
              >
                {link.label}
                <span className="text-green text-[14px] opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition">
                  ↗
                </span>
              </a>
            ))}
          </nav>

          <div className="mt-auto px-[8%] max-[650px]:px-[7%] pb-[44px] max-[650px]:pb-[36px]">
            <a
              href="#contact"
              onClick={() => setMenuOpen(false)}
              className="block text-center bg-green text-[#183037] py-[15px] rounded-full text-xs font-bold hover:brightness-110 transition"
            >
              Nous contacter <span>↗</span>
            </a>
            <p className="text-white/[.38] text-[10px] text-center mt-[18px] tracking-[1px]">
              contact@teradev.exemple
            </p>
          </div>
        </aside>
      </div>

      {/* ========== HERO ========== */}
      <section
        className="relative min-h-[900px] max-[650px]:min-h-[800px] pt-[105px] max-[650px]:pt-[78px] overflow-hidden text-white rounded-b-[38px] max-[650px]:rounded-b-[24px] bg-[#102e36]"
        id="home"
      >
        <div
          className="absolute inset-0 bg-cover bg-center scale-[1.03]"
          style={{ backgroundImage: `url(${robotGlobe})` }}
        ></div>
        <div className="absolute inset-0 hero-overlay-gradient"></div>

        <div className="relative z-[3] min-h-[660px] px-[7%] max-[650px]:px-[6%] pt-[75px] max-[650px]:pt-[55px] pb-[20px] grid grid-cols-2 max-[900px]:grid-cols-1 items-center">
          <div className="mt-[-20px]"> 
            <h1
              data-aos="fade-up"
              data-aos-delay="100"
              className="font-display text-[clamp(54px,6.2vw,91px)] max-[650px]:text-[51px] max-[650px]:tracking-[-3px] leading-[.91] tracking-[-5px] font-semibold"
            >
              PLANIFIER
              <br />
              <em className="not-italic text-green">TRANSFORMER</em>
              <br />
              IMPACTER
            </h1>

            <p
              data-aos="fade-up"
              data-aos-delay="200"
              className="max-w-[440px] my-[30px] text-white/[.63] text-sm leading-[1.7]"
            >
              Des solutions innovantes pour des territoires résilients,
              inclusifs et durables
            </p>

            <a
              data-aos="fade-up"
              data-aos-delay="300"
              className="inline-flex items-center gap-[14px] bg-green text-black py-[13px] px-[19px] rounded-full text-xs font-bold hover:-translate-y-0.5 hover:brightness-110 transition-all"
              href="#contact"
            >
              Demander une expertise <span>↗</span>
            </a>
          </div>

 
        </div>

        <div
          data-aos="fade-up"
          data-aos-delay="600"
          className="absolute z-[5] left-[7%] max-[650px]:left-[6%] right-[7%] max-[650px]:right-[6%] bottom-[34px] flex justify-between items-center"
        >
    
          <a
            className="text-[11px] flex items-center gap-[10px] text-white/[.75] max-[650px]:hidden"
            href="#expertise"
          >
            <span className="w-[29px] h-[29px] border border-white/35 grid place-items-center rounded-full text-[8px]">
              ▶
            </span>
            Découvrir nos pôles d'expertise
          </a>

          <div className="text-[8px] tracking-[2px] text-white/[.38]">
            DÉFILER
            <span className="text-green text-sm ml-[8px]">↓</span>
          </div>
        </div>
      </section>

      {/* ========== LE CABINET ========== */}
      <section
        className="relative overflow-hidden py-[125px] max-[650px]:py-[85px] px-[9%] max-[650px]:px-[7%]"
        id="cabinet"
      >
        <BubbleField />
    

        <div className="relative z-[2] grid grid-cols-[1.35fr_.65fr] max-[900px]:grid-cols-1 max-[900px]:gap-[30px] gap-[80px] items-end max-[900px]:items-start">
          <h2
            data-aos="fade-up"
            className="max-w-[820px] font-display text-[clamp(40px,4.7vw,67px)] leading-[1.02] tracking-[-3px] font-semibold"
          >
            Un cabinet d'ingénierie et de conseil dédié au{" "}
            <span className="text-[#88ae3b]">développement</span> des
            territoires
          </h2>
          <p
            data-aos="fade-up"
            data-aos-delay="150"
            className="text-muted text-[13px] leading-[1.8]"
          >
            TERADEV accompagne les collectivités, les institutions et les
            porteurs de projets dans la planification, la transformation et
            l'impact de leurs territoires
          </p>
        </div>

        <div className="relative z-[2] grid grid-cols-[1.4fr_.8fr_.8fr] max-[900px]:grid-cols-1 gap-[14px] mt-[75px] max-[650px]:mt-[50px]">
          <article
            data-aos="fade-up"
            className="card-lift relative min-h-[300px] rounded-[22px] overflow-hidden p-[27px] bg-[#a9bd91]"
          >
            <div className="card-bg absolute inset-0 fake-farm-bg"></div>
            <span className="card-arrow absolute z-[3] right-[24px] top-[22px] w-[34px] h-[34px] grid place-items-center rounded-full bg-white/20 text-white text-[12px]">
              ↗
            </span>
            <div className="absolute z-[2] left-[27px] right-[27px] bottom-[25px] text-white">
              <h3 className="font-display text-[25px] mt-[8px]">Résilience</h3>
              <p className="text-[11px] leading-[1.6] text-white/[.75] mt-[10px] max-w-[230px]">
                Des territoires capables de s'adapter aux enjeux climatiques et
                sociaux
              </p>
            </div>
          </article>

          <article
            data-aos="fade-up"
            data-aos-delay="150"
            className="card-lift relative min-h-[300px] rounded-[22px] overflow-hidden p-[27px] bg-[#c9dbab]"
          >
            <span className="card-arrow absolute right-[24px] top-[22px] w-[34px] h-[34px] grid place-items-center rounded-full bg-dark text-green text-[12px]">
              ↗
            </span>
            <div className="card-icon text-[45px] text-green mt-[65px]">⌁</div>
            <h3 className="font-display text-[25px] mt-[8px]">Inclusion</h3>
            <p className="text-[11px] leading-[1.6] text-[#728083] mt-[12px] max-w-[210px]">
              Les populations et les acteurs locaux au cœur de chaque projet
            </p>
          </article>

          <article
            data-aos="fade-up"
            data-aos-delay="300"
            className="card-lift relative min-h-[300px] rounded-[22px] overflow-hidden p-[27px] bg-dark text-white"
          >
            <span className="card-arrow absolute right-[24px] top-[22px] w-[34px] h-[34px] grid place-items-center rounded-full bg-white/15 text-green text-[12px]">
              ↗
            </span>
            <div className="card-icon text-[45px] text-green mt-[65px]">◌</div>
            <h3 className="font-display text-[25px] mt-[8px]">Durabilité</h3>
            <p className="text-[11px] leading-[1.6] text-white/[.42] mt-[12px] max-w-[210px]">
              Répondre aux besoins du présent sans compromettre l'avenir
            </p>
          </article>
        </div>
      </section>

      {/* ========== PÔLES D'EXPERTISE ========== */}
      <section
        className="py-[120px] max-[650px]:py-[85px] px-[9%] max-[650px]:px-[7%] bg-dark text-white"
        id="expertise"
      >
       

        <div className="grid grid-cols-[1fr_.55fr] max-[900px]:grid-cols-1 max-[900px]:gap-[30px] gap-[80px] items-end mb-[70px]">
          <h2
            data-aos="fade-up"
            className="font-display text-[clamp(47px,5vw,72px)] leading-[.98] tracking-[-3px] font-semibold"
          >
            Huit pôles,
            <br />
            une <span className="text-green">vision intégrée</span>
          </h2>
          <p
            data-aos="fade-up"
            data-aos-delay="150"
            className="text-white/[.45] text-[13px] leading-[1.8]"
          >
            Une expertise complète au service de vos projets de territoire, de
            l'étude à la mise en œuvre
          </p>
        </div>

        <div className="grid grid-cols-4 max-[1000px]:grid-cols-2 max-[650px]:grid-cols-1 gap-px bg-white/[.13]">
          <article
            data-aos="fade-up"
            className="bg-dark min-h-[260px] p-[28px] relative"
          >
            <span className="text-[9px] text-green">01</span>
            <h3 className="font-display mt-[90px] max-w-[170px] text-[21px] leading-[1.15]">
              Aménagement du territoire
            </h3>
            <p className="text-white/[.40] text-[11px] leading-[1.6] max-w-[250px] mt-[10px]">
              Schémas directeurs, planification urbaine et développement local
            </p>
            <b className="absolute right-[28px] bottom-[28px] text-green font-normal">
              ↗
            </b>
          </article>
          <article
            data-aos="fade-up"
            data-aos-delay="100"
            className="bg-dark min-h-[260px] p-[28px] relative"
          >
            <span className="text-[9px] text-green">02</span>
            <h3 className="font-display mt-[90px] max-w-[170px] text-[21px] leading-[1.15]">
              SIG & Géomatique
            </h3>
            <p className="text-white/[.40] text-[11px] leading-[1.6] max-w-[250px] mt-[10px]">
              Cartographie, analyse spatiale et systèmes d'information
              géographique.
            </p>
            <b className="absolute right-[28px] bottom-[28px] text-green font-normal">
              ↗
            </b>
          </article>
          <article
            data-aos="fade-up"
            data-aos-delay="150"
            className="bg-dark min-h-[260px] p-[28px] relative"
          >
            <span className="text-[9px] text-green">03</span>
            <h3 className="font-display mt-[90px] max-w-[170px] text-[21px] leading-[1.15]">
              Environnement et climat
            </h3>
            <p className="text-white/[.40] text-[11px] leading-[1.6] max-w-[250px] mt-[10px]">
              Évaluation environnementale, adaptation et transition écologique
            </p>
            <b className="absolute right-[28px] bottom-[28px] text-green font-normal">
              ↗
            </b>
          </article>
          <article
            data-aos="fade-up"
            data-aos-delay="200"
            className="bg-dark min-h-[260px] p-[28px] relative"
          >
            <span className="text-[9px] text-green">04</span>
            <h3 className="font-display mt-[90px] max-w-[170px] text-[21px] leading-[1.15]">
              Gestion de projets
            </h3>
            <p className="text-white/[.40] text-[11px] leading-[1.6] max-w-[250px] mt-[10px]">
              Conception, pilotage et suivi-évaluation de vos projets
            </p>
            <b className="absolute right-[28px] bottom-[28px] text-green font-normal">
              ↗
            </b>
          </article>
          <article
            data-aos="fade-up"
            data-aos-delay="100"
            className="bg-dark min-h-[260px] p-[28px] relative"
          >
            <span className="text-[9px] text-green">05</span>
            <h3 className="font-display mt-[90px] max-w-[170px] text-[21px] leading-[1.15]">
              Formation
            </h3>
            <p className="text-white/[.40] text-[11px] leading-[1.6] max-w-[250px] mt-[10px]">
              Renforcement des capacités des acteurs et des équipes locales
            </p>
            <b className="absolute right-[28px] bottom-[28px] text-green font-normal">
              ↗
            </b>
          </article>
          <article
            data-aos="fade-up"
            data-aos-delay="200"
            className="bg-dark min-h-[260px] p-[28px] relative"
          >
            <span className="text-[9px] text-green">06</span>
            <h3 className="font-display mt-[90px] max-w-[170px] text-[21px] leading-[1.15]">
              Assistance technique
            </h3>
            <p className="text-white/[.40] text-[11px] leading-[1.6] max-w-[250px] mt-[10px]">
              Accompagnement opérationnel et expertise de long terme
            </p>
            <b className="absolute right-[28px] bottom-[28px] text-green font-normal">
              ↗
            </b>
          </article>
          <article
            data-aos="fade-up"
            data-aos-delay="250"
            className="bg-dark min-h-[260px] p-[28px] relative"
          >
            <span className="text-[9px] text-green">07</span>
            <h3 className="font-display mt-[90px] max-w-[170px] text-[21px] leading-[1.15]">
              Recherche et données
            </h3>
            <p className="text-white/[.40] text-[11px] leading-[1.6] max-w-[250px] mt-[10px]">
              Études, enquêtes et analyse de données pour éclairer les
              décisions
            </p>
            <b className="absolute right-[28px] bottom-[28px] text-green font-normal">
              ↗
            </b>
          </article>
          <article
            data-aos="fade-up"
            data-aos-delay="300"
            className="bg-dark min-h-[260px] p-[28px] relative"
          >
            <span className="text-[9px] text-green">08</span>
            <h3 className="font-display mt-[90px] max-w-[170px] text-[21px] leading-[1.15]">
              Foncier et urbanisme
            </h3>
            <p className="text-white/[.40] text-[11px] leading-[1.6] max-w-[250px] mt-[10px]">
              Urbanisme, foncier et sécurisation des droits des populations
            </p>
            <b className="absolute right-[28px] bottom-[28px] text-green font-normal">
              ↗
            </b>
          </article>
        </div>
      </section>

      {/* ========== NOTRE MÉTHODE ========== */}
      <section
        className="relative overflow-hidden py-[125px] max-[650px]:py-[85px] px-[9%] max-[650px]:px-[7%]"
        id="method"
      >
        <BubbleField />
        
        <h2
          data-aos="fade-up"
          className="relative z-[2] font-display text-[clamp(48px,5.5vw,78px)] leading-[.94] tracking-[-4px] mb-[80px] font-semibold"
        >
          PLANIFIER
          <br />
          <span className="text-[#88ae3b]">TRANSFORMER</span> IMPACTER
        </h2>

        <div
          data-aos="fade-up"
          className="relative z-[2] grid grid-cols-[65px_1fr_1fr_30px] max-[650px]:grid-cols-[35px_1fr_25px] gap-[20px] max-[650px]:gap-[10px] items-center py-[28px] border-t border-ink/[.14]"
        >
          <span className="text-[10px] text-[#899598]"></span>
          <h3 className="font-display text-[25px] max-[650px]:text-[18px]">
            Planifier
          </h3>
          <p className="text-[11px] text-[#7b888b] max-[650px]:hidden">
            Diagnostic, stratégie et planification de votre territoire
          </p>
          <b className="text-green2 font-normal">↗</b>
        </div>
        <div
          data-aos="fade-up"
          data-aos-delay="100"
          className="relative z-[2] grid grid-cols-[65px_1fr_1fr_30px] max-[650px]:grid-cols-[35px_1fr_25px] gap-[20px] max-[650px]:gap-[10px] items-center py-[28px] border-t border-ink/[.14]"
        >
          <span className="text-[10px] text-[#899598]"></span>
          <h3 className="font-display text-[25px] max-[650px]:text-[18px]">
            Transformer
          </h3>
          <p className="text-[11px] text-[#7b888b] max-[650px]:hidden">
            Conception et mise en œuvre de solutions concrètes
          </p>
          <b className="text-green2 font-normal">↗</b>
        </div>
        <div
          data-aos="fade-up"
          data-aos-delay="200"
          className="relative z-[2] grid grid-cols-[65px_1fr_1fr_30px] max-[650px]:grid-cols-[35px_1fr_25px] gap-[20px] max-[650px]:gap-[10px] items-center py-[28px] border-t border-b border-ink/[.14]"
        >
          <span className="text-[10px] text-[#899598]"></span>
          <h3 className="font-display text-[25px] max-[650px]:text-[18px]">
            Impacter
          </h3>
          <p className="text-[11px] text-[#7b888b] max-[650px]:hidden">
            Mesure des résultats et capitalisation des impacts
          </p>
          <b className="text-green2 font-normal">↗</b>
        </div>
      </section>

      {/* ========== NOS PARTENAIRES ========== */}
      <section
        className="relative overflow-hidden py-[110px] max-[650px]:py-[80px] px-[9%] max-[650px]:px-[7%] bg-dark"
        id="partners"
      >
       

        <div className="relative z-[2] flex flex-col lg:flex-row lg:items-end lg:justify-between gap-[25px] mb-[60px]">
          <h2
            data-aos="fade-up"
            className="font-display text-[clamp(38px,4.2vw,60px)] leading-[1.02] tracking-[-3px] font-semibold text-white"
          >
            Ils <span className="text-green">nous</span> font confiance
          </h2>
          <p
            data-aos="fade-up"
            data-aos-delay="100"
            className="text-white/[.45] text-[13px] leading-[1.8] max-w-[430px]"
          >
            Institutions publiques, collectivités, ONG et organisations
            internationales qui nous accompagnent au quotidien
          </p>
        </div>

        <div data-aos="fade-up" data-aos-delay="150">
          <PartnersSlider />
        </div>
      </section>

      {/* ========== CHIFFRES CLÉS ========== */}
      <section
        className="relative overflow-hidden py-[110px] max-[650px]:py-[80px] px-[9%] max-[650px]:px-[7%]"
        id="stats"
      >
        <BubbleField />
      

        <div className="relative z-[2] grid grid-cols-2 lg:grid-cols-4 gap-y-[45px] lg:gap-y-0">
          {[
            { to: 150, suffix: "+", label: "Projets réalisés" },
            { to: 2, suffix: "M+", label: "Utilisateurs touchés" },
            { to: 40, suffix: "+", label: "Experts mobilisés" },
            { to: 12, suffix: "", label: "Pays couverts" },
          ].map((s, i) => (
            <div
              key={s.label}
              data-aos="fade-up"
              data-aos-delay={i * 120}
              className="text-center px-[10px]"
            >
              <div className="font-display font-semibold text-[clamp(46px,5.2vw,80px)] leading-none text-green2">
                <Counter to={s.to} suffix={s.suffix} />
              </div>
              <div className="text-[10px] tracking-[2px] uppercase text-ink/40 mt-[16px]">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========== CONTACT / CTA ========== */}
      <section
        className="mx-[4%] py-[80px] max-[650px]:py-[65px] px-[7%] max-[650px]:px-[8%] min-h-[500px] max-[650px]:min-h-[420px] rounded-[34px] bg-[#173d43] text-white relative overflow-hidden contact-glow"
        id="contact"
      >
       
        <h2
          data-aos="fade-up"
          className="relative z-[2] font-display text-[clamp(52px,6vw,86px)] leading-[.93] tracking-[-4px] mb-[45px] font-semibold"
        >
          Construisons ensemble
          <br />
          des territoires <span className="text-green">durables</span>
        </h2>
        <a
          data-aos="fade-up"
          className="relative z-[2] inline-flex items-center gap-[14px] bg-green text-[#183037] py-[13px] px-[19px] rounded-full text-xs font-bold hover:-translate-y-0.5 hover:brightness-110 transition-all"
          href="mailto:contact@teradev.exemple"
        >
          Nous contacter <span>↗</span>
        </a>
      </section>

      {/* ========== FOOTER ========== */}
      <footer className="py-[70px] max-[650px]:py-[50px] px-[9%] max-[650px]:px-[7%] border-t border-ink/[.1]">
        <div className="grid lg:grid-cols-[1.4fr_1fr_1fr] gap-[45px] max-[900px]:grid-cols-2 max-[650px]:grid-cols-1 items-start">
          <div>
            <a
              href="#home"
              className="inline-flex items-center gap-[10px] font-display font-bold text-[23px] text-ink"
            >
              <span className="brand-icon-wrap">
                <i />
                <b />
              </span>
              <span>
                TERA<span className="text-green">DEV</span>
              </span>
            </a>
            <p className="text-muted text-[11px] leading-[1.7] mt-[16px] max-w-[300px]">
              Des solutions innovantes pour des territoires résilients,
              inclusifs et durables.
            </p>
          </div>

          <div>
            <span className="block text-[10px] tracking-[2px] uppercase text-ink/40 font-bold mb-[20px]">
              Navigation
            </span>
            <ul className="space-y-[12px] text-[12px]">
              <li>
                <a
                  className="text-ink/65 hover:text-green transition"
                  href="#cabinet"
                >
                  Le cabinet
                </a>
              </li>
              <li>
                <a
                  className="text-ink/65 hover:text-green transition"
                  href="#expertise"
                >
                  Pôles d'expertise
                </a>
              </li>
              <li>
                <a
                  className="text-ink/65 hover:text-green transition"
                  href="#method"
                >
                  Notre méthode
                </a>
              </li>
              <li>
                <a
                  className="text-ink/65 hover:text-green transition"
                  href="#partners"
                >
                  Nos partenaires
                </a>
              </li>
              <li>
                <a
                  className="text-ink/65 hover:text-green transition"
                  href="#contact"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <span className="block text-[10px] tracking-[2px] uppercase text-ink/40 font-bold mb-[20px]">
              Contact
            </span>
            <ul className="space-y-[12px] text-[12px] text-ink/65">
              <li className="flex items-center gap-[8px]">
                <span className="text-green">✉</span> contact@teradev.exemple
              </li>
              <li className="flex items-center gap-[8px]">
                <span className="text-green">✆</span> +226 65633268
              </li>
              <li className="flex items-center gap-[8px]">
                <span className="text-green">◉</span> Ouagadougou, Burkina Faso
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-[55px] pt-[26px] border-t border-ink/[.1] flex max-[650px]:flex-center max-[650px]:items-start max-[650px]:gap-[10px] justify-between items-center text-[#8a9698] text-[10px]">
          <span>© 2026 TERADEV — Tous droits réservés.</span>
         
        </div>
      </footer>
    </div>
  );
}

export default App;
