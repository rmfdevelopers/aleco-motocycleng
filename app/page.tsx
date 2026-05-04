'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { 
  ShieldCheck, 
  Paintbrush, 
  MapPin, 
  Boxes, 
  Bike, 
  Calendar, 
  Users, 
  Phone, 
  Mail, 
  ArrowRight, 
  CheckCheck, 
  Loader2, 
  ImageOff, 
  Menu, 
  X, 
  Instagram,
  Wrench,
  ChevronRight
} from 'lucide-react';

// DESIGN DECISIONS:
// Layout Energy: dense
// Depth Treatment: textured
// Divider Style: D-STAT
// Typography Personality: bold

const brand = {
  name: "Aleco Motocycle.ng",
  tagline: "Helping Nigerians start stress-free logistics & haulage business.",
  description: "Authorized dealer for top-tier motorcycle brands since 1994. We specialize in dispatch bikes, power bikes, tricycles, and comprehensive fleet support including branding, tracking, and registration.",
  industry: "logistics",
  region: "nigeria",
  currency: "₦"
};

const IMAGES = {
  hero: "https://images.unsplash.com/photo-1625498216612-1a78744bf171?q=80&w=1080",
  products: [
    "https://images.unsplash.com/photo-1618026382993-74847341c384?q=80&w=1080",
    "https://images.unsplash.com/photo-1703247129455-375eeaae7178?q=80&w=1080",
    "https://images.unsplash.com/photo-1643005165559-c21866a29e56?q=80&w=1080",
    "https://images.unsplash.com/photo-1653822063843-461064a20bbf?q=80&w=1080"
  ]
};

// --- Hooks ---

const useScrollReveal = (threshold = 0.15) => {
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, isVisible };
};

function SafeImage({ src, alt, fill, width, height, className, priority }: {
  src: string; alt: string; fill?: boolean; width?: number; height?: number;
  className?: string; priority?: boolean;
}) {
  const [error, setError] = useState(false);
  if (error) {
    return (
      <div className={`flex items-center justify-center bg-zinc-800 ${className}`}>
        <ImageOff size={28} className="text-white/20" />
      </div>
    );
  }
  return (
    <Image src={src} alt={alt} fill={fill}
      width={!fill ? (width ?? 800) : undefined}
      height={!fill ? (height ?? 600) : undefined}
      className={className} priority={priority}
      onError={() => setError(true)} />
  );
}

// --- Components ---

const Nav = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-secondary/95 backdrop-blur-xl border-b border-white/5 py-4' : 'bg-transparent py-6'
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-primary flex items-center justify-center font-black text-xl">A</div>
          <span className="font-heading font-black text-xl tracking-tighter text-white uppercase hidden sm:block">
            ALECO
          </span>
        </div>

        <div className="hidden md:flex items-center gap-10">
          {['Home', 'Bikes', 'Process', 'Contact'].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="text-sm font-bold uppercase tracking-widest text-white/70 hover:text-primary transition-colors">
              {item}
            </a>
          ))}
          <a href="#contact" className="bg-primary text-white px-6 py-2.5 font-bold text-sm uppercase hover:brightness-110 transition-all">
            Get Started
          </a>
        </div>

        <button className="md:hidden text-white" onClick={() => setMobileOpen(true)}>
          <Menu />
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 z-[60] bg-secondary transition-transform duration-500 ${mobileOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-6 flex justify-between items-center border-b border-white/5">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary flex items-center justify-center font-black text-xl">A</div>
            <span className="font-heading font-black text-xl tracking-tighter text-white">ALECO</span>
          </div>
          <button onClick={() => setMobileOpen(false)}><X /></button>
        </div>
        <div className="flex flex-col p-8 gap-8">
          {['Home', 'Bikes', 'Process', 'Contact'].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMobileOpen(false)} className="text-4xl font-heading font-black uppercase text-white">
              {item}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};

const ContactForm = () => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setSent(true); }, 1500);
  };

  if (sent) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center animate-scaleIn bg-zinc-900 rounded-3xl border border-white/10">
        <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mb-6 border border-primary/40">
          <CheckCheck size={32} className="text-primary" />
        </div>
        <h3 className="font-heading text-3xl font-black text-white mb-3">Order Received</h3>
        <p className="text-white/60 max-w-sm">We&apos;ve received your inquiry. One of our representatives will contact you shortly to finalize your quote.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-zinc-900 p-8 sm:p-10 rounded-3xl border border-white/10 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[80px] rounded-full pointer-events-none" />
      <div className="relative z-10">
        <h3 className="font-heading text-2xl font-bold text-white mb-8">Request a Quote</h3>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            value={form.name}
            onChange={e => setForm(prev => ({ ...prev, name: e.target.value }))}
            required
            className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-white/40 text-sm outline-none transition-all focus:border-primary"
          />
          <div className="grid grid-cols-2 gap-4">
            <input
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={e => setForm(prev => ({ ...prev, email: e.target.value }))}
              required
              className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-white/40 text-sm outline-none transition-all focus:border-primary"
            />
            <input
              type="tel"
              placeholder="Phone"
              value={form.phone}
              onChange={e => setForm(prev => ({ ...prev, phone: e.target.value }))}
              required
              className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-white/40 text-sm outline-none transition-all focus:border-primary"
            />
          </div>
          <textarea rows={4} placeholder="Which bike model are you interested in?"
            value={form.message}
            onChange={e => setForm(prev => ({ ...prev, message: e.target.value }))}
            required
            className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-white/40 text-sm outline-none resize-none transition-all focus:border-primary"
          />
        </div>
        <button type="submit" disabled={loading}
          className="w-full mt-8 bg-primary text-white py-4 rounded-xl font-bold text-base hover:brightness-110 transition-all flex justify-center items-center gap-3">
          {loading ? <Loader2 className="animate-spin" size={20} /> : "Submit Request"}
        </button>
      </div>
    </form>
  );
};

// --- Main Page ---

export default function Page() {
  const heroReveal = useScrollReveal();
  const featuresReveal = useScrollReveal();
  const processReveal = useScrollReveal();
  const aboutReveal = useScrollReveal();
  const productsReveal = useScrollReveal();
  const testimonialReveal = useScrollReveal();
  const contactReveal = useScrollReveal();

  return (
    <main className="bg-secondary min-h-screen">
      <Nav />

      {/* HERO-C Section */}
      <section id="home" className="min-h-screen grid md:grid-cols-[1fr_1.1fr] items-stretch bg-secondary overflow-hidden">
        <div className="flex flex-col justify-center px-8 md:px-20 py-32 relative">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_10%_20%,rgba(211,47,47,0.05),transparent_50%)] pointer-events-none" />
          <div className={`transition-all duration-1000 ${heroReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            <p className="text-primary font-bold tracking-[0.3em] uppercase mb-6 text-sm">
              Est. 1994 &bull; Lagos, Nigeria
            </p>
            <h1 className="font-heading text-5xl lg:text-7xl font-black text-white leading-[0.9] tracking-tighter">
              START YOUR <span className="text-primary">LOGISTICS</span> BUSINESS STRESS-FREE
            </h1>
            <p className="text-white/50 mt-8 text-xl max-w-md leading-relaxed">
              Authorized dealer of dispatch bikes, tricycles, and power bikes. We build your fleet from the ground up—registration to tracking included.
            </p>
            <div className="flex gap-4 mt-12 flex-wrap">
              <a href="#contact" className="bg-primary text-white px-10 py-4 font-black text-base hover:scale-105 transition-all shadow-xl shadow-primary/20 uppercase tracking-tight">
                Get Your Quote
              </a>
              <a href="#bikes" className="border border-white/20 text-white px-10 py-4 font-bold text-base hover:bg-white/10 transition-all uppercase tracking-tight">
                View Inventory
              </a>
            </div>
          </div>
        </div>
        <div className="relative min-h-[50vh] md:min-h-full overflow-hidden">
          <SafeImage src={IMAGES.hero} alt="Aleco Motorcycle Dealer" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-r from-secondary via-secondary/20 to-transparent" />
          <div className="absolute bottom-10 left-10 right-10 bg-secondary/80 backdrop-blur-md p-6 border-l-4 border-primary">
            <p className="text-white font-heading font-bold italic text-lg">Your Lagos logistics journey starts here.</p>
          </div>
        </div>
      </section>

      {/* D-STAT Divider */}
      <div className="bg-primary py-10 relative z-10 shadow-2xl">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 px-6 text-center">
          {[
            { n: '30Yrs', l: 'Industry Experience' },
            { n: '100%', l: 'Authorized Dealer' },
            { n: '24h', l: 'Support Response' },
            { n: '0%', l: 'Hidden Fees' }
          ].map((s, i) => (
            <div key={i} className="border-r last:border-0 border-white/20">
              <p className="text-3xl font-black text-white">{s.n}</p>
              <p className="text-white/60 text-xs mt-1 font-bold uppercase tracking-widest">{s.l}</p>
            </div>
          ))}
        </div>
      </div>

      {/* F-ICON-GRID Section */}
      <section id="features" ref={featuresReveal.ref} className="py-28 px-6 bg-secondary relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:40px_40px]" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="max-w-2xl mb-20">
            <h2 className="font-heading text-5xl font-black text-white mb-6">COMPREHENSIVE FLEET SUPPORT</h2>
            <p className="text-white/40 text-xl">More than just a dealership—we are your strategic business partners in the haulage industry.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { title: "Authorized Dealership", desc: "Direct access to original bikes from trusted manufacturers like Qlink and TVS.", icon: <ShieldCheck className="text-primary" /> },
              { title: "Business Branding", desc: "Professional bike branding and custom installation welding to make your fleet pop.", icon: <Paintbrush className="text-primary" /> },
              { title: "Fleet Tracking", desc: "Advanced GPS installation and registration services to keep your assets secure.", icon: <MapPin className="text-primary" /> },
              { title: "Bulk Supply", desc: "Capacity to supply original spare parts and accessories in any quantity for large fleets.", icon: <Boxes className="text-primary" /> }
            ].map((f, i) => (
              <div key={i} 
                style={{ transitionDelay: `${i * 100}ms` }}
                className={`p-10 rounded-2xl border border-white/5 bg-zinc-900/50 hover:bg-zinc-800 transition-all duration-500 group ${
                featuresReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}>
                <div className="mb-6 w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  {f.icon}
                </div>
                <h3 className="font-heading font-bold text-white text-xl mb-4 leading-tight">{f.title}</h3>
                <p className="text-white/40 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS SECTION */}
      <section id="process" ref={processReveal.ref} className="py-28 px-6 bg-zinc-900">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="font-heading text-5xl font-black text-white mb-6 uppercase">OUR 4-STEP LAUNCH PROCESS</h2>
            <p className="text-white/40 text-lg">How we take you from purchase to a revenue-generating road machine.</p>
          </div>
          <div className="relative">
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-primary/20 -translate-x-1/2" />
            <div className="space-y-24">
              {[
                { number: "01", title: "Selection", description: "Consult with our experts to choose from our range of dispatch, personal, or haulage bikes based on your business model." },
                { number: "02", title: "Customization", description: "Branding, welding, and accessory installation tailored to your specific corporate identity." },
                { number: "03", title: "Legals & Tech", description: "We handle the full registration and install military-grade GPS tracking for your fleet security." },
                { number: "04", title: "Deployment", description: "Your business-ready vehicle is delivered, inspected, and ready to start earning immediate ROI." }
              ].map((step, i) => (
                <div key={i} className={`flex flex-col md:flex-row gap-12 items-center group transition-all duration-1000 ${
                  processReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                }`} style={{ transitionDelay: `${i * 200}ms` }}>
                  <div className={`flex-1 ${i % 2 === 0 ? 'md:text-right' : 'md:order-last'}`}>
                    <h3 className="font-heading text-2xl font-black text-white mb-3 group-hover:text-primary transition-colors">{step.title}</h3>
                    <p className="text-white/50 leading-relaxed">{step.description}</p>
                  </div>
                  <div className="relative z-10 w-12 h-12 rounded-full bg-primary flex items-center justify-center font-black text-secondary shadow-[0_0_20px_rgba(211,47,47,0.4)]">
                    {step.number}
                  </div>
                  <div className="flex-1 hidden md:block" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT / STATS SECTION */}
      <section ref={aboutReveal.ref} className="py-32 px-6 bg-secondary border-y border-white/5 relative">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-20 items-center">
          <div className={`transition-all duration-1000 ${aboutReveal.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
            <h2 className="font-heading text-5xl font-black text-white mb-8">THREE DECADES OF EXCELLENCE</h2>
            <p className="text-white/50 text-xl leading-relaxed mb-10">
              Since 1994, Aleco Motocycle.ng has been the cornerstone of the Nigerian motorcycle industry. We don&apos;t just sell bikes; we provide the infrastructure for entrepreneurs to thrive in the logistics and haulage sector.
            </p>
            <div className="grid grid-cols-2 gap-8 pt-10 border-t border-white/10">
              {[
                { number: '30k+', label: 'Bikes Sold', icon: <Bike className="text-primary" size={20} /> },
                { number: '1,2k+', label: 'Fleet Owners', icon: <Users className="text-primary" size={20} /> }
              ].map((s, i) => (
                <div key={i} className={`transition-all duration-1000 delay-300 ${aboutReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                  <div className="flex items-center gap-2 mb-2">
                    {s.icon}
                    <p className="font-heading text-3xl font-black text-white">{s.number}</p>
                  </div>
                  <p className="text-white/40 text-xs uppercase tracking-widest font-bold">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
          <div className={`relative aspect-square transition-all duration-1000 ${aboutReveal.isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
            <div className="absolute -inset-4 border border-primary/20 rotate-3 rounded-3xl" />
            <div className="absolute inset-0 bg-primary/10 rounded-3xl -rotate-3" />
            <div className="relative h-full w-full rounded-3xl overflow-hidden shadow-2xl">
              <SafeImage src={IMAGES.products[2]} alt="About Aleco" fill className="object-cover grayscale hover:grayscale-0 transition-all duration-700" />
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCTS / P-STAGGER SECTION */}
      <section id="bikes" ref={productsReveal.ref} className="py-28 px-6 bg-secondary overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="mb-24 text-center">
            <h2 className="font-heading text-6xl font-black text-white mb-6 uppercase italic tracking-tighter">OUR INVENTORY</h2>
            <div className="w-24 h-2 bg-primary mx-auto" />
          </div>
          <div className="space-y-32">
            {[
              { name: "Qlink Champion 200cc", price: "₦1,250,000", desc: "The ultimate dispatch workhorse designed for Nigerian roads and heavy-duty logistics.", img: IMAGES.products[0], tag: "Best Seller" },
              { name: "TVS King Deluxe Plus", price: "₦2,450,000", desc: "High-performance tricycle optimized for passenger transport and urban haulage.", img: IMAGES.products[1], tag: "Commercial" },
              { name: "Yamaha R-Series Power Bike", price: "₦5,800,000", desc: "Premium personal power bike for enthusiasts seeking speed, reliability, and style.", img: IMAGES.products[2], tag: "Premium" }
            ].map((p, i) => (
              <div key={i} className={`flex flex-col ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-16 md:gap-24 transition-all duration-1000 ${
                productsReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
              }`}>
                <div className="w-full md:w-1/2 relative group">
                  <div className="aspect-[16/10] relative rounded-2xl overflow-hidden shadow-2xl border border-white/5">
                    <SafeImage src={p.img} alt={p.name} fill className="object-cover group-hover:scale-110 transition-transform duration-1000" />
                    <div className="absolute top-4 left-4 bg-primary text-white px-4 py-1.5 font-bold text-xs uppercase tracking-widest">
                      {p.tag}
                    </div>
                  </div>
                </div>
                <div className="w-full md:w-1/2">
                  <span className="font-mono text-primary text-sm font-bold tracking-[0.4em] uppercase mb-4 block">Fleet Ready</span>
                  <h3 className="font-heading text-4xl md:text-5xl font-black text-white leading-tight mb-6">{p.name}</h3>
                  <p className="text-white/50 text-xl leading-relaxed mb-8">{p.desc}</p>
                  <div className="flex items-center gap-8">
                    <span className="text-3xl font-black text-white">{p.price}</span>
                    <a href="#contact" className="group flex items-center gap-2 text-primary font-bold uppercase tracking-widest text-sm border-b-2 border-primary/20 pb-1 hover:border-primary transition-all">
                      Order Now <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS / T-MASONRY */}
      <section ref={testimonialReveal.ref} className="py-28 px-6 bg-zinc-900 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
            <h2 className="font-heading text-5xl font-black text-white max-w-lg uppercase italic">WHAT OUR PARTNERS SAY</h2>
            <p className="text-white/40 text-lg uppercase font-bold tracking-widest">Lagos logistics is sorted.</p>
          </div>
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {[
              { name: "Oluwaseun Adebayo", role: "Logistics CEO", text: "Aleco helped me start my delivery company with 5 bikes. The branding and tracking were done in-house. Stress-free indeed!" },
              { name: "Chidi Okeke", role: "Fleet Manager", text: "The only place in Lagos I trust for original spare parts in bulk. Their welding and installation work is top-notch." },
              { name: "Ibrahim Musa", role: "Private Rider", text: "Bought my first power bike here. The professionalism is unmatched. They handled all my registration papers perfectly." }
            ].map((t, i) => (
              <div key={i} className={`break-inside-avoid bg-zinc-800/40 p-10 rounded-2xl border border-white/5 hover:border-primary/30 transition-all duration-500 group ${
                testimonialReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`} style={{ transitionDelay: `${i * 100}ms` }}>
                <p className="text-white/70 text-lg italic leading-relaxed mb-8">&ldquo;{t.text}&rdquo;</p>
                <div className="flex items-center gap-4 pt-6 border-t border-white/5">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center font-black text-xl">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-white uppercase text-sm tracking-widest">{t.name}</p>
                    <p className="text-primary text-xs font-bold uppercase mt-1">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT / C2 SECTION */}
      <section id="contact" ref={contactReveal.ref} className="relative overflow-hidden py-32 bg-secondary">
        <div className="absolute inset-0 bg-primary/5" />
        <div className="absolute inset-0 bg-primary [clip-path:polygon(0_0,45%_0,60%_100%,0_100%)] opacity-10 md:opacity-100" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-20 items-center">
          <div className={`transition-all duration-1000 ${contactReveal.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
            <h2 className="font-heading text-6xl lg:text-8xl font-black text-white leading-[0.8] mb-10 italic uppercase">
              LAUNCH <br /> YOUR <span className="text-primary md:text-secondary">FLEET</span> <br /> TODAY
            </h2>
            <div className="space-y-6 border-l-4 border-primary pl-8 mt-12">
              <div className="flex items-center gap-4 group cursor-pointer">
                <div className="w-10 h-10 bg-zinc-800 rounded-full flex items-center justify-center group-hover:bg-primary transition-colors">
                  <Phone size={18} className="text-white" />
                </div>
                <p className="text-white/60 font-bold">+234 806 502 9689</p>
              </div>
              <div className="flex items-center gap-4 group cursor-pointer">
                <div className="w-10 h-10 bg-zinc-800 rounded-full flex items-center justify-center group-hover:bg-primary transition-colors">
                  <MapPin size={18} className="text-white" />
                </div>
                <p className="text-white/60 font-bold">Lagos, Nigeria</p>
              </div>
              <div className="flex items-center gap-4 group cursor-pointer">
                <div className="w-10 h-10 bg-zinc-800 rounded-full flex items-center justify-center group-hover:bg-primary transition-colors">
                  <Instagram size={18} className="text-white" />
                </div>
                <p className="text-white/60 font-bold">@alecomotocycle.ng</p>
              </div>
            </div>
          </div>
          <div className={`transition-all duration-1000 delay-300 ${contactReveal.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
            <ContactForm />
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-zinc-950 pt-24 pb-12 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-8">
                <div className="w-12 h-12 bg-primary flex items-center justify-center font-black text-2xl">A</div>
                <span className="font-heading font-black text-2xl tracking-tighter text-white uppercase">
                  ALECO MOTOCYCLE.NG
                </span>
              </div>
              <p className="text-white/40 text-lg max-w-sm leading-relaxed mb-8">
                Leading the charge in Nigerian logistics infrastructure since 1994. Quality bikes, expert setup, guaranteed security.
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary transition-colors">
                  <Instagram size={18} />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary transition-colors">
                  <Phone size={18} />
                </a>
              </div>
            </div>
            <div>
              <h4 className="font-heading font-bold text-white mb-8 uppercase tracking-widest text-sm">Quick Links</h4>
              <ul className="space-y-4 text-white/40 text-sm font-bold uppercase tracking-tight">
                <li><a href="#home" className="hover:text-primary transition-colors">Home</a></li>
                <li><a href="#bikes" className="hover:text-primary transition-colors">Inventory</a></li>
                <li><a href="#process" className="hover:text-primary transition-colors">Process</a></li>
                <li><a href="#contact" className="hover:text-primary transition-colors">Get Quote</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-heading font-bold text-white mb-8 uppercase tracking-widest text-sm">Service Areas</h4>
              <ul className="space-y-4 text-white/40 text-sm font-bold uppercase tracking-tight">
                <li>Dispatch Fleet Setup</li>
                <li>Tricycle Haulage</li>
                <li>Power Bike Sales</li>
                <li>Branding & Tracking</li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center pt-12 border-t border-white/5 gap-6">
            <p className="text-white/20 text-xs font-mono uppercase tracking-[0.2em]">
              &copy; {new Date().getFullYear()} ALECO MOTOCYCLE.NG &bull; ALL RIGHTS RESERVED
            </p>
            <div className="flex items-center gap-8 text-white/20 text-[10px] font-black uppercase tracking-widest">
              <span>Privacy Policy</span>
              <span>Terms of Service</span>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}