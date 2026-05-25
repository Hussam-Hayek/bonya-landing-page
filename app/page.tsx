'use client';

import Image from 'next/image';
import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import {
  ChevronRight,
  Mail,
  Phone,
  MapPin,
  CheckCircle2,
  Package,
  Truck,
  ShieldCheck,
  Headphones,
  Users,
  Building2,
  ArrowRight,
  Globe,
  ChevronDown,
  Play,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

// ─── Translations ─────────────────────────────────────────────────────────────
const translations = {
  en: {
    topBar: { phone: '920011074', email: 'info@bonya.com' },
    nav: { home: 'Home', about: 'About Us', services: 'Services', portal: 'Portal', contact: 'Contact Us', cta: 'Request a Quote' },
    hero: {
      badge: 'BONYA · SAUDI ARABIA · SINCE 2019',
      h1: 'Sustainable Solutions',
      h2: 'For a Stronger Future',
      sub: 'We provide our clients within the Kingdom with durable building materials and personalized services, all while harnessing our global expertise to support even the most intricate projects with top-tier construction products.',
      cta1: 'Request a Quote', cta2: 'Watch Our Story',
      scroll: 'SCROLL',
      global: 'WE THINK GLOBAL. WE ACT LOCAL.',
    },
    stats: [
      { value: '8', suffix: '+', label: 'SOURCES' },
      { value: '300', suffix: '+', label: 'DELIVERIES' },
      { value: '100', suffix: '+', label: 'CUSTOMERS' },
      { value: '150', suffix: '+', label: 'PROJECTS' },
      { value: '5', suffix: '', label: 'REGIONS' },
    ],
    about: {
      tag: 'WHO WE ARE',
      title: 'A leading Saudi construction materials supplier — since 2019.',
      p1: 'BONYA is a leading Saudi-based construction materials supplier and logistics provider. We have been in business since 2019 with a strong track record of providing our clients with high-quality products and excellent service.',
      p2: 'Equipped with a team of experienced engineers, technical experts and sales personnel, BONYA provides its clients with the right products for a future where societies can thrive.',
      p3: 'We work with a network of trusted suppliers around the world to source the best possible building products — to fulfill the needs of our clients in both public and private sectors.',
      link: 'More about us',
    },
    vision: {
      num: '01',
      title: 'Vision',
      desc: 'To emerge as a major player in the Construction Materials segment, distinguished by our fast services and commitment to excellence in practices and values that foster human potential.',
    },
    mission: {
      num: '02',
      title: 'Mission',
      desc: 'Is to supply all types of construction materials to ready-mix factories and projects across KSA. We also aim to deliver state-of-the-art technical solutions to our customers on scientific foundations — to advance the building materials sector.',
    },
    aligned: {
      tag: 'ALIGNED WITH VISION 2030',
      title: "Building the Kingdom's Vision 2030.",
      sub: 'BONYA is built to serve the projects shaping the next chapter of Saudi Arabia — with the products, logistics, and quality discipline these projects demand.',
    },
    services: {
      tag: 'What We Offer',
      title: 'Our Services',
      sub: 'Comprehensive solutions for all your construction material needs.',
      items: [
        { title: 'Premium Materials', desc: 'High-quality cement, concrete, and aggregates sourced from trusted suppliers.' },
        { title: 'Reliable Logistics', desc: 'Modern fleet ensuring timely, safe delivery to every construction site.' },
        { title: 'Quality Assured', desc: 'Rigorous testing and quality control for premium products every time.' },
        { title: '24/7 Support', desc: 'Round-the-clock customer support for orders and technical inquiries.' },
      ],
    },
    portal: {
      tag: 'Access Portals',
      title: 'Access Your Portal',
      sub: "Choose your portal to login or register. Whether you're a customer or a partner, we've got you covered.",
      cTitle: 'Customer Portal',
      cDesc: 'Browse our catalog, place orders for construction materials, track deliveries, and manage your account.',
      cLogin: 'Customer Login',
      cSignup: 'Customer Signup',
      pathA: 'PATH A',
      pTitle: 'Partners Portal',
      pDesc: 'For Brokers & Vendors: Manage your partnerships, inventory, commissions, and business opportunities.',
      pLogin: 'Partner Login',
      pSignup: 'Partner Registration',
      pathB: 'PATH B',
      note: 'For Brokers & Vendors',
    },
    contact: {
      tag: 'Get in Touch',
      title: 'Contact Us',
      sub: 'Get in touch with our team for inquiries, support, or partnership opportunities.',
      cards: [
        { title: 'Email Address', val: 'info@bonya.com' },
        { title: 'Phone Number', val: '+966 920011074' },
        { title: 'Office Location', val: 'Riyadh, Saudi Arabia' },
      ],
    },
    footer: {
      tagline: 'Leading provider of premium construction materials and logistics solutions, building the infrastructure of tomorrow.',
      quick: 'Quick Links',
      links: ['About Us', 'Services', 'Portal', 'Contact'],
      contactTitle: 'Contact Info',
      newsletter: 'Newsletter',
      nlSub: 'Stay updated with our latest news and offers.',
      nlPlaceholder: 'Your email',
      copyright: '© 2026 BONYA Company. All rights reserved.',
      privacy: 'Privacy Policy',
      terms: 'Terms of Service',
    },
  },
  ar: {
    topBar: { phone: '920011074', email: 'info@bonya.com' },
    nav: { home: 'الرئيسية', about: 'من نحن', services: 'خدماتنا', portal: 'البوابة', contact: 'اتصل بنا', cta: 'طلب عرض سعر' },
    hero: {
      badge: 'بونيا · المملكة العربية السعودية · منذ 2019',
      h1: 'حلول مستدامة',
      h2: 'لمستقبل أقوى',
      sub: 'نقدم لعملائنا في المملكة مواد بناء متينة وخدمات مخصصة، مع تسخير خبرتنا العالمية لدعم حتى أكثر المشاريع تعقيداً بمنتجات البناء عالية الجودة.',
      cta1: 'طلب عرض سعر', cta2: 'شاهد قصتنا',
      scroll: 'انتقل للأسفل',
      global: 'نفكر عالمياً. نعمل محلياً.',
    },
    stats: [
      { value: '8', suffix: '+', label: 'مصادر' },
      { value: '300', suffix: '+', label: 'شحنة' },
      { value: '100', suffix: '+', label: 'عميل' },
      { value: '150', suffix: '+', label: 'مشروع' },
      { value: '5', suffix: '', label: 'مناطق' },
    ],
    about: {
      tag: 'من نحن',
      title: 'مورد رائد لمواد البناء في السعودية — منذ 2019.',
      p1: 'بونيا مورد رائد لمواد البناء والخدمات اللوجستية في المملكة العربية السعودية. نعمل منذ 2019 بسجل حافل في تقديم منتجات عالية الجودة وخدمة متميزة.',
      p2: 'بفريق من المهندسين والخبراء الفنيين ومسؤولي المبيعات، نقدم لعملائنا المنتجات المناسبة لمستقبل تزدهر فيه المجتمعات.',
      p3: 'نعمل مع شبكة من الموردين الموثوقين حول العالم للحصول على أفضل منتجات البناء — لتلبية احتياجات عملائنا في القطاعين العام والخاص.',
      link: 'المزيد عنا',
    },
    vision: {
      num: '01',
      title: 'الرؤية',
      desc: 'أن نكون لاعباً رئيسياً في قطاع مواد البناء، متميزين بخدماتنا السريعة والتزامنا بالتميز في الممارسات والقيم التي تعزز الإمكانات البشرية.',
    },
    mission: {
      num: '02',
      title: 'المهمة',
      desc: 'توريد جميع أنواع مواد البناء لمصانع الخرسانة الجاهزة والمشاريع في المملكة. نهدف أيضاً لتقديم حلول تقنية متطورة لعملائنا على أسس علمية — للنهوض بقطاع مواد البناء.',
    },
    aligned: {
      tag: 'متوافقون مع رؤية 2030',
      title: 'نبني رؤية المملكة 2030.',
      sub: 'بونيا مبنية لخدمة المشاريع التي تشكل الفصل القادم من تاريخ المملكة — بالمنتجات واللوجستيات وانضباط الجودة الذي تتطلبه هذه المشاريع.',
    },
    services: {
      tag: 'ما نقدمه',
      title: 'خدماتنا',
      sub: 'حلول شاملة لجميع احتياجاتك من مواد البناء.',
      items: [
        { title: 'مواد متميزة', desc: 'إسمنت وخرسانة وركام عالي الجودة من موردين موثوقين.' },
        { title: 'لوجستيات موثوقة', desc: 'أسطول حديث يضمن التسليم الآمن في الوقت المناسب.' },
        { title: 'جودة مضمونة', desc: 'اختبارات صارمة وضبط جودة لمنتجات متميزة في كل مرة.' },
        { title: 'دعم ٢٤/٧', desc: 'دعم عملاء على مدار الساعة للطلبات والاستفسارات الفنية.' },
      ],
    },
    portal: {
      tag: 'بوابات الدخول',
      title: 'ادخل إلى بوابتك',
      sub: 'اختر بوابتك لتسجيل الدخول أو التسجيل، سواء كنت عميلاً أو شريكاً.',
      cTitle: 'بوابة العملاء',
      cDesc: 'تصفح كتالوجنا وقدم الطلبات وتابع الشحنات وأدر حسابك.',
      cLogin: 'دخول العملاء',
      cSignup: 'تسجيل عميل',
      pathA: 'مسار أ',
      pTitle: 'بوابة الشركاء',
      pDesc: 'للوسطاء والموردين: أدر شراكاتك ومخزونك وعمولاتك وفرصك التجارية.',
      pLogin: 'دخول الشركاء',
      pSignup: 'تسجيل شريك',
      pathB: 'مسار ب',
      note: 'للوسطاء والموردين',
    },
    contact: {
      tag: 'تواصل معنا',
      title: 'اتصل بنا',
      sub: 'تواصل مع فريقنا للاستفسارات والدعم وفرص الشراكة.',
      cards: [
        { title: 'البريد الإلكتروني', val: 'info@bonya.com' },
        { title: 'رقم الهاتف', val: '+966 920011074' },
        { title: 'موقع المكتب', val: 'الرياض، المملكة العربية السعودية' },
      ],
    },
    footer: {
      tagline: 'مزود رائد لمواد البناء الفاخرة والحلول اللوجستية، نبني البنية التحتية لغد أفضل.',
      quick: 'روابط سريعة',
      links: ['من نحن', 'خدماتنا', 'البوابة', 'اتصل بنا'],
      contactTitle: 'معلومات الاتصال',
      newsletter: 'النشرة الإخبارية',
      nlSub: 'ابق على اطلاع بآخر أخبارنا وعروضنا.',
      nlPlaceholder: 'بريدك الإلكتروني',
      copyright: '© 2026 شركة بونيا. جميع الحقوق محفوظة.',
      privacy: 'سياسة الخصوصية',
      terms: 'شروط الخدمة',
    },
  },
} as const;

type Lang = 'en' | 'ar';

// ─── Animation Variants ───────────────────────────────────────────────────────
const fadeInUp = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } };

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

// ─── AnimatedSection ──────────────────────────────────────────────────────────
function AnimatedSection({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div ref={ref} initial="hidden" animate={isInView ? 'visible' : 'hidden'} variants={fadeInUp} transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }} className={className}>
      {children}
    </motion.div>
  );
}

// ─── Animated Counter ─────────────────────────────────────────────────────────
function AnimatedCounter({ value, suffix }: { value: string; suffix: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const numValue = parseInt(value);

  return (
    <span ref={ref} className="tabular-nums">
      {isInView ? (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {suffix && <span className="text-[#1e3a5f]">+</span>}
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {numValue}
            </motion.span>
          </motion.span>
        </motion.span>
      ) : (
        <span>0</span>
      )}
    </span>
  );
}

// ─── Language Toggle ──────────────────────────────────────────────────────────
function LanguageToggle({ lang, setLang }: { lang: Lang; setLang: (l: Lang) => void }) {
  return (
    <div className="flex items-center bg-slate-100 rounded-full p-0.5">
      {(['en', 'ar'] as Lang[]).map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          className={`px-4 py-1.5 text-sm font-medium rounded-full transition-all duration-200 ${
            lang === l
              ? 'bg-white text-[#1e3a5f] shadow-sm'
              : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

// ─── Service / Contact icon/gradient maps ─────────────────────────────────────
const SERVICE_ICONS = [Package, Truck, ShieldCheck, Headphones];
const CONTACT_ICONS = [Mail, Phone, MapPin];

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function BonyaLanding() {
  const [lang, setLang] = useState<Lang>('en');
  const t = translations[lang];
  const isAr = lang === 'ar';

  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

  return (
    <div className={`min-h-screen bg-white overflow-x-hidden`} dir={isAr ? 'rtl' : 'ltr'}>

      {/* ── Top Bar ────────────────────────────────────────────────────────────── */}
      <div className="bg-slate-50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex justify-between items-center text-sm">
          <div className="flex items-center gap-6 text-slate-600">
            <a href="tel:920011074" className="flex items-center gap-2 hover:text-[#1e3a5f] transition-colors">
              <Phone className="w-3.5 h-3.5" />
              <span>{t.topBar.phone}</span>
            </a>
            <a href="mailto:info@bonya.com" className="hidden sm:flex items-center gap-2 hover:text-[#1e3a5f] transition-colors">
              <Mail className="w-3.5 h-3.5" />
              <span>{t.topBar.email}</span>
            </a>
          </div>
          <LanguageToggle lang={lang} setLang={setLang} />
        </div>
      </div>

      {/* ── Navbar ───────────────────────────────────────────────────────────── */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-100"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center gap-4">
          {/* Logo */}
          <motion.div className="flex items-center gap-3 cursor-pointer flex-shrink-0" whileHover={{ scale: 1.02 }} transition={{ type: 'spring', stiffness: 400 }}>
            <div className="w-10 h-10 bg-[#1e3a5f] rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold text-lg">B</span>
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-bold text-xl tracking-tight text-[#1e3a5f]">BONYA</span>
              <span className="text-[9px] text-slate-400 tracking-[0.15em] uppercase">Company</span>
            </div>
          </motion.div>

          {/* Nav Links */}
          <nav className="hidden lg:flex items-center gap-8">
            {[
              { label: t.nav.home, href: '#' },
              { label: t.nav.about, href: '#about' },
              { label: t.nav.services, href: '#services' },
              { label: t.nav.portal, href: '#access-portal' },
              { label: t.nav.contact, href: '#contact' },
            ].map((item, i) => (
              <motion.a
                key={item.label}
                href={item.href}
                className="relative text-sm font-medium text-slate-600 hover:text-[#1e3a5f] transition-colors py-2 group"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * i + 0.2 }}
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#1e3a5f] group-hover:w-full transition-all duration-300" />
              </motion.a>
            ))}
          </nav>

          {/* CTA Button */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
            <Button className="hidden sm:flex bg-[#c9a96a] hover:bg-[#b8985d] text-white font-medium px-6 py-5 rounded-lg transition-all duration-300 text-sm">
              {t.nav.cta}
            </Button>
          </motion.div>
        </div>
      </motion.header>

      {/* ── Hero ─────────────────────────────────────────────────────────────── */}
      <section ref={heroRef} className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Background Video/Image */}
        <motion.div className="absolute inset-0" style={{ scale: heroScale }}>
          <Image
            src="/hero-bg.jpg"
            alt="BONYA Construction Facility"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1e3a5f]/90 via-[#1e3a5f]/70 to-[#1e3a5f]/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1e3a5f]/50 via-transparent to-transparent" />
        </motion.div>

        <motion.div style={{ opacity: heroOpacity }} className="relative z-10 w-full">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
            <div className="max-w-3xl">
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="inline-flex items-center gap-2.5 mb-8"
              >
                <span className="w-2 h-2 rounded-full bg-[#c9a96a]" />
                <span className="text-white/80 text-sm font-medium tracking-[0.2em] uppercase">
                  {t.hero.badge}
                </span>
              </motion.div>

              {/* Headline */}
              <motion.h1
                className="text-5xl sm:text-6xl lg:text-7xl font-serif italic font-normal leading-[1.1] mb-8 text-white"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                {t.hero.h1}
                <br />
                <span className="text-white">{t.hero.h2}</span>
              </motion.h1>

              {/* Description */}
              <motion.p
                className="text-lg text-white/75 mb-10 leading-relaxed max-w-2xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                {t.hero.sub}
              </motion.p>

              {/* CTAs */}
              <motion.div
                className="flex flex-wrap items-center gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.6 }}
              >
                <Button className="group bg-white text-[#1e3a5f] hover:bg-slate-100 font-medium px-8 py-6 text-base rounded-none transition-all duration-300 border-2 border-white hover:border-slate-100">
                  {t.hero.cta1}
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
                <button className="flex items-center gap-3 text-white/90 hover:text-white font-medium transition-colors group">
                  <span className="w-12 h-12 rounded-full border-2 border-white/30 flex items-center justify-center group-hover:border-white/50 transition-colors">
                    <Play className="w-4 h-4 fill-white" />
                  </span>
                  {t.hero.cta2}
                </button>
              </motion.div>
            </div>

            {/* Global text */}
            <motion.div
              className="absolute bottom-8 right-8 hidden lg:block"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <p className="text-white/40 text-sm font-medium tracking-[0.3em] uppercase writing-vertical">
                {t.hero.global}
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-8 z-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }} className="flex flex-col items-center gap-3">
            <span className="text-white/50 text-xs font-medium tracking-[0.3em] uppercase">{t.hero.scroll}</span>
            <div className="w-px h-16 bg-gradient-to-b from-white/50 to-transparent" />
          </motion.div>
        </motion.div>
      </section>

      {/* ── Stats Strip ──────────────────────────────────────────────────────── */}
      <section className="bg-white py-16 lg:py-20 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            {t.stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                className={`text-center ${i < 4 ? 'border-r border-slate-200 last:border-r-0 md:border-r' : ''}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <p className="text-5xl lg:text-6xl font-light text-[#1e3a5f] mb-2">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </p>
                <p className="text-xs font-medium text-slate-400 tracking-[0.15em] uppercase">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── About ─────────────────────────────────────────────────────────────── */}
      <section id="about" className="py-24 lg:py-32 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <AnimatedSection>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-px bg-[#1e3a5f]" />
              <span className="text-xs font-medium text-slate-500 tracking-[0.2em] uppercase">{t.about.tag}</span>
            </div>
          </AnimatedSection>

          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            {/* Image */}
            <AnimatedSection>
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                <Image
                  src="/hero-bg.jpg"
                  alt="BONYA Operations"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1e3a5f]/30 to-transparent" />
                <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-sm px-6 py-4 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#1e3a5f] rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold">B</span>
                    </div>
                    <span className="font-semibold text-[#1e3a5f]">BONYA</span>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            {/* Content */}
            <AnimatedSection delay={0.1}>
              <h2 className="text-3xl lg:text-4xl font-serif italic font-normal text-[#1e3a5f] mb-8 leading-tight">
                {t.about.title}
              </h2>
              <div className="space-y-5 text-slate-600 leading-relaxed">
                <p>{t.about.p1}</p>
                <p>{t.about.p2}</p>
                <p>{t.about.p3}</p>
              </div>
              <motion.a
                href="#"
                className="inline-flex items-center gap-2 text-[#1e3a5f] font-medium mt-8 group border-b-2 border-[#1e3a5f] pb-1"
                whileHover={{ x: isAr ? -5 : 5 }}
              >
                {t.about.link}
                <ArrowRight className={`w-4 h-4 group-hover:translate-x-1 transition-transform ${isAr ? 'rotate-180' : ''}`} />
              </motion.a>
            </AnimatedSection>
          </div>

          {/* Vision & Mission Cards */}
          <div className="grid md:grid-cols-2 gap-6 mt-20">
            {[t.vision, t.mission].map((item, i) => (
              <motion.div
                key={item.title}
                className="relative bg-[#faf8f5] rounded-lg p-10 overflow-hidden group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
              >
                <div className="absolute top-8 right-8 text-[120px] font-serif italic text-[#1e3a5f]/5 leading-none select-none">
                  {item.num}
                </div>
                <span className="text-xs font-medium text-[#c9a96a] tracking-[0.15em] uppercase">{item.num}</span>
                <h3 className="text-2xl font-semibold text-[#1e3a5f] mt-3 mb-4">{item.title}</h3>
                <p className="text-slate-600 leading-relaxed relative z-10">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Aligned with Vision 2030 ─────────────────────────────────────────── */}
      <section className="py-24 lg:py-32 bg-[#1e3a5f] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-px bg-white/30" />
              <span className="text-xs font-medium text-white/60 tracking-[0.2em] uppercase">{t.aligned.tag}</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-serif italic font-normal text-white mb-6 leading-tight max-w-2xl">
              {t.aligned.title}
            </h2>
            <p className="text-white/70 text-lg max-w-2xl leading-relaxed">
              {t.aligned.sub}
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* ── Services ──────────────────────────────────────────────────────────── */}
      <section id="services" className="py-24 lg:py-32 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-16">
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="w-12 h-px bg-[#1e3a5f]" />
                <span className="text-xs font-medium text-slate-500 tracking-[0.2em] uppercase">{t.services.tag}</span>
                <div className="w-12 h-px bg-[#1e3a5f]" />
              </div>
              <h2 className="text-4xl lg:text-5xl font-serif italic font-normal text-[#1e3a5f] mb-5">{t.services.title}</h2>
              <p className="text-slate-500 text-lg max-w-2xl mx-auto">{t.services.sub}</p>
            </div>
          </AnimatedSection>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
          >
            {t.services.items.map((service, i) => {
              const Icon = SERVICE_ICONS[i];
              return (
                <motion.div
                  key={service.title}
                  className="group relative bg-white rounded-lg p-8 border border-slate-200 hover:border-[#1e3a5f]/30 hover:shadow-xl transition-all duration-500"
                  variants={fadeInUp}
                  whileHover={{ y: -8 }}
                >
                  <div className="w-14 h-14 rounded-lg bg-[#1e3a5f] flex items-center justify-center mb-6 group-hover:bg-[#c9a96a] transition-colors duration-300">
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-[#1e3a5f] mb-3">{service.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{service.desc}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ── Portal ─────────────────────────────────────────────────────────────── */}
      <section id="access-portal" className="py-24 lg:py-32 bg-slate-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-16">
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="w-12 h-px bg-[#1e3a5f]" />
                <span className="text-xs font-medium text-slate-500 tracking-[0.2em] uppercase">{t.portal.tag}</span>
                <div className="w-12 h-px bg-[#1e3a5f]" />
              </div>
              <h2 className="text-4xl lg:text-5xl font-serif italic font-normal text-[#1e3a5f] mb-5">{t.portal.title}</h2>
              <p className="text-slate-500 text-lg max-w-2xl mx-auto">{t.portal.sub}</p>
            </div>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Customer Portal */}
            <motion.div
              className="group relative bg-white rounded-lg p-10 border border-slate-200 shadow-sm hover:shadow-2xl transition-all duration-500"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              whileHover={{ y: -6 }}
            >
              <div className="flex items-center justify-between mb-8">
                <div className="w-14 h-14 rounded-lg bg-[#1e3a5f] flex items-center justify-center group-hover:bg-[#c9a96a] transition-colors duration-300">
                  <Users className="w-7 h-7 text-white" />
                </div>
                <span className="px-3 py-1.5 bg-slate-100 text-slate-500 text-xs font-medium tracking-[0.1em] uppercase rounded">{t.portal.pathA}</span>
              </div>
              <h3 className="text-2xl font-semibold text-[#1e3a5f] mb-3">{t.portal.cTitle}</h3>
              <p className="text-slate-500 mb-8 leading-relaxed text-sm">{t.portal.cDesc}</p>
              <div className="space-y-3">
                <Button className="w-full bg-[#1e3a5f] hover:bg-[#152d4a] text-white font-medium py-6 rounded-lg transition-all duration-300 group/btn">
                  {t.portal.cLogin}
                  <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                </Button>
                <Button variant="outline" className="w-full border-2 border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300 font-medium py-6 rounded-lg transition-all duration-300">
                  {t.portal.cSignup}
                </Button>
              </div>
            </motion.div>

            {/* Partner Portal */}
            <motion.div
              className="group relative bg-white rounded-lg p-10 border border-slate-200 shadow-sm hover:shadow-2xl transition-all duration-500"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              whileHover={{ y: -6 }}
            >
              <div className="flex items-center justify-between mb-8">
                <div className="w-14 h-14 rounded-lg bg-[#c9a96a] flex items-center justify-center group-hover:bg-[#1e3a5f] transition-colors duration-300">
                  <Building2 className="w-7 h-7 text-white" />
                </div>
                <span className="px-3 py-1.5 bg-slate-100 text-slate-500 text-xs font-medium tracking-[0.1em] uppercase rounded">{t.portal.pathB}</span>
              </div>
              <h3 className="text-2xl font-semibold text-[#1e3a5f] mb-3">{t.portal.pTitle}</h3>
              <p className="text-slate-500 mb-8 leading-relaxed text-sm">{t.portal.pDesc}</p>
              <div className="space-y-3">
                <Button className="w-full bg-[#c9a96a] hover:bg-[#b8985d] text-white font-medium py-6 rounded-lg transition-all duration-300 group/btn">
                  {t.portal.pLogin}
                  <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                </Button>
                <Button variant="outline" className="w-full border-2 border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300 font-medium py-6 rounded-lg transition-all duration-300">
                  {t.portal.pSignup}
                </Button>
              </div>
              <p className="text-center text-slate-400 text-xs mt-5">{t.portal.note}</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Contact ─────────────────────────────────────────────────────────────── */}
      <section id="contact" className="py-24 lg:py-32 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-16">
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="w-12 h-px bg-[#1e3a5f]" />
                <span className="text-xs font-medium text-slate-500 tracking-[0.2em] uppercase">{t.contact.tag}</span>
                <div className="w-12 h-px bg-[#1e3a5f]" />
              </div>
              <h2 className="text-4xl lg:text-5xl font-serif italic font-normal text-[#1e3a5f] mb-5">{t.contact.title}</h2>
              <p className="text-slate-500 text-lg max-w-2xl mx-auto">{t.contact.sub}</p>
            </div>
          </AnimatedSection>

          <motion.div
            className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {t.contact.cards.map((card, i) => {
              const Icon = CONTACT_ICONS[i];
              return (
                <motion.div
                  key={card.title}
                  className="group text-center p-10 rounded-lg bg-slate-50 hover:bg-white border border-transparent hover:border-slate-200 hover:shadow-xl transition-all duration-500"
                  variants={fadeInUp}
                  whileHover={{ y: -7 }}
                >
                  <div className="w-14 h-14 mx-auto mb-6 rounded-lg bg-[#1e3a5f] flex items-center justify-center group-hover:bg-[#c9a96a] transition-colors duration-300">
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-base font-semibold text-[#1e3a5f] mb-2">{card.title}</h3>
                  <p className="text-slate-500 text-sm">{card.val}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ── Footer ────────────────────────────────────────────────────────────── */}
      <footer className="bg-[#1e3a5f] text-white py-16 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12 mb-12 pb-12 border-b border-white/10">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-[#1e3a5f] font-bold text-lg">B</span>
                </div>
                <div>
                  <span className="font-bold text-lg">BONYA</span>
                  <p className="text-white/50 text-[9px] tracking-[0.15em] uppercase">Company</p>
                </div>
              </div>
              <p className="text-white/60 text-sm leading-relaxed">{t.footer.tagline}</p>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
              <h4 className="font-semibold text-white text-sm mb-6">{t.footer.quick}</h4>
              <ul className="space-y-3">
                {t.footer.links.map((link, i) => {
                  const hrefs = ['#about', '#services', '#access-portal', '#contact'];
                  return (
                    <li key={link}>
                      <a href={hrefs[i]} className="text-white/60 hover:text-white transition-colors text-sm">
                        {link}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
              <h4 className="font-semibold text-white text-sm mb-6">{t.footer.contactTitle}</h4>
              <ul className="space-y-3 text-white/60 text-sm">
                <li className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-[#c9a96a] flex-shrink-0" />
                  info@bonya.com
                </li>
                <li className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-[#c9a96a] flex-shrink-0" />
                  +966 920011074
                </li>
              </ul>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}>
              <h4 className="font-semibold text-white text-sm mb-6">{t.footer.newsletter}</h4>
              <p className="text-white/60 text-sm mb-4 leading-relaxed">{t.footer.nlSub}</p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder={t.footer.nlPlaceholder}
                  className="flex-1 bg-white/10 border border-white/20 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-[#c9a96a] transition-colors"
                />
                <Button className="bg-[#c9a96a] hover:bg-[#b8985d] text-white font-medium px-4 rounded-lg transition-all duration-300">
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </motion.div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/50 text-sm">{t.footer.copyright}</p>
            <div className="flex gap-6 text-sm">
              <a href="#" className="text-white/50 hover:text-white transition-colors">{t.footer.privacy}</a>
              <a href="#" className="text-white/50 hover:text-white transition-colors">{t.footer.terms}</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
