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
    coverage: {
      tag: 'ACROSS THE KINGDOM',
      title: 'Wherever the Kingdom builds,',
      title2: 'we deliver.',
      sub: 'Active sourcing and delivery capability across seven regions — from Tabuk in the north-west to Asir in the south-west, anchored in Riyadh.',
      hint: 'HOVER OR TAP A REGION',
      regions: [
        { id: 'neom', name: 'NEOM / Tabuk', title: 'Northwest — NEOM / Tabuk', desc: 'Supporting NEOM mega-projects and Tabuk developments with premium construction materials and rapid logistics.' },
        { id: 'madinah', name: 'Madinah', title: 'West — Madinah', desc: 'Serving the holy city expansion projects with certified materials meeting the highest quality standards.' },
        { id: 'jeddah', name: 'Jeddah', title: 'Western — Jeddah', desc: 'The commercial hub of the west coast — supporting major infrastructure and urban development projects.' },
        { id: 'makkah', name: 'Makkah', title: 'Holy Region — Makkah', desc: 'Providing premium materials for expansion projects in the holiest city, meeting stringent specifications.' },
        { id: 'riyadh', name: 'Riyadh', title: 'Central — Riyadh', desc: 'Our headquarters and primary hub — serving the capital\'s rapid urban expansion and mega-projects.' },
        { id: 'dammam', name: 'Dammam', title: 'Eastern — Dammam / Khobar', desc: 'The industrial backbone — Aramco-zone and downstream petrochemical site supply with grade-traceable cement.' },
        { id: 'asir', name: 'Asir', title: 'Southwest — Asir', desc: 'Mountain region expertise — specialized logistics for challenging terrain and tourism development projects.' },
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
      cards: [{ title: 'Email Address', val: 'info@bonya.com' }, { title: 'Phone Number', val: '+966 920011074' }, { title: 'Office Location', val: 'Riyadh, Saudi Arabia' }],
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
    coverage: {
      tag: 'عبر المملكة',
      title: 'أينما تبني المملكة،',
      title2: 'نوصل.',
      sub: 'قدرة توريد وتوصيل نشطة عبر سبع مناطق — من تبوك في الشمال الغربي إلى عسير في الجنوب الغربي، بمركزنا في الرياض.',
      hint: 'مرر أو اضغط على المنطقة',
      regions: [
        { id: 'neom', name: 'نيوم / تبوك', title: 'الشمال الغربي — نيوم / تبوك', desc: 'دعم مشاريع نيوم الضخمة وتطويرات تبوك بمواد بناء متميزة ولوجستيات سريعة.' },
        { id: 'madinah', name: 'المدينة', title: 'الغرب — المدينة المنورة', desc: 'خدمة مشاريع توسعة المدينة المقدسة بمواد معتمدة تلبي أعلى معايير الجودة.' },
        { id: 'jeddah', name: 'جدة', title: 'الغربية — جدة', desc: 'المركز التجاري للساحل الغربي — دعم مشاريع البنية التحتية والتطوير العمراني الكبرى.' },
        { id: 'makkah', name: 'مكة', title: 'المنطقة المقدسة — مكة المكرمة', desc: 'توفير مواد متميزة لمشاريع التوسعة في أقدس المدن، تلبي المواصفات الصارمة.' },
        { id: 'riyadh', name: 'الرياض', title: 'الوسطى — الرياض', desc: 'مقرنا الرئيسي ومركزنا الأساسي — خدمة التوسع العمراني السريع للعاصمة والمشاريع الضخمة.' },
        { id: 'dammam', name: 'الدمام', title: 'الشرقية — الدمام / الخبر', desc: 'العمود الفقري الصناعي — توريد مناطق أرامكو والمواقع البتروكيماوية بإسمنت قابل للتتبع.' },
        { id: 'asir', name: 'عسير', title: 'الجنوب الغربي — عسير', desc: 'خبرة المناطق الجبلية — لوجستيات متخصصة للتضاريس الصعبة ومشاريع تطوير السياحة.' },
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
      cards: [{ title: 'البريد الإلكتروني', val: 'info@bonya.com' }, { title: 'رقم الهاتف', val: '+966 920011074' }, { title: 'موقع المكتب', val: 'الرياض، المملكة العربية السعودية' }],
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

// ─── Saudi Arabia Map SVG ─────────────────────────────────────────────────────
function SaudiMap({ activeRegion, setActiveRegion, regions }: { activeRegion: string | null; setActiveRegion: (id: string | null) => void; regions: typeof translations.en.coverage.regions }) {
  // Location positions on the map (approximate coordinates)
  const locations = [
    { id: 'neom', x: 105, y: 95, name: regions.find(r => r.id === 'neom')?.name },
    { id: 'madinah', x: 145, y: 155, name: regions.find(r => r.id === 'madinah')?.name },
    { id: 'jeddah', x: 135, y: 210, name: regions.find(r => r.id === 'jeddah')?.name },
    { id: 'makkah', x: 155, y: 230, name: regions.find(r => r.id === 'makkah')?.name },
    { id: 'riyadh', x: 255, y: 185, name: regions.find(r => r.id === 'riyadh')?.name },
    { id: 'dammam', x: 310, y: 150, name: regions.find(r => r.id === 'dammam')?.name },
    { id: 'asir', x: 175, y: 295, name: regions.find(r => r.id === 'asir')?.name },
  ];

  return (
    <svg viewBox="0 0 420 380" className="w-full h-auto max-w-lg">
      {/* Saudi Arabia outline - simplified shape */}
      <motion.path
        d="M 100 80 
           L 140 60 
           L 200 55 
           L 280 70 
           L 340 100 
           L 360 140 
           L 350 180 
           L 330 200 
           L 300 230 
           L 260 280 
           L 220 320 
           L 180 340 
           L 140 330 
           L 110 290 
           L 95 240 
           L 100 200 
           L 90 160 
           L 85 120 
           Z"
        fill="#1e3a5f"
        stroke="#2d4a6f"
        strokeWidth="2"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      />
      
      {/* Coastlines */}
      <path
        d="M 85 120 L 90 160 L 100 200 L 95 240 L 110 290"
        fill="none"
        stroke="#3d5a7f"
        strokeWidth="1.5"
        strokeDasharray="4 2"
        opacity="0.5"
      />
      <path
        d="M 340 100 L 360 140 L 350 180 L 330 200"
        fill="none"
        stroke="#3d5a7f"
        strokeWidth="1.5"
        strokeDasharray="4 2"
        opacity="0.5"
      />

      {/* Location markers */}
      {locations.map((loc, i) => (
        <g key={loc.id}>
          {/* Pulse ring for active */}
          {activeRegion === loc.id && (
            <motion.circle
              cx={loc.x}
              cy={loc.y}
              r="18"
              fill="none"
              stroke="#D4AF6A"
              strokeWidth="2"
              initial={{ scale: 0.8, opacity: 1 }}
              animate={{ scale: 1.5, opacity: 0 }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          )}
          
          {/* Outer glow */}
          <motion.circle
            cx={loc.x}
            cy={loc.y}
            r="12"
            fill="#D4AF6A"
            opacity="0.2"
            initial={{ scale: 0 }}
            animate={{ scale: activeRegion === loc.id ? 1.3 : 1 }}
            transition={{ delay: i * 0.1, duration: 0.3 }}
          />
          
          {/* Main dot */}
          <motion.circle
            cx={loc.x}
            cy={loc.y}
            r="8"
            fill={activeRegion === loc.id ? '#D4AF6A' : '#1e3a5f'}
            stroke="#D4AF6A"
            strokeWidth="2"
            className="cursor-pointer"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.3 }}
            transition={{ delay: 0.5 + i * 0.1, type: 'spring', stiffness: 400 }}
            onMouseEnter={() => setActiveRegion(loc.id)}
            onMouseLeave={() => setActiveRegion(null)}
            onClick={() => setActiveRegion(activeRegion === loc.id ? null : loc.id)}
          />
          
          {/* Inner dot */}
          <motion.circle
            cx={loc.x}
            cy={loc.y}
            r="3"
            fill={activeRegion === loc.id ? '#1e3a5f' : '#D4AF6A'}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.6 + i * 0.1 }}
            className="pointer-events-none"
          />
          
          {/* Label */}
          <motion.text
            x={loc.x}
            y={loc.y - 18}
            textAnchor="middle"
            fill="white"
            fontSize="11"
            fontWeight="500"
            className="pointer-events-none select-none"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 + i * 0.1 }}
          >
            {loc.name}
          </motion.text>
        </g>
      ))}
    </svg>
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
  const [activeRegion, setActiveRegion] = useState<string | null>(null);
  const t = translations[lang];
  const isAr = lang === 'ar';

  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroImageY = useTransform(scrollYProgress, [0, 1], ['0%', '28%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

  const activeRegionData = t.coverage.regions.find(r => r.id === activeRegion);

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

              {/* Right - Stats Card */}
              <motion.div
                className="hidden lg:block relative"
                initial={{ opacity: 0, x: 60, rotateY: -5 }}
                animate={{ opacity: 1, x: 0, rotateY: 0 }}
                transition={{ delay: 0.6, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="relative bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-8 shadow-2xl">
                  <div className="absolute -top-3 -right-3 w-24 h-24 bg-emerald-500/10 rounded-full blur-2xl" />
                  <div className="absolute -bottom-3 -left-3 w-32 h-32 bg-teal-500/8 rounded-full blur-2xl" />

                  <div className="relative space-y-6">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
                        <Truck className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-white font-semibold">{t.hero.trust}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      {[
                        { val: '500+', label: t.hero.deliveries },
                        { val: '98%', label: t.hero.onTime },
                        { val: '24/7', label: t.hero.support },
                      ].map((stat, i) => (
                        <motion.div
                          key={stat.label}
                          className="text-center p-4 rounded-xl bg-white/5 border border-white/8"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.8 + i * 0.1 }}
                        >
                          <p className="text-2xl font-bold text-white mb-1">{stat.val}</p>
                          <p className="text-xs text-stone-400">{stat.label}</p>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/60"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.6 }}
        >
          <span className="text-xs tracking-wider uppercase">{t.hero.scroll}</span>
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}>
            <ChevronDown className="w-5 h-5" />
          </motion.div>
        </motion.div>
      </section>

      {/* ── About Section ───────────────────────────────────────────────────────── */}
      <section id="about" className="py-24 bg-gradient-to-b from-stone-50 to-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-100/40 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Image side */}
            <AnimatedSection>
              <div className="relative">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                  <Image src="/hero-bg.jpg" alt="About BONYA" width={600} height={500} className="object-cover w-full h-[420px]" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent" />
                </div>
                {/* Floating stats */}
                <motion.div
                  className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-2xl p-5 border border-stone-100"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                >
                  <div className="flex items-center gap-4">
                    {t.about.stats.map((stat, i) => {
                      const Icon = STAT_ICONS[i];
                      return (
                        <div key={stat.l} className={`text-center ${i !== t.about.stats.length - 1 ? 'pr-4 border-r border-stone-200' : ''}`}>
                          <div className="flex items-center justify-center gap-1 mb-1">
                            <Icon className="w-4 h-4 text-emerald-600" />
                            <span className="text-2xl font-bold text-slate-800">{stat.v}<span className="text-emerald-600">{stat.s}</span></span>
                          </div>
                          <p className="text-xs text-stone-500">{stat.l}</p>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              </div>
            </AnimatedSection>

            {/* Content side */}
            <div className="lg:pl-8">
              <AnimatedSection>
                <span className="inline-block px-4 py-1.5 bg-emerald-50 text-emerald-700 text-xs font-semibold rounded-full uppercase tracking-wider mb-4">
                  {t.about.tag}
                </span>
                <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6 leading-tight">{t.about.title}</h2>
                <p className="text-lg text-emerald-700 font-medium mb-6">{t.about.sub}</p>
              </AnimatedSection>
              
              <AnimatedSection delay={0.1}>
                <div className="space-y-4 text-stone-600 leading-relaxed mb-8">
                  <p>{t.about.p1}</p>
                  <p>{t.about.p2}</p>
                  <p>{t.about.p3}</p>
                </div>
                <a href="#" className="inline-flex items-center gap-2 text-emerald-700 font-semibold hover:text-emerald-800 group">
                  {t.about.link}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </AnimatedSection>
            </div>
          </div>

          {/* Services Grid */}
          <motion.div
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-20"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {t.about.services.map((service, i) => {
              const Icon = SERVICE_ICONS[i];
              return (
                <motion.div
                  key={service.title}
                  className="group relative bg-white rounded-2xl p-6 border border-stone-100 hover:border-emerald-200 shadow-sm hover:shadow-xl transition-all duration-500"
                  variants={fadeInUp}
                  whileHover={{ y: -6 }}
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${SERVICE_GRADIENTS[i]} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-md`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-800 mb-2">{service.title}</h3>
                  <p className="text-sm text-stone-500 leading-relaxed">{service.desc}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ── Coverage Map Section ──────────────────────────────────────────────────── */}
      <section className="py-20 bg-[#1a2f4a] relative overflow-hidden">
        {/* Subtle pattern */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 0)`,
            backgroundSize: '30px 30px',
          }}
        />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left - Content */}
            <AnimatedSection>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-[2px] bg-[#D4AF6A]" />
                <span className="text-[#D4AF6A] text-xs font-semibold tracking-[0.2em] uppercase">
                  {t.coverage.tag}
                </span>
              </div>
              
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-2 leading-tight font-serif italic">
                {t.coverage.title}
              </h2>
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight font-serif italic">
                {t.coverage.title2}
              </h2>
              
              <p className="text-stone-400 text-lg leading-relaxed mb-10 max-w-lg">
                {t.coverage.sub}
              </p>

              {/* Map */}
              <div className="relative">
                <SaudiMap 
                  activeRegion={activeRegion} 
                  setActiveRegion={setActiveRegion}
                  regions={t.coverage.regions}
                />
              </div>
            </AnimatedSection>

            {/* Right - Info Card */}
            <AnimatedSection delay={0.2}>
              <div className="lg:pl-8">
                <motion.div 
                  className="bg-[#243b5a] rounded-2xl p-8 border border-[#2d4a6f] min-h-[200px]"
                  layout
                >
                  <AnimatePresence mode="wait">
                    {activeRegionData ? (
                      <motion.div
                        key={activeRegionData.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                      >
                        <h3 className="text-2xl font-bold text-[#D4AF6A] mb-4">
                          {activeRegionData.title}
                        </h3>
                        <p className="text-stone-300 leading-relaxed text-lg">
                          {activeRegionData.desc}
                        </p>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="hint"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex flex-col items-start justify-center h-full"
                      >
                        <p className="text-stone-500 uppercase tracking-wider text-sm">
                          {t.coverage.hint}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Region quick links */}
                <div className="mt-6 flex flex-wrap gap-2">
                  {t.coverage.regions.map((region) => (
                    <motion.button
                      key={region.id}
                      onClick={() => setActiveRegion(activeRegion === region.id ? null : region.id)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                        activeRegion === region.id
                          ? 'bg-[#D4AF6A] text-[#1a2f4a]'
                          : 'bg-[#243b5a] text-stone-400 hover:text-white hover:bg-[#2d4a6f]'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {region.name}
                    </motion.button>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ── Access Portal ───────────────────────────────────────────────────────── */}
      <section id="access-portal" className="py-24 bg-gradient-to-b from-white to-stone-50 relative overflow-hidden">
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-emerald-50 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2 opacity-60" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <AnimatedSection className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 bg-emerald-50 text-emerald-700 text-xs font-semibold rounded-full uppercase tracking-wider mb-4">
              {t.portal.tag}
            </span>
            <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-4">{t.portal.title}</h2>
            <p className="text-lg text-stone-500 max-w-2xl mx-auto">{t.portal.sub}</p>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Customer Portal */}
            <motion.div
              className="group relative bg-white rounded-3xl p-8 border border-stone-200 hover:border-emerald-300 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden"
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
            >
              <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-bl-full opacity-60 group-hover:opacity-100 transition-opacity" />
              <div className="relative">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-xs font-semibold text-emerald-600 uppercase tracking-wider">{t.portal.pathA}</span>
                </div>
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-700 flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Users className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-3">{t.portal.cTitle}</h3>
                <p className="text-stone-500 mb-8 leading-relaxed">{t.portal.cDesc}</p>
                <div className="flex gap-3">
                  <Button className="flex-1 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all">
                    {t.portal.cLogin}
                  </Button>
                  <Button variant="outline" className="flex-1 border-emerald-200 text-emerald-700 hover:bg-emerald-50 font-semibold rounded-xl">
                    {t.portal.cSignup}
                  </Button>
                </div>
              </div>
            </motion.div>

            {/* Partner Portal */}
            <motion.div
              className="group relative bg-white rounded-3xl p-8 border border-stone-200 hover:border-slate-400 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden"
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              whileHover={{ y: -8 }}
            >
              <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-slate-50 to-stone-100 rounded-bl-full opacity-60 group-hover:opacity-100 transition-opacity" />
              <div className="relative">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{t.portal.pathB}</span>
                  <span className="px-2 py-0.5 bg-amber-100 text-amber-700 text-xs font-medium rounded-full">{t.portal.note}</span>
                </div>
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Building2 className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-3">{t.portal.pTitle}</h3>
                <p className="text-stone-500 mb-8 leading-relaxed">{t.portal.pDesc}</p>
                <div className="flex gap-3">
                  <Button className="flex-1 bg-gradient-to-r from-slate-700 to-slate-900 hover:from-slate-800 hover:to-slate-950 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all">
                    {t.portal.pLogin}
                  </Button>
                  <Button variant="outline" className="flex-1 border-slate-300 text-slate-700 hover:bg-slate-50 font-semibold rounded-xl">
                    {t.portal.pSignup}
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Contact ────────────────────────────────────────────────────────────── */}
      <section id="contact" className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 bg-emerald-50 text-emerald-700 text-xs font-semibold rounded-full uppercase tracking-wider mb-4">
              {t.contact.tag}
            </span>
            <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-4">{t.contact.title}</h2>
            <p className="text-lg text-stone-500 max-w-2xl mx-auto">{t.contact.sub}</p>
          </AnimatedSection>

          <motion.div
            className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto"
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
                  info@bonya.com
                </li>
                <li className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  +966 920011074
                </li>
              </ul>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}>
              <h4 className="font-semibold text-white text-sm mb-6 tracking-wide">{t.footer.newsletter}</h4>
              <p className="text-slate-400 text-sm mb-4">{t.footer.nlSub}</p>
              <div className="flex">
                <input
                  type="email"
                  placeholder={t.footer.nlPlaceholder}
                  className="flex-1 bg-slate-800 border border-slate-700 rounded-l-lg px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
                />
                <Button className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-l-none rounded-r-lg px-4">
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </motion.div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
            <p>{t.footer.copyright}</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors">{t.footer.privacy}</a>
              <a href="#" className="hover:text-white transition-colors">{t.footer.terms}</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
