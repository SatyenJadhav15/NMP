import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform, animate, AnimatePresence } from "motion/react";
import { useEffect, useRef, useState } from "react";
import {
  Heart,
  Menu,
  X,
  ArrowRight,
  ArrowUpRight,
  Megaphone,
  Network,
  Pill,
  HandHeart,
  ShieldCheck,
  Users,
  HeartPulse,
  Quote,
  Plus,
  Minus,
  MapPin,
  Phone,
  Mail,
  Scale,
  Stethoscope,
  Landmark,
  FileText,
  Download,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Target,
  Eye,
  Sparkles,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  UserPlus,
  MessagesSquare,
  GraduationCap,
  Handshake,
  Trophy,
} from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import VesperBackdrop from "@/components/site/VesperBackdrop";
import nmpLogo from "@/assets/nmp-logo.png.asset.json";
import heroImg from "@/assets/hero.jpg";
import aboutImg from "@/assets/outreach.jpg";
import programHealth from "@/assets/program-health.jpg";
import programCommunity from "@/assets/program-community.jpg";
import programPharmacy from "@/assets/program-pharmacy.jpg";
import storyImg from "@/assets/about.jpg";

export const Route = createFileRoute("/")({
  component: Index,
});

const NAV = [
  { label: "Home", href: "#top" },
  { label: "About", href: "#about" },
  { label: "Programs", href: "#programs" },
  { label: "TAAL Pharmacy", href: "#services" },
  { label: "Impact", href: "#impact" },
  { label: "Resources", href: "#resources" },
  { label: "News", href: "#news" },
  { label: "Volunteer", href: "#volunteer" },
];

const PARTNERS = ["USAID", "APN+", "KHPT", "NACO", "Global Fund", "UNAIDS", "MSACS"];

const SERVICES = [
  { icon: Megaphone, title: "Advocacy", body: "Championing the rights of people living with HIV at district, state and national levels." },
  { icon: HeartPulse, title: "Counselling", body: "Compassionate counselling to help individuals and families face stigma and mental-health challenges." },
  { icon: Pill, title: "TAAL Pharmacy", body: "Affordable ART and essential medicines ensuring uninterrupted, dignified treatment access." },
  { icon: HandHeart, title: "Community Support", body: "Peer-led support groups that build belonging, resilience and shared strength." },
  { icon: ShieldCheck, title: "Health Insurance", body: "Facilitating insurance access so care never becomes a financial burden." },
  { icon: Network, title: "District Networks", body: "Strong taluka and district-level networks reaching every corner of Maharashtra." },
  { icon: Sparkles, title: "Awareness Campaigns", body: "State-wide campaigns that break stigma and spread accurate, life-saving information." },
  { icon: Scale, title: "Legal Assistance", body: "Guidance and legal aid to protect the dignity and rights of our community." },
];

const DISTRICTS = [
  { name: "Pune", top: "58%", left: "34%", people: "42,300", programs: 9, volunteers: 84, camps: 120 },
  { name: "Mumbai", top: "52%", left: "20%", people: "51,900", programs: 11, volunteers: 96, camps: 140 },
  { name: "Nagpur", top: "42%", left: "82%", people: "28,700", programs: 7, volunteers: 61, camps: 88 },
  { name: "Nashik", top: "40%", left: "34%", people: "19,400", programs: 6, volunteers: 47, camps: 64 },
  { name: "Aurangabad", top: "44%", left: "52%", people: "16,800", programs: 6, volunteers: 39, camps: 55 },
  { name: "Kolhapur", top: "82%", left: "34%", people: "12,600", programs: 5, volunteers: 33, camps: 41 },
  { name: "Amravati", top: "34%", left: "68%", people: "10,900", programs: 4, volunteers: 28, camps: 37 },
];

const STATS = [
  { label: "Lives Supported", value: 198247, suffix: "+" },
  { label: "Programs", value: 15, suffix: "+" },
  { label: "Districts", value: 34, suffix: "" },
  { label: "Volunteers", value: 400, suffix: "+" },
  { label: "Partner Organizations", value: 50, suffix: "+" },
  { label: "Years of Service", value: 25, suffix: "+" },
];

const STORIES = [
  { name: "Sunita More", district: "Pune", story: "After my diagnosis I felt invisible. NMP+ counsellors helped me access treatment and rebuild my confidence. Today I lead a peer support group of 40 women.", img: storyImg },
  { name: "Rahul Kamble", district: "Nagpur", story: "The TAAL Pharmacy meant I never missed a single dose. NMP+ didn't just give me medicine — they gave me back a future for my family.", img: programHealth },
  { name: "Farida Shaikh", district: "Mumbai", story: "Legal aid from NMP+ protected my job when I faced discrimination. Their advocacy reminded me my dignity is non-negotiable.", img: programCommunity },
];

const TIMELINE = [
  { year: "1999", title: "Organization Founded", body: "NMP+ is born from a grassroots movement of people living with HIV in Maharashtra." },
  { year: "2005", title: "Statewide Expansion", body: "District networks established across Maharashtra to widen outreach and peer support." },
  { year: "2012", title: "TAAL Pharmacy", body: "Launch of TAAL+ Pharmacy for affordable, uninterrupted access to ART medicines." },
  { year: "2018", title: "Statewide Programs", body: "Counselling, insurance and advocacy scaled to reach every district." },
  { year: "2025", title: "200k+ Lives Supported", body: "A quarter-century of dignity, care and empowerment for our community." },
];

const PROGRAMS = [
  { title: "Healthcare", body: "Coordinated clinical care, health camps and treatment linkages.", img: programHealth, icon: Stethoscope },
  { title: "Counselling", body: "Emotional and psychosocial support for individuals and families.", img: aboutImg, icon: HeartPulse },
  { title: "Advocacy", body: "Policy advocacy protecting the rights of people living with HIV.", img: programCommunity, icon: Megaphone },
  { title: "Insurance", body: "Facilitating health insurance to remove financial barriers to care.", img: heroImg, icon: ShieldCheck },
  { title: "Medicine Access", body: "TAAL+ Pharmacy delivering affordable, reliable medication.", img: programPharmacy, icon: Pill },
  { title: "Community Leadership", body: "Building peer leaders who carry the movement forward.", img: storyImg, icon: Users },
];

const REPORTS = [
  { year: "2024", cover: programCommunity },
  { year: "2023", cover: aboutImg },
  { year: "2022", cover: programHealth },
];

const NEWS = [
  { category: "Advocacy", date: "Jun 12, 2025", title: "NMP+ addresses state assembly on HIV rights policy", img: programCommunity },
  { category: "Healthcare", date: "May 28, 2025", title: "New health camp reaches 3,000 in rural Vidarbha", img: programHealth },
  { category: "Community", date: "Apr 09, 2025", title: "Youth volunteer drive expands to eight new districts", img: aboutImg },
];

const TESTIMONIALS = [
  { name: "Dr. Anjali Deshpande", role: "Physician, Pune", body: "NMP+ bridges the gap between clinics and communities better than any organization I have partnered with." },
  { name: "Kevin Martin", role: "Volunteer", body: "The community support changed how I face each day. I no longer feel alone — I feel part of a family that rises together." },
  { name: "Meena Patil", role: "Beneficiary", body: "From medicines to mental health, they walked with me every step. NMP+ gave me back my dignity and my voice." },
  { name: "Global Fund", role: "Partner Organization", body: "A trusted, transparent partner delivering measurable impact across Maharashtra year after year." },
];

const JOURNEY = [
  { icon: UserPlus, title: "Apply", body: "Share your interest and skills." },
  { icon: MessagesSquare, title: "Interview", body: "A warm conversation with our team." },
  { icon: GraduationCap, title: "Training", body: "Learn our approach and values." },
  { icon: Handshake, title: "Community Work", body: "Support real people, on the ground." },
  { icon: Trophy, title: "Create Impact", body: "See lives change because of you." },
];

const DONATIONS = ["₹500", "₹1,000", "₹2,500", "₹5,000", "Custom"];

const FAQS = [
  { q: "How can I become a volunteer?", a: "Apply through our Volunteer section. You'll go through a short interview and training before joining outreach, awareness and community work across Maharashtra." },
  { q: "How is my donation used?", a: "Contributions directly fund treatment access, counselling, TAAL+ Pharmacy medicines and district-level outreach. We publish annual reports for full transparency." },
  { q: "What programs does NMP+ run?", a: "Healthcare, counselling, advocacy, insurance facilitation, medicine access via TAAL+ Pharmacy, and community leadership development." },
  { q: "How do I become a member?", a: "People living with HIV across Maharashtra can join their district network. Reach out through the Contact page and our team will guide you." },
  { q: "What is TAAL Pharmacy?", a: "TAAL+ Pharmacy is our network providing affordable ART and essential medicines, ensuring uninterrupted, dignified treatment access." },
];

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [val, setVal] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          const controls = animate(0, to, {
            duration: 1.8,
            ease: "easeOut",
            onUpdate: (v) => setVal(Math.floor(v)),
          });
          obs.disconnect();
          return () => controls.stop();
        }
      },
      { threshold: 0.4 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [to]);
  return (
    <span ref={ref}>
      {val.toLocaleString()}
      {suffix}
    </span>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-sm font-extrabold uppercase tracking-[0.2em] text-accent">
      {children}
    </span>
  );
}

function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-card/80 backdrop-blur-xl border-b border-border shadow-md"
          : "bg-card border-b border-border/60"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-3.5 sm:px-8">
        <a href="#top" className="flex items-center gap-3">
          <img src={nmpLogo.url} alt="NMP+ logo" className="h-11 w-11 object-contain" />
          <span className="font-display text-lg font-extrabold tracking-tight text-foreground sm:text-xl">
            NMP<span className="text-accent">+</span>
          </span>
        </a>
        <div className="hidden items-center gap-6 lg:flex">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="text-sm font-semibold text-muted-foreground transition-colors hover:text-primary"
            >
              {n.label}
            </a>
          ))}
          <Link
            to="/contact"
            className="text-sm font-semibold text-muted-foreground transition-colors hover:text-primary"
          >
            Contact
          </Link>
        </div>
        <div className="hidden lg:block">
          <a
            href="#donate"
            className="group inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-bold text-accent-foreground shadow-lg shadow-accent/25 transition-transform hover:scale-105"
          >
            <Heart className="h-4 w-4" fill="currentColor" />
            Donate Now
          </a>
        </div>
        <button
          className="lg:hidden text-foreground"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {open ? <X /> : <Menu />}
        </button>
      </nav>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-border bg-card/95 backdrop-blur-xl lg:hidden"
          >
            <div className="flex flex-col gap-1 px-5 py-4">
              {NAV.map((n) => (
                <a
                  key={n.href}
                  href={n.href}
                  onClick={() => setOpen(false)}
                  className="py-2 font-semibold text-foreground"
                >
                  {n.label}
                </a>
              ))}
              <Link
                to="/contact"
                onClick={() => setOpen(false)}
                className="py-2 font-semibold text-foreground"
              >
                Contact
              </Link>
              <a
                href="#donate"
                onClick={() => setOpen(false)}
                className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-accent px-5 py-3 font-bold text-accent-foreground"
              >
                <Heart className="h-4 w-4" fill="currentColor" /> Donate Now
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const fade = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  const metrics = [
    { value: 198247, suffix: "+", label: "Lives Supported" },
    { value: 34, suffix: "", label: "Districts Covered" },
    { value: 25, suffix: "+", label: "Years" },
    { value: 400, suffix: "+", label: "Community Volunteers" },
  ];

  return (
    <section ref={ref} id="top" className="relative min-h-[100svh] overflow-hidden bg-[#0a0a10] text-white">
      {/* Vesper-style volumetric evening-light backdrop */}
      <div className="absolute inset-0">
        <VesperBackdrop quality="high" />
      </div>
      {/* subtle darkening for text legibility */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background to-transparent" />

      <div className="relative mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-center px-5 pt-28 pb-14 sm:px-8">
        <motion.div style={{ y, opacity: fade }} className="max-w-3xl">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-wider text-white backdrop-blur"
          >
            <Sparkles className="h-4 w-4 text-accent" /> 25+ Years of Community Impact
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05 }}
            className="mt-6 font-display text-5xl font-extrabold leading-[1.02] tracking-tight text-white text-balance sm:text-6xl lg:text-7xl"
          >
            Empowering People <span className="text-accent">Living With HIV</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.14 }}
            className="mt-6 max-w-xl text-lg leading-relaxed text-white/75"
          >
            NMP+ Maharashtra works towards dignity, healthcare, advocacy and
            empowerment for people living with HIV and their families across
            Maharashtra.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.22 }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <a
              href="#donate"
              className="group inline-flex items-center gap-2 rounded-full bg-accent px-7 py-4 text-base font-bold text-accent-foreground shadow-xl transition-transform hover:scale-105"
            >
              <Heart className="h-5 w-5" fill="currentColor" /> Donate Now
            </a>
            <a
              href="#volunteer"
              className="inline-flex items-center gap-2 rounded-full border-2 border-white/80 px-7 py-4 text-base font-bold text-white transition-colors hover:bg-white hover:text-[#0a0a10]"
            >
              Become a Volunteer
              <ArrowRight className="h-5 w-5" />
            </a>
          </motion.div>

          {/* trust metrics */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-12 grid max-w-2xl grid-cols-2 gap-4 sm:grid-cols-4"
          >
            {metrics.map((m) => (
              <div key={m.label} className="rounded-2xl border border-white/15 bg-white/10 px-4 py-4 text-center backdrop-blur">
                <p className="font-display text-2xl font-extrabold text-accent sm:text-3xl">
                  <Counter to={m.value} suffix={m.suffix} />
                </p>
                <p className="mt-1 text-xs font-medium text-white/70">
                  {m.label}
                </p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function Partners() {
  const row = [...PARTNERS, ...PARTNERS];
  return (
    <section className="border-y border-border bg-card py-14">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <p className="text-center text-sm font-extrabold uppercase tracking-[0.2em] text-muted-foreground">
          Trusted by Leading Organizations
        </p>
        <div className="group relative mt-8 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <div className="flex w-max animate-marquee items-center gap-16 group-hover:[animation-play-state:paused]">
            {row.map((p, i) => (
              <span
                key={`${p}-${i}`}
                className="whitespace-nowrap font-display text-2xl font-extrabold tracking-tight text-muted-foreground/50 grayscale transition-all duration-300 hover:text-primary hover:grayscale-0"
              >
                {p}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function About() {
  const pillars = [
    { icon: Target, title: "Mission", body: "Improve the quality of life for people living with HIV and their families through active participation, care and advocacy." },
    { icon: Eye, title: "Vision", body: "A Maharashtra where every person living with HIV lives with dignity, free of stigma and with equal access to care." },
    { icon: Heart, title: "Core Values", body: "Compassion, community leadership, transparency and an unwavering belief in human dignity." },
  ];
  const cards = [
    { icon: Megaphone, title: "Advocacy" },
    { icon: Stethoscope, title: "Healthcare" },
    { icon: Users, title: "Community Empowerment" },
  ];
  return (
    <section id="about" className="mx-auto max-w-7xl px-5 py-24 sm:px-8">
      <div className="grid items-center gap-14 lg:grid-cols-2">
        <Reveal>
          <div className="relative">
            <div className="overflow-hidden rounded-[2rem] border border-border shadow-xl">
              <img
                src={aboutImg}
                alt="An NMP+ outreach worker in conversation with a family at a community health centre"
                loading="lazy"
                width={1200}
                height={1408}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-4 rounded-2xl border border-border bg-card p-5 shadow-xl sm:-right-6">
              <p className="font-display text-3xl font-extrabold text-primary">25+</p>
              <p className="text-xs font-semibold text-muted-foreground">Years of service</p>
            </div>
          </div>
        </Reveal>

        <div>
          <Reveal>
            <SectionLabel>— About NMP+</SectionLabel>
            <h2 className="mt-4 font-display text-4xl font-extrabold leading-tight text-primary sm:text-5xl">
              A community-led movement for{" "}
              <span className="text-accent">dignity & care</span>
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
              The Network of Maharashtra People Living with HIV is a grassroots
              organisation building healthcare, advocacy and community strength so
              that no one faces HIV alone.
            </p>
          </Reveal>

          <div className="mt-8 space-y-4">
            {pillars.map((c, i) => (
              <Reveal key={c.title} delay={i * 0.1}>
                <div className="group flex gap-4 rounded-2xl border border-border bg-card p-5 transition-all hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <c.icon className="h-6 w-6" />
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-bold text-foreground">{c.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{c.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.1}>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              {cards.map((c) => (
                <span
                  key={c.title}
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-4 py-2 text-sm font-semibold text-foreground"
                >
                  <c.icon className="h-4 w-4 text-accent" /> {c.title}
                </span>
              ))}
            </div>
            <a
              href="#programs"
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-bold text-primary-foreground transition-transform hover:scale-105"
            >
              Learn More <ArrowRight className="h-4 w-4" />
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section id="services" className="bg-secondary/40 py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <SectionLabel>— What We Do</SectionLabel>
          <h2 className="mt-4 font-display text-4xl font-extrabold text-primary sm:text-5xl">
            Comprehensive support for <span className="text-accent">every life</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            From treatment access to legal aid, our services wrap around every
            person and family we serve.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((s, i) => (
            <Reveal key={s.title} delay={(i % 4) * 0.08}>
              <div className="group h-full rounded-2xl border border-border bg-card p-7 transition-all hover:-translate-y-2 hover:shadow-xl hover:shadow-primary/5">
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl border border-primary/20 bg-primary/5 text-primary transition-all group-hover:bg-primary group-hover:text-primary-foreground">
                  <s.icon className="h-7 w-7" />
                </span>
                <h3 className="mt-5 font-display text-lg font-bold text-foreground">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ImpactMap() {
  const [active, setActive] = useState<(typeof DISTRICTS)[number] | null>(DISTRICTS[0]);
  return (
    <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8">
      <Reveal className="mx-auto max-w-2xl text-center">
        <SectionLabel>— Where We Work</SectionLabel>
        <h2 className="mt-4 font-display text-4xl font-extrabold text-primary sm:text-5xl">
          Our impact across <span className="text-accent">Maharashtra</span>
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          Hover a district to explore the reach of our programs on the ground.
        </p>
      </Reveal>

      <div className="mt-14 grid gap-8 lg:grid-cols-[1.4fr_1fr]">
        <Reveal>
          <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] border border-border bg-secondary/40 bg-grid">
            <div className="pointer-events-none absolute inset-0 bg-hero-mesh opacity-60" />
            {DISTRICTS.map((d) => {
              const isActive = active?.name === d.name;
              return (
                <button
                  key={d.name}
                  style={{ top: d.top, left: d.left }}
                  onMouseEnter={() => setActive(d)}
                  onFocus={() => setActive(d)}
                  onClick={() => setActive(d)}
                  aria-label={`${d.name} district`}
                  className="absolute -translate-x-1/2 -translate-y-1/2"
                >
                  <span className="relative flex h-4 w-4 items-center justify-center">
                    <span
                      className={`absolute inline-flex h-4 w-4 rounded-full ${isActive ? "bg-accent" : "bg-primary"} animate-pin-pulse`}
                    />
                    <span
                      className={`relative inline-flex h-4 w-4 rounded-full border-2 border-card shadow ${isActive ? "bg-accent scale-125" : "bg-primary"} transition-transform`}
                    />
                  </span>
                  <span
                    className={`mt-1 block whitespace-nowrap text-xs font-bold ${isActive ? "text-accent" : "text-primary/70"}`}
                  >
                    {d.name}
                  </span>
                </button>
              );
            })}
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <AnimatePresence mode="wait">
            <motion.div
              key={active?.name}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35 }}
              className="flex h-full flex-col justify-center rounded-[2rem] border border-border bg-card p-8 shadow-xl"
            >
              <span className="inline-flex w-fit items-center gap-2 rounded-full bg-accent/15 px-4 py-1.5 text-sm font-bold text-accent-foreground">
                <MapPin className="h-4 w-4" /> {active?.name} District
              </span>
              <div className="mt-6 grid grid-cols-2 gap-5">
                {[
                  { label: "People helped", value: active?.people },
                  { label: "Programs", value: active?.programs },
                  { label: "Volunteers", value: active?.volunteers },
                  { label: "Health camps", value: active?.camps },
                ].map((s) => (
                  <div key={s.label} className="rounded-2xl border border-border bg-secondary/40 p-5">
                    <p className="font-display text-3xl font-extrabold text-primary">{s.value}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{s.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </Reveal>
      </div>
    </section>
  );
}

function ImpactStats() {
  return (
    <section
      id="impact"
      className="relative overflow-hidden bg-gradient-to-br from-primary via-primary to-[oklch(0.24_0.09_275)] py-24 text-primary-foreground"
    >
      <div className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full bg-accent/30 blur-3xl animate-float-slow" />
      <div className="pointer-events-none absolute -bottom-24 right-0 h-80 w-80 rounded-full bg-white/10 blur-3xl animate-float-slower" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <SectionLabel>— Our Impact</SectionLabel>
          <h2 className="mt-4 font-display text-4xl font-extrabold sm:text-5xl">
            A quarter-century of measurable change
          </h2>
        </Reveal>
        <div className="mt-14 grid grid-cols-2 gap-6 md:grid-cols-3">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={(i % 3) * 0.08}>
              <div className="glass-card rounded-2xl p-8 text-center transition-transform hover:-translate-y-1">
                <p className="font-display text-4xl font-extrabold text-accent sm:text-5xl">
                  <Counter to={s.value} suffix={s.suffix} />
                </p>
                <p className="mt-2 text-sm font-medium text-primary-foreground/80">{s.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Stories() {
  const [i, setI] = useState(0);
  const next = () => setI((v) => (v + 1) % STORIES.length);
  const prev = () => setI((v) => (v - 1 + STORIES.length) % STORIES.length);
  const s = STORIES[i];
  return (
    <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8">
      <Reveal className="mx-auto max-w-2xl text-center">
        <SectionLabel>— Success Stories</SectionLabel>
        <h2 className="mt-4 font-display text-4xl font-extrabold text-primary sm:text-5xl">
          Lives changed, hope restored
        </h2>
      </Reveal>

      <div className="relative mt-14 overflow-hidden rounded-[2.5rem] border border-border bg-card shadow-xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={i}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="grid md:grid-cols-2"
          >
            <img
              src={s.img}
              alt={`${s.name}, a beneficiary of NMP+ from ${s.district}`}
              loading="lazy"
              width={1200}
              height={900}
              className="h-64 w-full object-cover md:h-full"
            />
            <div className="flex flex-col justify-center p-8 sm:p-12">
              <Quote className="h-10 w-10 text-accent/60" fill="currentColor" />
              <p className="mt-5 text-xl leading-relaxed text-foreground">{s.story}</p>
              <div className="mt-8">
                <p className="font-display text-lg font-bold text-primary">{s.name}</p>
                <p className="text-sm text-muted-foreground">{s.district}, Maharashtra</p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-8 flex items-center justify-center gap-4">
        <button
          onClick={prev}
          aria-label="Previous story"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <div className="flex gap-2">
          {STORIES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setI(idx)}
              aria-label={`Go to story ${idx + 1}`}
              className={`h-2.5 rounded-full transition-all ${idx === i ? "w-8 bg-accent" : "w-2.5 bg-border"}`}
            />
          ))}
        </div>
        <button
          onClick={next}
          aria-label="Next story"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </section>
  );
}

function Timeline() {
  return (
    <section className="bg-secondary/40 py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <SectionLabel>— Our Journey</SectionLabel>
          <h2 className="mt-4 font-display text-4xl font-extrabold text-primary sm:text-5xl">
            25 years of rising together
          </h2>
        </Reveal>

        <div className="mt-16 flex snap-x gap-6 overflow-x-auto pb-6 lg:grid lg:grid-cols-5 lg:overflow-visible">
          {TIMELINE.map((t, i) => (
            <Reveal key={t.year} delay={i * 0.08}>
              <div className="relative min-w-[240px] snap-start lg:min-w-0">
                <div className="flex items-center gap-3">
                  <span className="flex h-4 w-4 items-center justify-center rounded-full bg-accent ring-4 ring-accent/20" />
                  <span className="h-0.5 flex-1 bg-border" />
                </div>
                <div className="mt-5 rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg">
                  <p className="font-display text-3xl font-extrabold text-accent">{t.year}</p>
                  <h3 className="mt-2 font-display text-lg font-bold text-foreground">{t.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t.body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Programs() {
  return (
    <section id="programs" className="mx-auto max-w-7xl px-5 py-24 sm:px-8">
      <Reveal className="mx-auto max-w-2xl text-center">
        <SectionLabel>— Our Programs</SectionLabel>
        <h2 className="mt-4 font-display text-4xl font-extrabold text-primary sm:text-5xl">
          Programs built around <span className="text-accent">people</span>
        </h2>
      </Reveal>

      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {PROGRAMS.map((p, i) => (
          <Reveal key={p.title} delay={(i % 3) * 0.08}>
            <div className="group h-full overflow-hidden rounded-[1.5rem] border border-border bg-card shadow-sm transition-all hover:-translate-y-2 hover:shadow-xl">
              <div className="relative h-52 overflow-hidden">
                <img
                  src={p.img}
                  alt={`NMP+ ${p.title} program`}
                  loading="lazy"
                  width={1200}
                  height={900}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/70 to-transparent" />
                <span className="absolute left-4 top-4 flex h-11 w-11 items-center justify-center rounded-xl bg-card/90 text-primary shadow">
                  <p.icon className="h-5 w-5" />
                </span>
              </div>
              <div className="p-6">
                <h3 className="font-display text-xl font-bold text-foreground">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Reports() {
  return (
    <section id="resources" className="bg-secondary/40 py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <SectionLabel>— Resources</SectionLabel>
          <h2 className="mt-4 font-display text-4xl font-extrabold text-primary sm:text-5xl">
            Annual reports & transparency
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            We publish our impact and finances openly, every single year.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {REPORTS.map((r, i) => (
            <Reveal key={r.year} delay={i * 0.08}>
              <div className="group overflow-hidden rounded-[1.5rem] border border-border bg-card shadow-sm transition-all hover:-translate-y-2 hover:shadow-xl">
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={r.cover}
                    alt={`NMP+ Annual Report ${r.year} cover`}
                    loading="lazy"
                    width={1200}
                    height={900}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute right-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-accent px-3 py-1 text-xs font-bold text-accent-foreground shadow">
                    <FileText className="h-3.5 w-3.5" /> PDF
                  </span>
                </div>
                <div className="p-6">
                  <p className="font-display text-2xl font-extrabold text-primary">
                    Annual Report {r.year}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-3">
                    <a
                      href="#resources"
                      className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground transition-transform hover:scale-105"
                    >
                      <Download className="h-4 w-4" /> Download
                    </a>
                    <a
                      href="#resources"
                      className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-bold text-foreground transition-colors hover:bg-secondary"
                    >
                      View Online
                    </a>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function News() {
  return (
    <section id="news" className="mx-auto max-w-7xl px-5 py-24 sm:px-8">
      <Reveal className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <SectionLabel>— Latest News</SectionLabel>
          <h2 className="mt-4 font-display text-4xl font-extrabold text-primary sm:text-5xl">
            Stories from the field
          </h2>
        </div>
        <a
          href="#news"
          className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-bold text-foreground transition-colors hover:bg-secondary"
        >
          View all <ArrowUpRight className="h-4 w-4" />
        </a>
      </Reveal>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {NEWS.map((n, i) => (
          <Reveal key={n.title} delay={i * 0.08}>
            <article className="group h-full overflow-hidden rounded-[1.5rem] border border-border bg-card shadow-sm transition-all hover:-translate-y-2 hover:shadow-xl">
              <div className="h-48 overflow-hidden">
                <img
                  src={n.img}
                  alt={n.title}
                  loading="lazy"
                  width={1200}
                  height={900}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 text-xs font-semibold">
                  <span className="rounded-full bg-accent/15 px-3 py-1 text-accent-foreground">{n.category}</span>
                  <span className="inline-flex items-center gap-1 text-muted-foreground">
                    <CalendarDays className="h-3.5 w-3.5" /> {n.date}
                  </span>
                </div>
                <h3 className="mt-4 font-display text-lg font-bold leading-snug text-foreground">{n.title}</h3>
                <a
                  href="#news"
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-primary transition-colors hover:text-accent"
                >
                  Read More <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section className="bg-secondary/40 py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <SectionLabel>— Testimonials</SectionLabel>
          <h2 className="mt-4 font-display text-4xl font-extrabold text-primary sm:text-5xl">
            Voices from our community
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.name} delay={(i % 4) * 0.08}>
              <div className="flex h-full flex-col rounded-2xl border border-border bg-card p-7 shadow-sm transition-all hover:-translate-y-2 hover:shadow-xl">
                <Quote className="h-8 w-8 text-accent/60" fill="currentColor" />
                <p className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">{t.body}</p>
                <div className="mt-6 flex items-center gap-3 border-t border-border pt-5">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent font-display text-base font-bold text-primary-foreground">
                    {t.name.charAt(0)}
                  </span>
                  <div>
                    <p className="font-display text-sm font-bold text-foreground">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Volunteer() {
  return (
    <section id="volunteer" className="mx-auto max-w-7xl px-5 py-24 sm:px-8">
      <Reveal className="mx-auto max-w-2xl text-center">
        <SectionLabel>— Get Involved</SectionLabel>
        <h2 className="mt-4 font-display text-4xl font-extrabold text-primary sm:text-5xl">
          Your volunteer journey
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          Five simple steps from signing up to creating real impact.
        </p>
      </Reveal>

      <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
        {JOURNEY.map((j, i) => (
          <Reveal key={j.title} delay={i * 0.08}>
            <div className="group relative h-full rounded-2xl border border-border bg-card p-6 text-center transition-all hover:-translate-y-2 hover:shadow-xl">
              <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <j.icon className="h-7 w-7" />
              </span>
              <span className="absolute right-4 top-4 font-display text-2xl font-extrabold text-border">
                {i + 1}
              </span>
              <h3 className="mt-5 font-display text-lg font-bold text-foreground">{j.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{j.body}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.1} className="mt-10 text-center">
        <Link
          to="/contact"
          className="inline-flex items-center gap-2 rounded-full bg-accent px-7 py-4 font-bold text-accent-foreground shadow-lg transition-transform hover:scale-105"
        >
          Start Your Journey <ArrowRight className="h-5 w-5" />
        </Link>
      </Reveal>
    </section>
  );
}

function Donate() {
  const [selected, setSelected] = useState(1);
  return (
    <section id="donate" className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
      <Reveal>
        <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-primary to-[oklch(0.24_0.09_275)] px-6 py-14 shadow-2xl sm:px-14">
          <div className="pointer-events-none absolute -left-10 -top-10 h-56 w-56 rounded-full bg-accent/25 blur-3xl animate-float-slow" />
          <div className="pointer-events-none absolute -bottom-16 -right-10 h-64 w-64 rounded-full bg-white/10 blur-3xl animate-float-slower" />
          <div className="relative grid items-center gap-10 lg:grid-cols-2">
            <div className="text-primary-foreground">
              <SectionLabel>— Support Us</SectionLabel>
              <h2 className="mt-4 font-display text-4xl font-extrabold leading-tight sm:text-5xl">
                Every contribution creates hope
              </h2>
              <p className="mt-5 max-w-md text-lg text-primary-foreground/85">
                Your gift funds medicines, counselling and outreach. We publish
                exactly how every rupee is used.
              </p>
              <ul className="mt-8 space-y-3 text-sm">
                {[
                  "₹500 provides a month of essential ART medicines",
                  "₹2,500 supports counselling for a family in crisis",
                  "₹5,000 powers a rural health awareness camp",
                ].map((t) => (
                  <li key={t} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground">
                      <Heart className="h-3.5 w-3.5" fill="currentColor" />
                    </span>
                    <span className="text-primary-foreground/90">{t}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-[2rem] border border-white/15 bg-card p-7 shadow-xl sm:p-9">
              <p className="font-display text-lg font-bold text-foreground">Choose an amount</p>
              <div className="mt-5 grid grid-cols-3 gap-3">
                {DONATIONS.map((d, i) => (
                  <button
                    key={d}
                    onClick={() => setSelected(i)}
                    className={`rounded-xl border-2 px-3 py-4 text-center font-display text-lg font-bold transition-all ${
                      selected === i
                        ? "border-accent bg-accent/10 text-accent-foreground"
                        : "border-border bg-card text-foreground hover:border-primary/40"
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
              <a
                href="#donate"
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-7 py-4 text-base font-bold text-accent-foreground shadow-lg transition-transform hover:scale-[1.02]"
              >
                <Heart className="h-5 w-5" fill="currentColor" /> Donate {DONATIONS[selected]}
              </a>
              <p className="mt-4 text-center text-xs text-muted-foreground">
                Secure payment · 80G tax benefits · 100% transparency
              </p>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="bg-secondary/40 py-24">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[0.85fr_1.15fr]">
        <Reveal>
          <SectionLabel>— FAQs</SectionLabel>
          <h2 className="mt-4 font-display text-4xl font-extrabold text-primary sm:text-5xl">
            Frequently asked questions
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Answers on volunteering, donations, programs, membership and TAAL
            Pharmacy.
          </p>
          <Link
            to="/contact"
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-bold text-primary-foreground transition-transform hover:scale-105"
          >
            Contact Us <ArrowRight className="h-4 w-4" />
          </Link>
        </Reveal>

        <div className="space-y-4">
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={f.q} delay={i * 0.06}>
                <div className="overflow-hidden rounded-2xl border border-border bg-card">
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                    aria-expanded={isOpen}
                  >
                    <span className="font-display text-lg font-bold text-foreground">{f.q}</span>
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                      {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                    </span>
                  </button>
                  <motion.div
                    initial={false}
                    animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="px-6 pb-6 leading-relaxed text-muted-foreground">{f.a}</p>
                  </motion.div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const details = [
    { icon: MapPin, label: "Visit us", value: "401–404 Ganga Prestige Arcade, Laxmi Road, Nana Peth, Pune - 411002" },
    { icon: Phone, label: "Call us", value: "+91 20 - 2633 6087", href: "tel:+912026336087" },
    { icon: Mail, label: "Email us", value: "info@nmpplus.net", href: "mailto:info@nmpplus.net" },
  ];
  return (
    <section id="contact" className="mx-auto max-w-7xl px-5 py-24 sm:px-8">
      <Reveal className="mx-auto max-w-2xl text-center">
        <SectionLabel>— Contact</SectionLabel>
        <h2 className="mt-4 font-display text-4xl font-extrabold text-primary sm:text-5xl">
          We're here to help
        </h2>
      </Reveal>

      <div className="mt-14 grid gap-8 lg:grid-cols-2">
        <Reveal>
          <div className="space-y-4">
            {details.map((d) => (
              <div key={d.label} className="flex items-start gap-4 rounded-2xl border border-border bg-card p-5 shadow-sm">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <d.icon className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{d.label}</p>
                  {d.href ? (
                    <a href={d.href} className="mt-1 block font-semibold text-foreground hover:text-primary">{d.value}</a>
                  ) : (
                    <p className="mt-1 font-semibold text-foreground">{d.value}</p>
                  )}
                </div>
              </div>
            ))}
            <div className="flex items-center gap-3 pt-2">
              {[Facebook, Twitter, Instagram, Linkedin, Youtube].map((Icon, idx) => (
                <a
                  key={idx}
                  href="#top"
                  aria-label="NMP+ social media"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-accent px-7 py-4 font-bold text-accent-foreground shadow-lg transition-transform hover:scale-105"
            >
              Send us a message <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="overflow-hidden rounded-[2rem] border border-border shadow-xl">
            <iframe
              title="NMP+ office location on the map"
              src="https://www.google.com/maps?q=Nana+Peth,+Pune,+Maharashtra+411002&output=embed"
              className="h-full min-h-[24rem] w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Footer() {
  const cols = [
    { title: "Organization", links: ["About", "Programs", "Volunteer", "Donate"] },
    { title: "Resources", links: ["Annual Reports", "Careers", "News", "TAAL Pharmacy"] },
    { title: "Policies", links: ["Privacy Policy", "Accessibility Statement", "Transparency", "Contact"] },
  ];
  return (
    <footer id="footer" className="bg-[oklch(0.2_0.08_270)] text-background">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent text-accent-foreground">
                <Heart className="h-5 w-5" fill="currentColor" />
              </span>
              <span className="font-display text-xl font-extrabold text-white">
                NMP<span className="text-accent">+</span>
              </span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/60">
              Network of Maharashtra People Living with HIV — advocacy, care and
              community empowerment across the state for over 25 years.
            </p>
            <div className="mt-6 flex items-center gap-3">
              {[Facebook, Twitter, Instagram, Linkedin, Youtube].map((Icon, idx) => (
                <a
                  key={idx}
                  href="#top"
                  aria-label="NMP+ social media"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-accent hover:text-accent-foreground"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {cols.map((c) => (
            <div key={c.title}>
              <h3 className="font-display text-lg font-bold text-white">{c.title}</h3>
              <ul className="mt-4 space-y-3 text-sm text-white/60">
                {c.links.map((l) => (
                  <li key={l}>
                    <a href="#top" className="transition-colors hover:text-accent">{l}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-[1.5rem] border border-white/10 bg-white/5 p-7 sm:flex sm:items-center sm:justify-between">
          <div>
            <h3 className="font-display text-lg font-bold text-white">Join our newsletter</h3>
            <p className="mt-1 text-sm text-white/60">Impact stories and updates, a few times a year.</p>
          </div>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="mt-4 flex max-w-md gap-2 sm:mt-0"
          >
            <label htmlFor="newsletter" className="sr-only">Email address</label>
            <input
              id="newsletter"
              type="email"
              required
              placeholder="you@example.com"
              className="w-full rounded-full border border-white/20 bg-white/10 px-5 py-3 text-sm text-white placeholder:text-white/40 outline-none focus:border-accent"
            />
            <button className="shrink-0 rounded-full bg-accent px-6 py-3 text-sm font-bold text-accent-foreground transition-transform hover:scale-105">
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-5 py-6 text-center text-xs text-white/50 sm:flex-row sm:px-8 sm:text-left">
          <p>© 2025 NMP+ | Network of Maharashtra People Living with HIV. All rights reserved.</p>
          <p>Empowering lives with dignity across Maharashtra.</p>
        </div>
      </div>
    </footer>
  );
}

function Index() {
  return (
    <main className="bg-background text-foreground">
      <Navbar />
      <Hero />
      <Partners />
      <About />
      <Services />
      <ImpactMap />
      <ImpactStats />
      <Stories />
      <Timeline />
      <Programs />
      <Reports />
      <News />
      <Testimonials />
      <Volunteer />
      <Donate />
      <Faq />
      <Contact />
      <Footer />
    </main>
  );
}
