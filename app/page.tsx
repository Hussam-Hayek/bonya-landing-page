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
} from 'lucide-react';
import { Button } from '@/components/ui/button';

// ─── Translations ─────────────────────────────────────────────────────────────
const translations = {
  en: {
    nav: { about: 'About', portal: 'Access Portal', contact: 'Contact', cta: 'Get Started' },
    hero: {
      badge: 'Industry Leader in Construction & Logistics',
      h1: 'Building', h2: "Tomorrow's", h3: 'Infrastructure',
      sub: 'Your trusted partner in construction materials and logistics. Delivering excellence, quality, and reliability to every project.',
      features: ['Premium Quality Materials', 'On-Time Delivery Guarantee', 'Expert Technical Support'],
      cta1: 'Get Started Today', cta2: 'Learn More',
      scroll: 'Scroll to explore',
      deliveries: 'Deliveries Monthly', onTime: 'On-Time Rate', support: 'Support',
      trust: 'Trusted by contractors, suppliers, and vendors across the region.',
    },
    about: {
      tag: 'Who We Are', title: 'About BONYA Company',
      sub: 'A legacy of excellence in construction materials and logistics, built on trust, quality, and unwavering commitment.',
      p1: 'BONYA Company is a leading provider of premium construction materials and logistics solutions, serving the construction industry with unwavering commitment to quality and excellence.',
      p2: "With decades of experience, we've built our reputation on quality, reliability, and innovation. Our state-of-the-art facilities and modern fleet ensure every delivery meets the highest standards.",
      p3: "Our mission is to be the most trusted partner in the industry — delivering not just products, but solutions that build tomorrow's infrastructure.",
      link: 'Learn more about our story',
      stats: [{ v: 25, s: '+', l: 'Years Experience' }, { v: 500, s: '+', l: 'Active Clients' }, { v: 50, s: '+', l: 'Fleet Vehicles' }],
      services: [
        { title: 'Premium Materials', desc: 'High-quality cement, concrete, and aggregates sourced from trusted suppliers.' },
        { title: 'Reliable Logistics', desc: 'Modern fleet ensuring timely, safe delivery to every construction site.' },
        { title: 'Quality Assured', desc: 'Rigorous testing and quality control for premium products every time.' },
        { title: '24/7 Support', desc: 'Round-the-clock customer support for orders and technical inquiries.' },
      ],
    },
    portal: {
      tag: 'Portals', title: 'Access Your Portal',
      sub: "Choose your portal to login or register. Whether you're a customer or a partner, we've got you covered.",
      cTitle: 'Customer Portal', cDesc: 'Browse our catalog, place orders for construction materials, track deliveries, and manage your account.',
      cLogin: 'Customer Login', cSignup: 'Customer Signup', pathA: 'Path A',
      pTitle: 'Partners Portal', pDesc: 'For Brokers & Vendors: Manage your partnerships, inventory, commissions, and business opportunities.',
      pLogin: 'Partner Login', pSignup: 'Partner Registration', pathB: 'Path B',
      note: 'For Brokers & Vendors',
    },
    contact: {
      tag: 'Get in Touch', title: 'Contact Us',
      sub: 'Get in touch with our team for inquiries, support, or partnership opportunities.',
      cards: [{ title: 'Email Address', val: 'info@dealcom.com' }, { title: 'Phone Number', val: '+1 (234) 567-890' }, { title: 'Office Location', val: 'Visit us during business hours' }],
    },
    footer: {
      tagline: 'Leading provider of premium construction materials and logistics solutions, building the infrastructure of tomorrow.',
      quick: 'Quick Links', links: ['About Us', 'Access Portal', 'Contact'],
      contactTitle: 'Contact Info', newsletter: 'Newsletter',
      nlSub: 'Stay updated with our latest news and offers.',
      nlPlaceholder: 'Your email', copyright: '© 2026 BONYA Company. All rights reserved.',
      privacy: 'Privacy Policy', terms: 'Terms of Service',
    },
  },
  ar: {
    nav: { about: 'من نحن', portal: 'بوابة الدخول', contact: 'اتصل بنا', cta: 'ابدأ الآن' },
    hero: {
      badge: 'رائد الصناعة في مواد البناء واللوجستيات',
      h1: 'بناء', h2: 'البنية التحتية', h3: 'لغدٍ أفضل',
      sub: 'شريكك الموثوق في مواد البناء والخدمات اللوجستية. نقدم التميز والجودة والموثوقية لكل مشروع.',
      features: ['مواد بناء عالية الجودة', 'ضمان التسليم في الوقت المحدد', 'دعم فني متخصص'],
      cta1: 'ابدأ اليوم', cta2: 'اعرف المزيد',
      scroll: 'انتقل للأسفل',
      deliveries: 'شحنة شهرياً', onTime: 'معدل الالتزام', support: 'دعم متواصل',
      trust: 'موثوق به من قبل المقاولين والموردين في المنطقة.',
    },
    about: {
      tag: 'من نحن', title: 'شركة بونيا',
      sub: 'إرث من التميز في مواد البناء والخدمات اللوجستية، مبني على الثقة والجودة.',
      p1: 'شركة بونيا مزود رائد لمواد البناء الفاخرة والحلول اللوجستية، تخدم قطاع البناء بالتزام راسخ بالجودة والتميز.',
      p2: 'بخبرة عقود، بنينا سمعتنا على الجودة والموثوقية والابتكار. تضمن منشآتنا الحديثة وأسطولنا المتطور أن كل شحنة تلتزم بأعلى المعايير.',
      p3: 'مهمتنا أن نكون الشريك الأكثر موثوقية في صناعة مواد البناء والخدمات اللوجستية.',
      link: 'اعرف المزيد عن قصتنا',
      stats: [{ v: 25, s: '+', l: 'سنوات خبرة' }, { v: 500, s: '+', l: 'عميل نشط' }, { v: 50, s: '+', l: 'مركبة' }],
      services: [
        { title: 'مواد متميزة', desc: 'إسمنت وخرسانة وركام عالي الجودة من موردين موثوقين.' },
        { title: 'لوجستيات موثوقة', desc: 'أسطول حديث يضمن التسليم الآمن في الوقت المناسب.' },
        { title: 'جودة مضمونة', desc: 'اختبارات صارمة وضبط جودة لمنتجات متميزة في كل مرة.' },
        { title: 'دعم ٢٤/٧', desc: 'دعم عملاء على مدار الساعة للطلبات والاستفسارات الفنية.' },
      ],
    },
    portal: {
      tag: 'البوابات', title: 'ادخل إلى بوابتك',
      sub: 'اختر بوابتك لتسجيل الدخول أو التسجيل، سواء كنت عميلاً أو شريكاً.',
      cTitle: 'بوابة العملاء', cDesc: 'تصفح كتالوجنا وقدم الطلبات وتابع الشحنات وأدر حسابك.',
      cLogin: 'دخول العملاء', cSignup: 'تسجيل عميل', pathA: 'مسار أ',
      pTitle: 'بوابة الشركاء', pDesc: 'للوسطاء والموردين: أدر شراكاتك ومخزونك وعمولاتك وفرصك التجارية.',
      pLogin: 'دخول الشركاء', pSignup: 'تسجيل شريك', pathB: 'مسار ب',
      note: 'للوسطاء والموردين',
    },
    contact: {
      tag: 'تواصل معنا', title: 'اتصل بنا',
      sub: 'تواصل مع فريقنا للاستفسارات والدعم وفرص الشراكة.',
      cards: [{ title: 'البريد الإلكتروني', val: 'info@dealcom.com' }, { title: 'رقم الهاتف', val: '+1 (234) 567-890' }, { title: 'موقع المكتب', val: 'زورنا خلال ساعات العمل' }],
    },
    footer: {
      tagline: 'مزود رائد لمواد البناء الفاخرة والحلول اللوجستية، نبني البنية التحتية لغد أفضل.',
      quick: 'روابط سريعة', links: ['من نحن', 'بوابة الدخول', 'اتصل بنا'],
      contactTitle: 'معلومات الاتصال', newsletter: 'النشرة الإخبارية',
      nlSub: 'ابق على اطلاع بآخر أخبارنا وعروضنا.',
      nlPlaceholder: 'بريدك الإلكتروني', copyright: '© 2026 شركة بونيا. جميع الحقوق محفوظة.',
      privacy: 'سياسة الخصوصية', terms: 'شروط الخدمة',
    },
  },
} as const;

type Lang = 'en' | 'ar';

// ─── Animation Variants ───────────────────────────────────────────────────────
const fadeInUp = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } };
const fadeInLeft = { hidden: { opacity: 0, x: -40 }, visible: { opacity: 1, x: 0 } };

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

// ─── Language Toggle ──────────────────────────────────────────────────────────
function LanguageToggle({ lang, setLang }: { lang: Lang; setLang: (l: Lang) => void }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <motion.button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg border border-stone-200 bg-white/80 hover:bg-stone-50 text-stone-600 text-sm font-medium transition-colors duration-200"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
      >
        <Globe className="w-4 h-4 text-emerald-700" />
        <span className="font-semibold">{lang === 'en' ? 'EN' : 'AR'}</span>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown className="w-3 h-3 text-stone-400" />
        </motion.span>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full mt-2 right-0 bg-white border border-stone-200 rounded-xl shadow-2xl overflow-hidden z-50 w-36"
          >
            {(['en', 'ar'] as Lang[]).map((l) => (
              <button
                key={l}
                onClick={() => { setLang(l); setOpen(false); }}
                className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors duration-150 ${lang === l ? 'bg-emerald-50 text-emerald-700' : 'text-stone-600 hover:bg-stone-50'}`}
              >
                <span>{l === 'en' ? '🇬🇧' : '🇸🇦'}</span>
                {l === 'en' ? 'English' : 'العربية'}
                {lang === l && <CheckCircle2 className="w-3.5 h-3.5 ml-auto text-emerald-600" />}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Service / Contact icon/gradient maps ─────────────────────────────────────
const SERVICE_ICONS = [Package, Truck, ShieldCheck, Headphones];
const SERVICE_GRADIENTS = ['from-slate-600 to-slate-800', 'from-emerald-600 to-emerald-800', 'from-teal-600 to-teal-800', 'from-slate-500 to-slate-700'];
const CONTACT_ICONS = [Mail, Phone, MapPin];
const CONTACT_GRADIENTS = ['from-slate-600 to-slate-800', 'from-emerald-600 to-emerald-800', 'from-teal-600 to-teal-800'];
const STAT_ICONS = [Building2, Users, Truck];

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function BonyaLanding() {
  const [lang, setLang] = useState<Lang>('en');
  const t = translations[lang];
  const isAr = lang === 'ar';

  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroImageY = useTransform(scrollYProgress, [0, 1], ['0%', '28%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

  return (
    <div className={`min-h-screen bg-stone-50 overflow-x-hidden`} dir={isAr ? 'rtl' : 'ltr'}>

      {/* ── Navbar ───────────────────────────────────────────────────────────── */}
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="fixed w-full top-0 z-50 bg-white/88 backdrop-blur-2xl border-b border-stone-200/70 shadow-sm"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex justify-between items-center gap-4">
          {/* Logo */}
          <motion.div className="flex items-center gap-3 cursor-pointer flex-shrink-0" whileHover={{ scale: 1.02 }} transition={{ type: 'spring', stiffness: 400 }}>
            <div className="w-9 h-9 bg-gradient-to-br from-emerald-700 to-slate-800 rounded-lg shadow-md flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold text-sm tracking-tight">B</span>
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-bold text-lg tracking-tight text-slate-900">BONYA</span>
              <span className="text-[9px] text-stone-400 tracking-[0.2em] uppercase">Company</span>
            </div>
          </motion.div>

          {/* Nav Links */}
          <nav className="hidden md:flex items-center gap-1 flex-1 justify-center">
            {[
              { label: t.nav.about, href: '#about' },
              { label: t.nav.portal, href: '#access-portal' },
              { label: t.nav.contact, href: '#contact' },
            ].map((item, i) => (
              <motion.a
                key={item.label}
                href={item.href}
                className="px-4 py-2 text-sm font-medium text-stone-600 hover:text-emerald-800 transition-colors rounded-lg hover:bg-stone-100"
                initial={{ opacity: 0, y: -16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 * i + 0.25 }}
              >
                {item.label}
              </motion.a>
            ))}
          </nav>

          {/* Right */}
          <motion.div className="flex items-center gap-3 flex-shrink-0" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}>
            <LanguageToggle lang={lang} setLang={setLang} />
            <Button className="hidden sm:flex bg-gradient-to-r from-emerald-700 via-emerald-800 to-slate-800 hover:from-emerald-800 hover:to-slate-900 text-white font-semibold px-5 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 text-sm">
              {t.nav.cta}
            </Button>
          </motion.div>
        </div>
      </motion.header>

      {/* ── Hero ─────────────────────────────────────────────────────────────── */}
      <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden">
        {/* Parallax Background */}
        <motion.div className="absolute inset-0" style={{ y: heroImageY, scale: heroScale }}>
          <Image
            src="/hero-bg.jpg"
            alt="BONYA Construction Facility"
            fill
            className="object-cover"
            priority
          />
          {/* Cinematic overlays */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/93 via-slate-900/72 to-slate-800/35" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/55 via-transparent to-slate-900/20" />
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-950/25 via-transparent to-transparent" />
        </motion.div>

        {/* Subtle grid texture */}
        <div
          className="absolute inset-0 opacity-[0.035] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)`,
            backgroundSize: '72px 72px',
          }}
        />

        <motion.div style={{ opacity: heroOpacity }} className="relative z-10 w-full">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 lg:pt-40 lg:pb-28">
            <div className="grid lg:grid-cols-2 gap-16 items-center">

              {/* Left */}
              <div className="text-white">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  className="inline-flex items-center gap-2.5 mb-9"
                >
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                  </span>
                  <span className="bg-white/8 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/12 text-sm font-medium text-stone-200 tracking-wide">
                    {t.hero.badge}
                  </span>
                </motion.div>

                <motion.h1
                  className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.08] mb-8 text-balance"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                >
                  {t.hero.h1}
                  <br />
                  <span className="relative inline-block">
                    {t.hero.h2}
                    <motion.span
                      className="absolute -bottom-1 left-0 h-[3px] bg-gradient-to-r from-emerald-400 via-teal-400 to-transparent rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: '100%' }}
                      transition={{ delay: 1.1, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                    />
                  </span>
                  <br />
                  <span className="bg-gradient-to-r from-emerald-300 via-teal-300 to-slate-200 bg-clip-text text-transparent">
                    {t.hero.h3}
                  </span>
                </motion.h1>

                <motion.p
                  className="text-lg lg:text-xl text-stone-300 mb-10 leading-relaxed max-w-lg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                >
                  {t.hero.sub}
                </motion.p>

                <motion.div className="space-y-3.5 mb-11" variants={staggerContainer} initial="hidden" animate="visible">
                  {t.hero.features.map((feature, i) => (
                    <motion.div key={feature} className="flex items-center gap-3" variants={fadeInLeft} transition={{ delay: 0.6 + i * 0.1 }}>
                      <div className="w-5 h-5 rounded-full bg-emerald-500/15 border border-emerald-400/25 flex items-center justify-center flex-shrink-0">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      </div>
                      <span className="text-stone-200 text-sm font-medium">{feature}</span>
                    </motion.div>
                  ))}
                </motion.div>

                <motion.div
                  className="flex flex-wrap gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9, duration: 0.6 }}
                >
                  <Button className="group bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-700 hover:from-emerald-600 hover:to-slate-700 text-white font-semibold px-8 py-6 text-base rounded-xl shadow-lg shadow-emerald-600/25 hover:shadow-xl transition-all duration-300 border border-emerald-400/15">
                    {t.hero.cta1}
                    <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                  <Button variant="outline" className="bg-white/5 backdrop-blur-sm border-white/20 text-white hover:bg-white/10 hover:border-white/30 font-semibold px-8 py-6 text-base rounded-xl transition-all duration-300">
                    {t.hero.cta2}
                  </Button>
                </motion.div>
              </div>

              {/* Right – Stats Card */}
              <motion.div
                className="hidden lg:block"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.65, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="relative">
                  <motion.div
                    className="bg-white/7 backdrop-blur-2xl rounded-3xl p-9 border border-white/12 shadow-2xl shadow-slate-950/60"
                    whileHover={{ y: -6 }}
                    transition={{ type: 'spring', stiffness: 280 }}
                  >
                    <div className="flex items-start gap-5 mb-7">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center shadow-lg shadow-emerald-500/30 flex-shrink-0">
                        <Truck className="w-7 h-7 text-white" />
                      </div>
                      <div>
                        <p className="text-5xl font-bold text-white mb-1 tabular-nums">5000+</p>
                        <p className="text-stone-300 text-sm font-medium">{t.hero.deliveries}</p>
                      </div>
                    </div>
                    <div className="h-px bg-gradient-to-r from-transparent via-white/12 to-transparent mb-7" />
                    <p className="text-stone-300 text-sm leading-relaxed mb-7">{t.hero.trust}</p>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white/5 border border-white/8 rounded-2xl p-4">
                        <p className="text-2xl font-bold text-emerald-300 mb-1">98%</p>
                        <p className="text-xs text-stone-400">{t.hero.onTime}</p>
                      </div>
                      <div className="bg-white/5 border border-white/8 rounded-2xl p-4">
                        <p className="text-2xl font-bold text-teal-300 mb-1">24/7</p>
                        <p className="text-xs text-stone-400">{t.hero.support}</p>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    className="absolute -top-5 -right-5 bg-gradient-to-br from-emerald-600 to-slate-800 rounded-2xl p-4 shadow-2xl border border-emerald-500/20"
                    initial={{ scale: 0, rotate: -12 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 1.3, type: 'spring', stiffness: 180 }}
                  >
                    <ShieldCheck className="w-8 h-8 text-emerald-300" />
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
        >
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }} className="flex flex-col items-center gap-2">
            <span className="text-white/35 text-[11px] font-medium tracking-widest uppercase">{t.hero.scroll}</span>
            <div className="w-5 h-9 rounded-full border border-white/20 flex items-start justify-center pt-2">
              <motion.div animate={{ y: [0, 12, 0] }} transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }} className="w-1 h-1.5 bg-white/40 rounded-full" />
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ── About ─────────────────────────────────────────────────────────────── */}
      <section id="about" className="py-28 lg:py-36 bg-white relative overflow-hidden">
        <div
          className="absolute top-0 right-0 w-1/3 h-full opacity-[0.03] pointer-events-none"
          style={{ backgroundImage: `radial-gradient(circle, #0D4B43 1px, transparent 0)`, backgroundSize: '32px 32px' }}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <AnimatedSection>
            <div className="text-center mb-20">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 text-emerald-700 text-xs font-semibold rounded-full mb-5 tracking-widest uppercase">
                {t.about.tag}
              </span>
              <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-5 text-balance">{t.about.title}</h2>
              <div className="w-16 h-px bg-gradient-to-r from-transparent via-emerald-600 to-transparent mx-auto mb-6" />
              <p className="text-stone-500 text-lg max-w-2xl mx-auto leading-relaxed">{t.about.sub}</p>
            </div>
          </AnimatedSection>

          <div className="grid lg:grid-cols-2 gap-20 items-center mb-24">
            <AnimatedSection>
              <div className="space-y-5">
                <p className="text-slate-700 text-lg leading-relaxed">{t.about.p1}</p>
                <p className="text-stone-600 leading-relaxed">{t.about.p2}</p>
                <p className="text-stone-600 leading-relaxed">{t.about.p3}</p>
                <motion.div
                  className="inline-flex items-center gap-2 text-emerald-700 font-semibold cursor-pointer text-sm group pt-2"
                  whileHover={{ x: isAr ? -5 : 5 }}
                >
                  {t.about.link}
                  <ArrowRight className={`w-4 h-4 group-hover:translate-x-1 transition-transform ${isAr ? 'rotate-180' : ''}`} />
                </motion.div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.15}>
              <div className="grid grid-cols-3 gap-5">
                {t.about.stats.map((stat, i) => {
                  const Icon = STAT_ICONS[i];
                  return (
                    <motion.div
                      key={stat.l}
                      className="group relative bg-gradient-to-br from-slate-50 to-stone-100 rounded-2xl p-6 text-center border border-stone-200 hover:border-emerald-300 transition-all duration-300 hover:shadow-xl overflow-hidden"
                      whileHover={{ y: -6 }}
                      initial={{ opacity: 0, y: 24 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/0 to-teal-600/0 group-hover:from-emerald-600/3 group-hover:to-teal-600/4 transition-all duration-500" />
                      <div className="relative">
                        <div className="w-11 h-11 mx-auto mb-4 rounded-xl bg-slate-100 border border-stone-200 flex items-center justify-center group-hover:bg-emerald-700 group-hover:border-emerald-700 transition-all duration-300">
                          <Icon className="w-5 h-5 text-slate-500 group-hover:text-white transition-colors duration-300" />
                        </div>
                        <p className="text-3xl font-bold text-slate-800 mb-1">{stat.v}{stat.s}</p>
                        <p className="text-xs text-stone-500 font-medium">{stat.l}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </AnimatedSection>
          </div>

          {/* Service Cards */}
          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
          >
            {t.about.services.map((service, i) => {
              const Icon = SERVICE_ICONS[i];
              return (
                <motion.div
                  key={service.title}
                  className="group relative bg-white rounded-2xl p-8 border border-stone-200 hover:border-slate-300 shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden"
                  variants={fadeInUp}
                  whileHover={{ y: -8 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-50/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className={`relative w-12 h-12 rounded-xl bg-gradient-to-br ${SERVICE_GRADIENTS[i]} flex items-center justify-center mb-6 shadow-md group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="relative text-lg font-bold text-slate-800 mb-3">{service.title}</h3>
                  <p className="relative text-stone-500 text-sm leading-relaxed">{service.desc}</p>
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-emerald-500 via-teal-500 to-slate-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ── Portal ─────────────────────────────────────────────────────────────── */}
      <section id="access-portal" className="py-28 lg:py-36 bg-gradient-to-b from-slate-50 to-stone-100 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-32 -right-32 w-72 h-72 bg-emerald-200/15 rounded-full blur-3xl" />
          <div className="absolute -bottom-32 -left-32 w-72 h-72 bg-slate-300/15 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <AnimatedSection>
            <div className="text-center mb-16">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 text-emerald-700 text-xs font-semibold rounded-full mb-5 tracking-widest uppercase">
                {t.portal.tag}
              </span>
              <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-5">{t.portal.title}</h2>
              <div className="w-16 h-px bg-gradient-to-r from-transparent via-emerald-600 to-transparent mx-auto mb-6" />
              <p className="text-stone-500 text-lg max-w-2xl mx-auto leading-relaxed">{t.portal.sub}</p>
            </div>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Customer */}
            <motion.div
              className="group relative bg-white rounded-3xl p-10 border border-stone-200 shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              whileHover={{ y: -6 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative">
                <div className="flex items-center justify-between mb-7">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-600 to-slate-800 flex items-center justify-center shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform duration-300">
                    <Users className="w-7 h-7 text-white" />
                  </div>
                  <span className="px-3 py-1 bg-slate-100 text-slate-600 text-xs font-bold rounded-full tracking-widest uppercase">{t.portal.pathA}</span>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">{t.portal.cTitle}</h3>
                <p className="text-stone-500 mb-9 leading-relaxed text-sm">{t.portal.cDesc}</p>
                <div className="space-y-3">
                  <Button className="w-full bg-gradient-to-r from-emerald-700 via-emerald-800 to-slate-800 hover:from-emerald-800 hover:to-slate-900 text-white font-semibold py-6 rounded-xl shadow-lg shadow-emerald-700/15 hover:shadow-xl transition-all duration-300 group/btn">
                    {t.portal.cLogin}
                    <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                  <Button variant="outline" className="w-full border-2 border-stone-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300 font-semibold py-6 rounded-xl transition-all duration-300 text-sm">
                    {t.portal.cSignup}
                  </Button>
                </div>
              </div>
            </motion.div>

            {/* Partner */}
            <motion.div
              className="group relative bg-white rounded-3xl p-10 border border-stone-200 shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              whileHover={{ y: -6 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-slate-50/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative">
                <div className="flex items-center justify-between mb-7">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-slate-600 to-slate-900 flex items-center justify-center shadow-lg shadow-slate-500/20 group-hover:scale-105 transition-transform duration-300">
                    <Building2 className="w-7 h-7 text-white" />
                  </div>
                  <span className="px-3 py-1 bg-slate-100 text-slate-600 text-xs font-bold rounded-full tracking-widest uppercase">{t.portal.pathB}</span>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">{t.portal.pTitle}</h3>
                <p className="text-stone-500 mb-9 leading-relaxed text-sm">{t.portal.pDesc}</p>
                <div className="space-y-3">
                  <Button className="w-full bg-gradient-to-r from-slate-700 via-slate-800 to-slate-900 hover:from-slate-800 hover:to-slate-950 text-white font-semibold py-6 rounded-xl shadow-lg shadow-slate-700/15 hover:shadow-xl transition-all duration-300 group/btn">
                    {t.portal.pLogin}
                    <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                  <Button variant="outline" className="w-full border-2 border-stone-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300 font-semibold py-6 rounded-xl transition-all duration-300 text-sm">
                    {t.portal.pSignup}
                  </Button>
                </div>
                <p className="text-center text-stone-400 text-xs mt-5">{t.portal.note}</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Contact ─────────────────────────────────────────────────────────────── */}
      <section id="contact" className="py-28 lg:py-36 bg-white relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.025] pointer-events-none"
          style={{ backgroundImage: `radial-gradient(circle, #334155 1px, transparent 0)`, backgroundSize: '32px 32px' }}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <AnimatedSection>
            <div className="text-center mb-16">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 text-emerald-700 text-xs font-semibold rounded-full mb-5 tracking-widest uppercase">
                {t.contact.tag}
              </span>
              <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-5">{t.contact.title}</h2>
              <div className="w-16 h-px bg-gradient-to-r from-transparent via-emerald-600 to-transparent mx-auto mb-6" />
              <p className="text-stone-500 text-lg max-w-2xl mx-auto leading-relaxed">{t.contact.sub}</p>
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
                  className="group text-center p-9 rounded-2xl bg-gradient-to-br from-slate-50 to-stone-50 hover:bg-white border border-stone-200 hover:border-slate-300 hover:shadow-2xl transition-all duration-500"
                  variants={fadeInUp}
                  whileHover={{ y: -7 }}
                >
                  <div className={`w-14 h-14 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${CONTACT_GRADIENTS[i]} flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-base font-bold text-slate-800 mb-2">{card.title}</h3>
                  <p className="text-stone-500 text-sm">{card.val}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ── Footer ────────────────────────────────────────────────────────────── */}
      <footer className="bg-gradient-to-b from-slate-900 to-slate-950 text-white py-16 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.035] pointer-events-none"
          style={{ backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.7) 1px, transparent 0)`, backgroundSize: '40px 40px' }}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid md:grid-cols-4 gap-12 mb-12 pb-12 border-b border-slate-800">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-9 h-9 bg-gradient-to-br from-emerald-600 to-slate-700 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-sm">B</span>
                </div>
                <div>
                  <span className="font-bold text-lg">BONYA</span>
                  <p className="text-slate-400 text-[9px] tracking-[0.2em] uppercase">Company</p>
                </div>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed">{t.footer.tagline}</p>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
              <h4 className="font-semibold text-white text-sm mb-6 tracking-wide">{t.footer.quick}</h4>
              <ul className="space-y-3">
                {t.footer.links.map((link, i) => {
                  const hrefs = ['#about', '#access-portal', '#contact'];
                  return (
                    <li key={link}>
                      <a href={hrefs[i]} className="text-slate-400 hover:text-white hover:translate-x-1 inline-flex transition-all duration-300 text-sm">
                        {link}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
              <h4 className="font-semibold text-white text-sm mb-6 tracking-wide">{t.footer.contactTitle}</h4>
              <ul className="space-y-3 text-slate-400 text-sm">
                <li className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  info@dealcom.com
                </li>
                <li className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  +1 (234) 567-890
                </li>
              </ul>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}>
              <h4 className="font-semibold text-white text-sm mb-6 tracking-wide">{t.footer.newsletter}</h4>
              <p className="text-slate-400 text-sm mb-4 leading-relaxed">{t.footer.nlSub}</p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder={t.footer.nlPlaceholder}
                  className="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
                />
                <Button className="bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-slate-700 text-white font-semibold px-4 rounded-lg shadow-lg transition-all duration-300">
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </motion.div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-500 text-sm">{t.footer.copyright}</p>
            <div className="flex gap-6 text-sm">
              <a href="#" className="text-slate-500 hover:text-white transition-colors">{t.footer.privacy}</a>
              <a href="#" className="text-slate-500 hover:text-white transition-colors">{t.footer.terms}</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
