'use client';

import Image from 'next/image';
import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import {
  Mail,
  Phone,
  MapPin,
  Package,
  Truck,
  ShieldCheck,
  Headphones,
  ArrowRight,
  Play,
  Send,
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
        <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
          {suffix && <span className="text-[#D4AF6A]">+</span>}
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {numValue}
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
    <div className="flex items-center bg-[#0D4B43]/10 rounded-full p-0.5">
      {(['en', 'ar'] as Lang[]).map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          className={`px-4 py-1.5 text-sm font-medium rounded-full transition-all duration-200 ${
            lang === l
              ? 'bg-[#0D4B43] text-white shadow-sm'
              : 'text-[#0D4B43] hover:text-[#0D4B43]/80'
          }`}
        >
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

// ─── Service / Contact icon maps ──────────────────────────────────────────────
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
    <div className={`min-h-screen bg-stone-50 overflow-x-hidden`} dir={isAr ? 'rtl' : 'ltr'}>

      {/* ── Top Bar ────────────────────────────────────────────────────────────── */}
      <div className="bg-[#0D4B43] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex justify-between items-center text-sm">
          <div className="flex items-center gap-6">
            <a href="tel:920011074" className="flex items-center gap-2 hover:text-[#D4AF6A] transition-colors">
              <Phone className="w-3.5 h-3.5" />
              <span>{t.topBar.phone}</span>
            </a>
            <a href="mailto:info@bonya.com" className="hidden sm:flex items-center gap-2 hover:text-[#D4AF6A] transition-colors">
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
        className="sticky top-0 z-50 bg-white/98 backdrop-blur-md border-b border-stone-200/50 shadow-sm"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center gap-4">
          {/* Logo */}
          <motion.div className="flex items-center gap-3 cursor-pointer flex-shrink-0" whileHover={{ scale: 1.02 }} transition={{ type: 'spring', stiffness: 400 }}>
            <div className="w-11 h-11 bg-gradient-to-br from-[#0D4B43] to-[#0a3d36] rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-[#0D4B43]/20">
              <span className="text-white font-bold text-xl">B</span>
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-bold text-xl tracking-tight text-[#0D4B43]">BONYA</span>
              <span className="text-[9px] text-[#D4AF6A] tracking-[0.2em] uppercase font-medium">Company</span>
            </div>
          </motion.div>

          {/* Nav Links */}
          <nav className="hidden lg:flex items-center gap-10">
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
                className="relative text-sm font-medium text-stone-600 hover:text-[#0D4B43] transition-colors py-2 group"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * i + 0.2 }}
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#D4AF6A] group-hover:w-full transition-all duration-300" />
              </motion.a>
            ))}
          </nav>

          {/* CTA Button */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
            <Button className="hidden sm:flex bg-[#D4AF6A] hover:bg-[#c9a45f] text-[#0D4B43] font-semibold px-6 py-5 rounded-xl transition-all duration-300 text-sm shadow-lg shadow-[#D4AF6A]/30 hover:shadow-xl hover:shadow-[#D4AF6A]/40">
              {t.nav.cta}
            </Button>
          </motion.div>
        </div>
      </motion.header>

      {/* ── Hero ─────────────────────────────────────────────────────────────── */}
      <section ref={heroRef} className="relative min-h-[92vh] flex items-center overflow-hidden">
        {/* Background */}
        <motion.div className="absolute inset-0" style={{ scale: heroScale }}>
          <Image
            src="/hero-bg.jpg"
            alt="BONYA Construction Facility"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0D4B43]/95 via-[#0D4B43]/80 to-[#0D4B43]/50" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0D4B43]/60 via-transparent to-transparent" />
        </motion.div>

        <motion.div style={{ opacity: heroOpacity }} className="relative z-10 w-full">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
            <div className="max-w-3xl">
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="inline-flex items-center gap-3 mb-8"
              >
                <span className="w-12 h-[2px] bg-[#D4AF6A]" />
                <span className="text-white/90 text-sm font-medium tracking-[0.25em] uppercase">
                  {t.hero.badge}
                </span>
              </motion.div>

              {/* Headline */}
              <motion.h1
                className="text-5xl sm:text-6xl lg:text-7xl font-serif italic font-normal leading-[1.05] mb-8 text-white"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                {t.hero.h1}
                <br />
                <span className="text-[#D4AF6A]">{t.hero.h2}</span>
              </motion.h1>

              {/* Description */}
              <motion.p
                className="text-lg text-white/80 mb-10 leading-relaxed max-w-2xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                {t.hero.sub}
              </motion.p>

              {/* CTAs */}
              <motion.div
                className="flex flex-wrap items-center gap-5"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.6 }}
              >
                <Button className="group bg-[#D4AF6A] text-[#0D4B43] hover:bg-[#c9a45f] font-semibold px-8 py-6 text-base rounded-xl transition-all duration-300 shadow-xl shadow-[#D4AF6A]/30 hover:shadow-2xl hover:shadow-[#D4AF6A]/40">
                  {t.hero.cta1}
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
                <button className="flex items-center gap-3 text-white/90 hover:text-white font-medium transition-colors group">
                  <span className="w-14 h-14 rounded-full border-2 border-white/30 flex items-center justify-center group-hover:border-[#D4AF6A] group-hover:bg-[#D4AF6A]/10 transition-all duration-300">
                    <Play className="w-5 h-5 fill-white" />
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
              transition={{ delay: 1.2, duration: 0.8 }}
            >
              <p className="text-white/50 text-sm tracking-[0.3em] uppercase writing-mode-vertical">
                {t.hero.global}
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <span className="text-white/60 text-xs tracking-[0.3em] uppercase">{t.hero.scroll}</span>
          <motion.div
            className="w-[1px] h-12 bg-gradient-to-b from-white/60 to-transparent"
            animate={{ scaleY: [1, 0.5, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </motion.div>
      </section>

      {/* ── Stats Strip ──────────────────────────────────────────────────────── */}
      <section className="bg-white border-y border-stone-200/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-5">
            {t.stats.map((stat, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <div className={`py-10 px-6 text-center ${i !== t.stats.length - 1 ? 'md:border-r border-stone-200/50' : ''} ${i < 2 ? 'border-b md:border-b-0 border-stone-200/50' : ''}`}>
                  <div className="text-4xl lg:text-5xl font-bold text-[#0D4B43] mb-2">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-xs text-stone-500 tracking-[0.15em] uppercase font-medium">{stat.label}</div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── About Section ────────────────────────────────────────────────────── */}
      <section id="about" className="py-24 lg:py-32 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-start">
            {/* Image Side */}
            <AnimatedSection>
              <div className="relative">
                <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl shadow-stone-300/50">
                  <Image
                    src="/hero-bg.jpg"
                    alt="BONYA Operations"
                    fill
                    className="object-cover"
                  />
                  {/* Overlay with branding */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0D4B43]/90 via-[#0D4B43]/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[#D4AF6A] rounded-lg flex items-center justify-center">
                        <span className="text-[#0D4B43] font-bold text-lg">B</span>
                      </div>
                      <div>
                        <span className="text-white font-bold text-lg">BONYA</span>
                        <span className="block text-white/70 text-xs tracking-widest uppercase">Since 2019</span>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Decorative element */}
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[#D4AF6A]/20 rounded-2xl -z-10" />
                <div className="absolute -top-6 -left-6 w-24 h-24 border-2 border-[#0D4B43]/20 rounded-2xl -z-10" />
              </div>
            </AnimatedSection>

            {/* Content Side */}
            <div className="lg:pt-8">
              <AnimatedSection>
                <div className="flex items-center gap-3 mb-6">
                  <span className="w-10 h-[2px] bg-[#D4AF6A]" />
                  <span className="text-[#0D4B43] text-sm font-semibold tracking-[0.2em] uppercase">{t.about.tag}</span>
                </div>
              </AnimatedSection>

              <AnimatedSection delay={0.1}>
                <h2 className="text-3xl lg:text-4xl font-serif italic text-[#0D4B43] mb-8 leading-tight">
                  {t.about.title}
                </h2>
              </AnimatedSection>

              <AnimatedSection delay={0.2}>
                <div className="space-y-5 text-stone-600 leading-relaxed mb-10">
                  <p>{t.about.p1}</p>
                  <p>{t.about.p2}</p>
                  <p>{t.about.p3}</p>
                </div>
              </AnimatedSection>

              <AnimatedSection delay={0.3}>
                <a href="#" className="inline-flex items-center gap-2 text-[#0D4B43] font-semibold hover:text-[#D4AF6A] transition-colors group">
                  {t.about.link}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </AnimatedSection>

              {/* Vision & Mission Cards */}
              <div className="grid sm:grid-cols-2 gap-6 mt-12">
                <AnimatedSection delay={0.4}>
                  <div className="bg-gradient-to-br from-stone-100 to-stone-50 p-6 rounded-2xl relative overflow-hidden border border-stone-200/50 group hover:shadow-lg transition-shadow">
                    <span className="absolute -top-4 -right-2 text-8xl font-bold text-[#0D4B43]/5 group-hover:text-[#D4AF6A]/10 transition-colors">{t.vision.num}</span>
                    <div className="relative">
                      <h3 className="text-lg font-bold text-[#0D4B43] mb-3">{t.vision.title}</h3>
                      <p className="text-sm text-stone-600 leading-relaxed">{t.vision.desc}</p>
                    </div>
                  </div>
                </AnimatedSection>
                <AnimatedSection delay={0.5}>
                  <div className="bg-gradient-to-br from-stone-100 to-stone-50 p-6 rounded-2xl relative overflow-hidden border border-stone-200/50 group hover:shadow-lg transition-shadow">
                    <span className="absolute -top-4 -right-2 text-8xl font-bold text-[#0D4B43]/5 group-hover:text-[#D4AF6A]/10 transition-colors">{t.mission.num}</span>
                    <div className="relative">
                      <h3 className="text-lg font-bold text-[#0D4B43] mb-3">{t.mission.title}</h3>
                      <p className="text-sm text-stone-600 leading-relaxed">{t.mission.desc}</p>
                    </div>
                  </div>
                </AnimatedSection>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Aligned with Vision 2030 ─────────────────────────────────────────── */}
      <section className="relative py-28 lg:py-36 bg-[#0D4B43] overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-[#D4AF6A] rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#D4AF6A] rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <AnimatedSection>
            <div className="inline-flex items-center gap-3 mb-8">
              <span className="w-10 h-[2px] bg-[#D4AF6A]" />
              <span className="text-[#D4AF6A] text-sm font-semibold tracking-[0.25em] uppercase">{t.aligned.tag}</span>
              <span className="w-10 h-[2px] bg-[#D4AF6A]" />
            </div>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <h2 className="text-4xl lg:text-5xl xl:text-6xl font-serif italic text-white mb-8 leading-tight">
              {t.aligned.title}
            </h2>
          </AnimatedSection>
          <AnimatedSection delay={0.2}>
            <p className="text-lg text-white/70 leading-relaxed max-w-2xl mx-auto">
              {t.aligned.sub}
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* ── Services Section ─────────────────────────────────────────────────── */}
      <section id="services" className="py-24 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <AnimatedSection>
              <div className="inline-flex items-center gap-3 mb-6">
                <span className="w-10 h-[2px] bg-[#D4AF6A]" />
                <span className="text-[#0D4B43] text-sm font-semibold tracking-[0.2em] uppercase">{t.services.tag}</span>
                <span className="w-10 h-[2px] bg-[#D4AF6A]" />
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.1}>
              <h2 className="text-3xl lg:text-4xl font-serif italic text-[#0D4B43] mb-4">{t.services.title}</h2>
            </AnimatedSection>
            <AnimatedSection delay={0.2}>
              <p className="text-stone-600 max-w-xl mx-auto">{t.services.sub}</p>
            </AnimatedSection>
          </div>

          {/* Services Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.services.items.map((service, i) => {
              const Icon = SERVICE_ICONS[i];
              return (
                <AnimatedSection key={i} delay={0.1 * i}>
                  <motion.div
                    className="group bg-stone-50 rounded-2xl p-8 text-center hover:bg-[#0D4B43] transition-all duration-500 cursor-pointer border border-stone-200/50 hover:border-[#0D4B43] hover:shadow-2xl hover:shadow-[#0D4B43]/20"
                    whileHover={{ y: -8 }}
                  >
                    <div className="w-16 h-16 mx-auto mb-6 rounded-xl bg-[#0D4B43]/10 group-hover:bg-[#D4AF6A] flex items-center justify-center transition-all duration-500">
                      <Icon className="w-7 h-7 text-[#0D4B43] group-hover:text-[#0D4B43] transition-colors" />
                    </div>
                    <h3 className="text-lg font-bold text-[#0D4B43] group-hover:text-white mb-3 transition-colors">{service.title}</h3>
                    <p className="text-sm text-stone-600 group-hover:text-white/80 leading-relaxed transition-colors">{service.desc}</p>
                  </motion.div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Portal Section ────────────────────────────────────────────────────── */}
      <section id="access-portal" className="py-24 lg:py-32 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <AnimatedSection>
              <div className="inline-flex items-center gap-3 mb-6">
                <span className="w-10 h-[2px] bg-[#D4AF6A]" />
                <span className="text-[#0D4B43] text-sm font-semibold tracking-[0.2em] uppercase">{t.portal.tag}</span>
                <span className="w-10 h-[2px] bg-[#D4AF6A]" />
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.1}>
              <h2 className="text-3xl lg:text-4xl font-serif italic text-[#0D4B43] mb-4">{t.portal.title}</h2>
            </AnimatedSection>
            <AnimatedSection delay={0.2}>
              <p className="text-stone-600 max-w-xl mx-auto">{t.portal.sub}</p>
            </AnimatedSection>
          </div>

          {/* Portal Cards */}
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Customer Portal */}
            <AnimatedSection delay={0.3}>
              <motion.div
                className="bg-white rounded-2xl p-8 lg:p-10 shadow-lg shadow-stone-200/50 border border-stone-200/50 relative overflow-hidden group hover:shadow-xl transition-shadow"
                whileHover={{ y: -4 }}
              >
                <div className="absolute top-4 right-4">
                  <span className="text-xs font-bold text-[#D4AF6A] tracking-[0.15em] uppercase bg-[#D4AF6A]/10 px-3 py-1.5 rounded-full">{t.portal.pathA}</span>
                </div>
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#0D4B43] to-[#0a3d36] flex items-center justify-center mb-6 shadow-lg shadow-[#0D4B43]/20">
                  <Package className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-[#0D4B43] mb-3">{t.portal.cTitle}</h3>
                <p className="text-stone-600 mb-8 leading-relaxed">{t.portal.cDesc}</p>
                <div className="flex flex-wrap gap-3">
                  <Button className="bg-[#0D4B43] hover:bg-[#0a3d36] text-white font-semibold px-6 py-5 rounded-xl transition-all shadow-lg shadow-[#0D4B43]/20">
                    {t.portal.cLogin}
                  </Button>
                  <Button variant="outline" className="border-2 border-[#0D4B43] text-[#0D4B43] hover:bg-[#0D4B43] hover:text-white font-semibold px-6 py-5 rounded-xl transition-all">
                    {t.portal.cSignup}
                  </Button>
                </div>
              </motion.div>
            </AnimatedSection>

            {/* Partner Portal */}
            <AnimatedSection delay={0.4}>
              <motion.div
                className="bg-white rounded-2xl p-8 lg:p-10 shadow-lg shadow-stone-200/50 border border-stone-200/50 relative overflow-hidden group hover:shadow-xl transition-shadow"
                whileHover={{ y: -4 }}
              >
                <div className="absolute top-4 right-4">
                  <span className="text-xs font-bold text-[#D4AF6A] tracking-[0.15em] uppercase bg-[#D4AF6A]/10 px-3 py-1.5 rounded-full">{t.portal.pathB}</span>
                </div>
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#D4AF6A] to-[#c9a45f] flex items-center justify-center mb-6 shadow-lg shadow-[#D4AF6A]/20">
                  <Truck className="w-6 h-6 text-[#0D4B43]" />
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <h3 className="text-xl font-bold text-[#0D4B43]">{t.portal.pTitle}</h3>
                </div>
                <p className="text-sm text-[#D4AF6A] font-medium mb-2">{t.portal.note}</p>
                <p className="text-stone-600 mb-8 leading-relaxed">{t.portal.pDesc}</p>
                <div className="flex flex-wrap gap-3">
                  <Button className="bg-[#D4AF6A] hover:bg-[#c9a45f] text-[#0D4B43] font-semibold px-6 py-5 rounded-xl transition-all shadow-lg shadow-[#D4AF6A]/20">
                    {t.portal.pLogin}
                  </Button>
                  <Button variant="outline" className="border-2 border-[#D4AF6A] text-[#D4AF6A] hover:bg-[#D4AF6A] hover:text-[#0D4B43] font-semibold px-6 py-5 rounded-xl transition-all">
                    {t.portal.pSignup}
                  </Button>
                </div>
              </motion.div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ── Contact Section ───────────────────────────────────────────────────── */}
      <section id="contact" className="py-24 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <AnimatedSection>
              <div className="inline-flex items-center gap-3 mb-6">
                <span className="w-10 h-[2px] bg-[#D4AF6A]" />
                <span className="text-[#0D4B43] text-sm font-semibold tracking-[0.2em] uppercase">{t.contact.tag}</span>
                <span className="w-10 h-[2px] bg-[#D4AF6A]" />
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.1}>
              <h2 className="text-3xl lg:text-4xl font-serif italic text-[#0D4B43] mb-4">{t.contact.title}</h2>
            </AnimatedSection>
            <AnimatedSection delay={0.2}>
              <p className="text-stone-600 max-w-xl mx-auto">{t.contact.sub}</p>
            </AnimatedSection>
          </div>

          {/* Contact Cards */}
          <div className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {t.contact.cards.map((card, i) => {
              const Icon = CONTACT_ICONS[i];
              return (
                <AnimatedSection key={i} delay={0.1 * i}>
                  <motion.div
                    className="text-center p-8 bg-stone-50 rounded-2xl border border-stone-200/50 hover:shadow-lg transition-all group"
                    whileHover={{ y: -4 }}
                  >
                    <div className="w-14 h-14 mx-auto mb-5 rounded-xl bg-[#0D4B43]/10 group-hover:bg-[#D4AF6A] flex items-center justify-center transition-all duration-300">
                      <Icon className="w-6 h-6 text-[#0D4B43] group-hover:text-[#0D4B43] transition-colors" />
                    </div>
                    <h3 className="text-sm font-semibold text-stone-400 uppercase tracking-wider mb-2">{card.title}</h3>
                    <p className="text-[#0D4B43] font-semibold">{card.val}</p>
                  </motion.div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────────────────────────────── */}
      <footer className="bg-[#0D4B43] text-white pt-20 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            {/* Brand */}
            <div className="lg:col-span-1">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-11 h-11 bg-[#D4AF6A] rounded-xl flex items-center justify-center shadow-lg shadow-[#D4AF6A]/20">
                  <span className="text-[#0D4B43] font-bold text-xl">B</span>
                </div>
                <div>
                  <span className="font-bold text-xl text-white">BONYA</span>
                  <span className="block text-[10px] text-white/60 tracking-[0.2em] uppercase">Company</span>
                </div>
              </div>
              <p className="text-white/60 text-sm leading-relaxed">{t.footer.tagline}</p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-bold text-white mb-5">{t.footer.quick}</h4>
              <ul className="space-y-3">
                {t.footer.links.map((link, i) => (
                  <li key={i}>
                    <a href="#" className="text-white/60 hover:text-[#D4AF6A] transition-colors text-sm">{link}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="font-bold text-white mb-5">{t.footer.contactTitle}</h4>
              <ul className="space-y-3 text-sm text-white/60">
                <li className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-[#D4AF6A]" />
                  info@bonya.com
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-[#D4AF6A]" />
                  +966 920011074
                </li>
                <li className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#D4AF6A]" />
                  Riyadh, Saudi Arabia
                </li>
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h4 className="font-bold text-white mb-5">{t.footer.newsletter}</h4>
              <p className="text-white/60 text-sm mb-4">{t.footer.nlSub}</p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder={t.footer.nlPlaceholder}
                  className="flex-1 bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-[#D4AF6A] transition-colors"
                />
                <Button className="bg-[#D4AF6A] hover:bg-[#c9a45f] text-[#0D4B43] px-4 rounded-xl shadow-lg shadow-[#D4AF6A]/20">
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-white/50 text-sm">{t.footer.copyright}</p>
            <div className="flex gap-6 text-sm">
              <a href="#" className="text-white/50 hover:text-[#D4AF6A] transition-colors">{t.footer.privacy}</a>
              <a href="#" className="text-white/50 hover:text-[#D4AF6A] transition-colors">{t.footer.terms}</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
