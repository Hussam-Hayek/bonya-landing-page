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
  CheckCircle2,
  Building2,
  Users,
  Globe,
  ChevronDown,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

// ─── Translations ─────────────────────────────────────────────────────────────
const translations = {
  en: {
    topBar: { phone: '920011074', email: 'info@bonya.com' },
    nav: { home: 'Home', about: 'About Us', services: 'Services', portal: 'Portal', contact: 'Contact Us', cta: 'Get Started' },
    hero: {
      badge: 'Industry Leader in Construction & Logistics',
      h1: 'Building',
      h2: "Tomorrow's",
      h3: 'Infrastructure',
      sub: 'Your trusted partner in construction materials and logistics. Delivering excellence, quality, and reliability to every project.',
      features: ['Premium Quality Materials', 'On-Time Delivery Guarantee', 'Expert Technical Support'],
      cta1: 'Get Started Today',
      cta2: 'Learn More',
      trust: 'Trusted by contractors, suppliers, and vendors across the region.',
      deliveries: 'Deliveries Monthly',
      onTime: 'On-Time Rate',
      support: 'Support',
    },
    stats: [
      { value: '25', suffix: '+', label: 'Years Experience' },
      { value: '500', suffix: '+', label: 'Active Clients' },
      { value: '50', suffix: '+', label: 'Fleet Vehicles' },
      { value: '5', suffix: '', label: 'Regions Served' },
    ],
    about: {
      tag: 'Who We Are',
      title: 'About BONYA Company',
      sub: 'A legacy of excellence in construction materials and logistics, built on trust, quality, and unwavering commitment.',
      p1: 'BONYA Company is a leading provider of premium construction materials and logistics solutions, serving the construction industry with unwavering commitment to quality and excellence.',
      p2: "With decades of experience, we've built our reputation on quality, reliability, and innovation. Our state-of-the-art facilities and modern fleet ensure every delivery meets the highest standards.",
      p3: "Our mission is to be the most trusted partner in the industry — delivering not just products, but solutions that build tomorrow's infrastructure.",
      link: 'Learn more about our story',
    },
    vision: {
      num: '01',
      title: 'Vision',
      desc: 'To emerge as a major player in the Construction Materials segment, distinguished by our fast services and commitment to excellence in practices and values that foster human potential.',
    },
    mission: {
      num: '02',
      title: 'Mission',
      desc: 'Is to supply all types of construction materials to ready-mix factories and projects across KSA. We also aim to deliver state-of-the-art technical solutions to our customers on scientific foundations.',
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
      tag: 'Portals',
      title: 'Access Your Portal',
      sub: "Choose your portal to login or register. Whether you're a customer or a partner, we've got you covered.",
      cTitle: 'Customer Portal',
      cDesc: 'Browse our catalog, place orders for construction materials, track deliveries, and manage your account.',
      cLogin: 'Customer Login',
      cSignup: 'Customer Signup',
      pathA: 'Path A',
      pTitle: 'Partners Portal',
      pDesc: 'For Brokers & Vendors: Manage your partnerships, inventory, commissions, and business opportunities.',
      pLogin: 'Partner Login',
      pSignup: 'Partner Registration',
      pathB: 'Path B',
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
    nav: { home: 'الرئيسية', about: 'من نحن', services: 'خدماتنا', portal: 'البوابة', contact: 'اتصل بنا', cta: 'ابدأ الآن' },
    hero: {
      badge: 'رائد الصناعة في مواد البناء واللوجستيات',
      h1: 'بناء',
      h2: 'البنية التحتية',
      h3: 'لغدٍ أفضل',
      sub: 'شريكك الموثوق في مواد البناء والخدمات اللوجستية. نقدم التميز والجودة والموثوقية لكل مشروع.',
      features: ['مواد بناء عالية الجودة', 'ضمان التسليم في الوقت المحدد', 'دعم فني متخصص'],
      cta1: 'ابدأ اليوم',
      cta2: 'اعرف المزيد',
      trust: 'موثوق به من قبل المقاولين والموردين في المنطقة.',
      deliveries: 'شحنة شهرياً',
      onTime: 'معدل الالتزام',
      support: 'دعم متواصل',
    },
    stats: [
      { value: '25', suffix: '+', label: 'سنوات خبرة' },
      { value: '500', suffix: '+', label: 'عميل نشط' },
      { value: '50', suffix: '+', label: 'مركبة' },
      { value: '5', suffix: '', label: 'مناطق' },
    ],
    about: {
      tag: 'من نحن',
      title: 'شركة بونيا',
      sub: 'إرث من التميز في مواد البناء والخدمات اللوجستية، مبني على الثقة والجودة.',
      p1: 'شركة بونيا مزود رائد لمواد البناء الفاخرة والحلول اللوجستية، تخدم قطاع البناء بالتزام راسخ بالجودة والتميز.',
      p2: 'بخبرة عقود، بنينا سمعتنا على الجودة والموثوقية والابتكار. تضمن منشآتنا الحديثة وأسطولنا المتطور أن كل شحنة تلتزم بأعلى المعايير.',
      p3: 'مهمتنا أن نكون الشريك الأكثر موثوقية في صناعة مواد البناء والخدمات اللوجستية.',
      link: 'اعرف المزيد عن قصتنا',
    },
    vision: {
      num: '01',
      title: 'الرؤية',
      desc: 'أن نكون لاعباً رئيسياً في قطاع مواد البناء، متميزين بخدماتنا السريعة والتزامنا بالتميز في الممارسات والقيم التي تعزز الإمكانات البشرية.',
    },
    mission: {
      num: '02',
      title: 'المهمة',
      desc: 'توريد جميع أنواع مواد البناء لمصانع الخرسانة الجاهزة والمشاريع في المملكة. نهدف أيضاً لتقديم حلول تقنية متطورة لعملائنا على أسس علمية.',
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
      tag: 'البوابات',
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
const fadeInUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };
const fadeInLeft = { hidden: { opacity: 0, x: -30 }, visible: { opacity: 1, x: 0 } };
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

// ─── AnimatedSection ──────────────────────────────────────────────────────────
function AnimatedSection({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div ref={ref} initial="hidden" animate={isInView ? 'visible' : 'hidden'} variants={fadeInUp} transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }} className={className}>
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
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {numValue}
          </motion.span>
          {suffix && <span className="text-[#D4AF6A]">{suffix}</span>}
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
    <div className="flex items-center gap-1">
      {(['en', 'ar'] as Lang[]).map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          className={`px-3 py-1 text-xs font-semibold rounded transition-all duration-200 ${
            lang === l
              ? 'bg-white text-[#0D4B43]'
              : 'text-white/80 hover:text-white'
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
const STAT_ICONS = [Building2, Users, Truck, Globe];

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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex justify-between items-center text-xs">
          <div className="flex items-center gap-5">
            <a href="tel:920011074" className="flex items-center gap-1.5 hover:text-white/80 transition-colors">
              <Phone className="w-3 h-3" />
              <span>{t.topBar.phone}</span>
            </a>
            <a href="mailto:info@bonya.com" className="hidden sm:flex items-center gap-1.5 hover:text-white/80 transition-colors">
              <Mail className="w-3 h-3" />
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
        className="sticky top-0 z-50 bg-white/98 backdrop-blur-md border-b border-stone-200/50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center gap-4">
          {/* Logo */}
          <motion.div className="flex items-center gap-2.5 cursor-pointer flex-shrink-0" whileHover={{ scale: 1.02 }} transition={{ type: 'spring', stiffness: 400 }}>
            <div className="w-10 h-10 bg-gradient-to-br from-[#0D4B43] to-[#0a3d36] rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold text-lg">B</span>
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-bold text-lg tracking-tight text-[#0D4B43]">BONYA</span>
              <span className="text-[8px] text-stone-400 tracking-[0.15em] uppercase">Company</span>
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
                className="relative text-sm font-medium text-stone-600 hover:text-[#0D4B43] transition-colors py-1.5 group"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * i + 0.2 }}
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#0D4B43] group-hover:w-full transition-all duration-300" />
              </motion.a>
            ))}
          </nav>

          {/* CTA Button */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
            <Button className="hidden sm:flex bg-[#0D4B43] hover:bg-[#0a3d36] text-white font-semibold px-5 py-2.5 rounded-lg transition-all duration-300 text-sm">
              {t.nav.cta}
            </Button>
          </motion.div>
        </div>
      </motion.header>

      {/* ── Hero ─────────────────────────────────────────────────────────────── */}
      <section ref={heroRef} className="relative min-h-[85vh] flex items-center overflow-hidden">
        {/* Background */}
        <motion.div className="absolute inset-0" style={{ scale: heroScale }}>
          <Image
            src="/hero-bg.jpg"
            alt="BONYA Construction Facility"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-900/70 to-slate-800/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-slate-900/20" />
          <div className="absolute inset-0 bg-gradient-to-br from-[#0D4B43]/30 via-transparent to-transparent" />
        </motion.div>

        <motion.div style={{ opacity: heroOpacity }} className="relative z-10 w-full">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left */}
              <div className="text-white">
                {/* Badge */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  className="inline-flex items-center gap-2 mb-6"
                >
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D4AF6A] opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#D4AF6A]" />
                  </span>
                  <span className="bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full border border-white/10 text-xs font-medium text-stone-200 tracking-wide">
                    {t.hero.badge}
                  </span>
                </motion.div>

                {/* Headline */}
                <motion.h1
                  className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] mb-6"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                >
                  {t.hero.h1}
                  <br />
                  <span className="relative inline-block">
                    {t.hero.h2}
                    <motion.span
                      className="absolute -bottom-1 left-0 h-[3px] bg-[#D4AF6A] rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: '100%' }}
                      transition={{ delay: 1.1, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                    />
                  </span>
                  <br />
                  <span className="text-[#D4AF6A]">{t.hero.h3}</span>
                </motion.h1>

                {/* Description */}
                <motion.p
                  className="text-base lg:text-lg text-stone-300 mb-6 leading-relaxed max-w-lg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                >
                  {t.hero.sub}
                </motion.p>

                {/* Features */}
                <motion.div className="space-y-2.5 mb-8" variants={staggerContainer} initial="hidden" animate="visible">
                  {t.hero.features.map((feature, i) => (
                    <motion.div key={feature} className="flex items-center gap-2.5" variants={fadeInLeft} transition={{ delay: 0.6 + i * 0.1 }}>
                      <div className="w-5 h-5 rounded-full bg-[#0D4B43]/30 border border-[#0D4B43]/40 flex items-center justify-center flex-shrink-0">
                        <CheckCircle2 className="w-3 h-3 text-[#D4AF6A]" />
                      </div>
                      <span className="text-stone-200 text-sm">{feature}</span>
                    </motion.div>
                  ))}
                </motion.div>

                {/* CTAs */}
                <motion.div
                  className="flex flex-wrap items-center gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9, duration: 0.6 }}
                >
                  <Button className="group bg-[#0D4B43] text-white hover:bg-[#0a3d36] font-semibold px-6 py-5 text-sm rounded-lg transition-all duration-300 border border-[#0D4B43]">
                    {t.hero.cta1}
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                  <Button variant="outline" className="bg-white/5 backdrop-blur-sm border-white/20 text-white hover:bg-white/10 font-semibold px-6 py-5 text-sm rounded-lg transition-all duration-300">
                    {t.hero.cta2}
                  </Button>
                </motion.div>

                {/* Trust Line */}
                <motion.p
                  className="mt-6 text-xs text-stone-400"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.2, duration: 0.6 }}
                >
                  {t.hero.trust}
                </motion.p>
              </div>

              {/* Right - Stats Card */}
              <motion.div
                className="hidden lg:block"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
              >
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-white/5 rounded-xl">
                      <div className="text-3xl font-bold text-white mb-1">500<span className="text-[#D4AF6A]">+</span></div>
                      <div className="text-xs text-stone-400">{t.hero.deliveries}</div>
                    </div>
                    <div className="text-center p-4 bg-white/5 rounded-xl">
                      <div className="text-3xl font-bold text-white mb-1">98<span className="text-[#D4AF6A]">%</span></div>
                      <div className="text-xs text-stone-400">{t.hero.onTime}</div>
                    </div>
                    <div className="col-span-2 text-center p-4 bg-[#0D4B43]/40 rounded-xl border border-[#0D4B43]/30">
                      <div className="text-3xl font-bold text-white mb-1">24/7</div>
                      <div className="text-xs text-stone-400">{t.hero.support}</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── Stats Strip ──────────────────────────────────────────────────────── */}
      <section className="bg-white border-y border-stone-200">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4">
            {t.stats.map((stat, i) => {
              const Icon = STAT_ICONS[i];
              return (
                <AnimatedSection
                  key={i}
                  delay={i * 0.1}
                  className={`flex items-center gap-4 p-6 lg:p-8 ${i < 3 ? 'border-r border-stone-200' : ''}`}
                >
                  <div className="w-10 h-10 rounded-lg bg-[#0D4B43]/5 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-[#0D4B43]" />
                  </div>
                  <div>
                    <div className="text-2xl lg:text-3xl font-bold text-[#0D4B43]">
                      <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                    </div>
                    <div className="text-xs text-stone-500 uppercase tracking-wide">{stat.label}</div>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── About Section ────────────────────────────────────────────────────── */}
      <section id="about" className="py-16 lg:py-20 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 items-start">
            {/* Left - Image */}
            <AnimatedSection className="relative">
              <div className="aspect-[4/3] relative rounded-xl overflow-hidden">
                <Image
                  src="/hero-bg.jpg"
                  alt="BONYA Operations"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D4B43]/80 via-[#0D4B43]/20 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-white/95 backdrop-blur-sm rounded-lg p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[#0D4B43] rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold">B</span>
                      </div>
                      <div>
                        <div className="font-bold text-[#0D4B43]">BONYA</div>
                        <div className="text-xs text-stone-500">Since 2019</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            {/* Right - Content */}
            <div>
              <AnimatedSection>
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-8 h-[2px] bg-[#0D4B43]" />
                  <span className="text-[#0D4B43] text-sm font-semibold tracking-wide uppercase">{t.about.tag}</span>
                </div>
                <h2 className="text-3xl lg:text-4xl font-bold text-[#0D4B43] mb-4 leading-tight">{t.about.title}</h2>
                <p className="text-stone-500 mb-4 text-sm">{t.about.sub}</p>
              </AnimatedSection>
              
              <AnimatedSection delay={0.1}>
                <p className="text-stone-600 leading-relaxed mb-3">{t.about.p1}</p>
                <p className="text-stone-600 leading-relaxed mb-3">{t.about.p2}</p>
                <p className="text-stone-600 leading-relaxed mb-5">{t.about.p3}</p>
                <a href="#" className="inline-flex items-center gap-2 text-[#0D4B43] font-semibold hover:gap-3 transition-all text-sm">
                  {t.about.link}
                  <ArrowRight className="w-4 h-4" />
                </a>
              </AnimatedSection>
            </div>
          </div>

          {/* Vision & Mission Cards */}
          <div className="grid md:grid-cols-2 gap-5 mt-12">
            {/* Vision */}
            <AnimatedSection delay={0.2} className="bg-white rounded-xl p-6 border border-stone-200 relative overflow-hidden group hover:border-[#0D4B43]/20 transition-colors">
              <span className="absolute top-4 right-4 text-6xl font-bold text-stone-100 group-hover:text-[#0D4B43]/5 transition-colors">{t.vision.num}</span>
              <div className="relative">
                <h3 className="text-xl font-bold text-[#0D4B43] mb-3">{t.vision.title}</h3>
                <p className="text-stone-600 text-sm leading-relaxed">{t.vision.desc}</p>
              </div>
            </AnimatedSection>

            {/* Mission */}
            <AnimatedSection delay={0.3} className="bg-white rounded-xl p-6 border border-stone-200 relative overflow-hidden group hover:border-[#0D4B43]/20 transition-colors">
              <span className="absolute top-4 right-4 text-6xl font-bold text-stone-100 group-hover:text-[#0D4B43]/5 transition-colors">{t.mission.num}</span>
              <div className="relative">
                <h3 className="text-xl font-bold text-[#0D4B43] mb-3">{t.mission.title}</h3>
                <p className="text-stone-600 text-sm leading-relaxed">{t.mission.desc}</p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ── Services Section ─────────────────────────────────────────────────── */}
      <section id="services" className="py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-10">
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="w-8 h-[2px] bg-[#0D4B43]" />
              <span className="text-[#0D4B43] text-sm font-semibold tracking-wide uppercase">{t.services.tag}</span>
              <span className="w-8 h-[2px] bg-[#0D4B43]" />
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-[#0D4B43] mb-3">{t.services.title}</h2>
            <p className="text-stone-500 max-w-xl mx-auto">{t.services.sub}</p>
          </AnimatedSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {t.services.items.map((service, i) => {
              const Icon = SERVICE_ICONS[i];
              return (
                <AnimatedSection key={i} delay={i * 0.1} className="group">
                  <div className="bg-stone-50 rounded-xl p-5 h-full border border-stone-200 hover:border-[#0D4B43]/30 hover:bg-[#0D4B43] transition-all duration-300">
                    <div className="w-11 h-11 bg-[#0D4B43] group-hover:bg-white rounded-lg flex items-center justify-center mb-4 transition-colors">
                      <Icon className="w-5 h-5 text-white group-hover:text-[#0D4B43] transition-colors" />
                    </div>
                    <h3 className="text-lg font-bold text-[#0D4B43] group-hover:text-white mb-2 transition-colors">{service.title}</h3>
                    <p className="text-stone-500 group-hover:text-white/80 text-sm leading-relaxed transition-colors">{service.desc}</p>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Portal Section ────────────────────────────────────────────────────── */}
      <section id="access-portal" className="py-16 lg:py-20 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-10">
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="w-8 h-[2px] bg-[#0D4B43]" />
              <span className="text-[#0D4B43] text-sm font-semibold tracking-wide uppercase">{t.portal.tag}</span>
              <span className="w-8 h-[2px] bg-[#0D4B43]" />
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-[#0D4B43] mb-3">{t.portal.title}</h2>
            <p className="text-stone-500 max-w-xl mx-auto">{t.portal.sub}</p>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* Customer Portal */}
            <AnimatedSection delay={0.1}>
              <div className="bg-white rounded-xl p-6 border border-stone-200 hover:shadow-lg hover:border-[#0D4B43]/20 transition-all duration-300 h-full">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-[#0D4B43] rounded-lg flex items-center justify-center">
                    <Users className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-xs font-semibold text-[#0D4B43] bg-[#0D4B43]/10 px-2 py-1 rounded">{t.portal.pathA}</span>
                </div>
                <h3 className="text-xl font-bold text-[#0D4B43] mb-2">{t.portal.cTitle}</h3>
                <p className="text-stone-500 text-sm mb-5">{t.portal.cDesc}</p>
                <div className="flex gap-3">
                  <Button className="flex-1 bg-[#0D4B43] hover:bg-[#0a3d36] text-white text-sm py-2.5">
                    {t.portal.cLogin}
                  </Button>
                  <Button variant="outline" className="flex-1 border-[#0D4B43]/30 text-[#0D4B43] hover:bg-[#0D4B43]/5 text-sm py-2.5">
                    {t.portal.cSignup}
                  </Button>
                </div>
              </div>
            </AnimatedSection>

            {/* Partners Portal */}
            <AnimatedSection delay={0.2}>
              <div className="bg-white rounded-xl p-6 border border-stone-200 hover:shadow-lg hover:border-[#D4AF6A]/30 transition-all duration-300 h-full">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-[#D4AF6A] rounded-lg flex items-center justify-center">
                    <Building2 className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-xs font-semibold text-[#D4AF6A] bg-[#D4AF6A]/10 px-2 py-1 rounded">{t.portal.pathB}</span>
                </div>
                <h3 className="text-xl font-bold text-[#0D4B43] mb-1">{t.portal.pTitle}</h3>
                <p className="text-xs text-[#D4AF6A] font-medium mb-2">{t.portal.note}</p>
                <p className="text-stone-500 text-sm mb-5">{t.portal.pDesc}</p>
                <div className="flex gap-3">
                  <Button className="flex-1 bg-[#D4AF6A] hover:bg-[#c9a45f] text-white text-sm py-2.5">
                    {t.portal.pLogin}
                  </Button>
                  <Button variant="outline" className="flex-1 border-[#D4AF6A]/30 text-[#D4AF6A] hover:bg-[#D4AF6A]/5 text-sm py-2.5">
                    {t.portal.pSignup}
                  </Button>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ── Contact Section ───────────────────────────────────────────────────── */}
      <section id="contact" className="py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-10">
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="w-8 h-[2px] bg-[#0D4B43]" />
              <span className="text-[#0D4B43] text-sm font-semibold tracking-wide uppercase">{t.contact.tag}</span>
              <span className="w-8 h-[2px] bg-[#0D4B43]" />
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-[#0D4B43] mb-3">{t.contact.title}</h2>
            <p className="text-stone-500 max-w-xl mx-auto">{t.contact.sub}</p>
          </AnimatedSection>

          <div className="grid sm:grid-cols-3 gap-5 max-w-3xl mx-auto">
            {t.contact.cards.map((card, i) => {
              const Icon = CONTACT_ICONS[i];
              return (
                <AnimatedSection key={i} delay={i * 0.1}>
                  <div className="bg-stone-50 rounded-xl p-5 text-center border border-stone-200 hover:border-[#0D4B43]/20 transition-colors">
                    <div className="w-11 h-11 bg-[#0D4B43] rounded-lg flex items-center justify-center mx-auto mb-3">
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="font-semibold text-[#0D4B43] mb-1">{card.title}</h3>
                    <p className="text-stone-500 text-sm">{card.val}</p>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────────────────────────────── */}
      <footer className="bg-[#0D4B43] text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-10">
            {/* Logo & Tagline */}
            <div className="md:col-span-1">
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                  <span className="text-[#0D4B43] font-bold text-lg">B</span>
                </div>
                <div className="flex flex-col leading-none">
                  <span className="font-bold text-lg">BONYA</span>
                  <span className="text-[8px] text-[#D4AF6A] tracking-[0.15em] uppercase">Company</span>
                </div>
              </div>
              <p className="text-white/70 text-sm leading-relaxed">{t.footer.tagline}</p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold mb-4 text-sm">{t.footer.quick}</h4>
              <ul className="space-y-2">
                {t.footer.links.map((link, i) => (
                  <li key={i}>
                    <a href="#" className="text-white/70 hover:text-white text-sm transition-colors">{link}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-semibold mb-4 text-sm">{t.footer.contactTitle}</h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  info@bonya.com
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  +966 920011074
                </li>
                <li className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Riyadh, Saudi Arabia
                </li>
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h4 className="font-semibold mb-4 text-sm">{t.footer.newsletter}</h4>
              <p className="text-white/70 text-sm mb-3">{t.footer.nlSub}</p>
              <div className="flex">
                <input
                  type="email"
                  placeholder={t.footer.nlPlaceholder}
                  className="flex-1 px-3 py-2 bg-white/10 border border-white/20 rounded-l-lg text-sm placeholder:text-white/50 focus:outline-none focus:border-white/40"
                />
                <button className="px-4 py-2 bg-[#D4AF6A] hover:bg-[#c9a45f] rounded-r-lg transition-colors">
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Bottom */}
          <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-white/60">
            <span>{t.footer.copyright}</span>
            <div className="flex items-center gap-4">
              <a href="#" className="hover:text-white transition-colors">{t.footer.privacy}</a>
              <a href="#" className="hover:text-white transition-colors">{t.footer.terms}</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
