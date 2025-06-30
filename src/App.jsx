import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

const NAV_LINKS = [
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#testimonials", label: "Testimonials" },
  { href: "#contact", label: "Contact" },
];

function ScrollToHash() {
  const { hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.replace('#', ''));
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [hash]);
  return null;
}

export default function AppWrapper() {
  return (
    <BrowserRouter>
      <ScrollToHash />
      <Routes>
        <Route path="/*" element={<LandingPage />} />
      </Routes>
    </BrowserRouter>
  );
}

function LandingPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 900);
      if (window.innerWidth > 900) setMenuOpen(false);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['about', 'services', 'testimonials', 'contact'];
      let current = '';
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el && window.scrollY + 120 >= el.offsetTop) {
          current = id;
        }
      }
      setActiveSection(current);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="font-sans text-gray-800">
      {/* Navigation - single responsive nav */}
      <nav className="w-full fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-12 py-7 bg-gradient-to-r from-purple-700 via-pink-500 to-accent/80 bg-[length:200%_200%] animate-gradient-move shadow-2xl border-b-2 border-pink-200/60 backdrop-blur-xl transition-all duration-300" style={{minHeight: '100px', boxShadow: '0 8px 32px 0 rgba(127,29,255,0.18)'}} aria-label="Main navigation">
        {/* Glassmorphism overlay */}
        <div className="absolute inset-0 w-full h-full bg-white/30 bg-gradient-to-br from-white/40 via-pink-100/20 to-purple-100/10 backdrop-blur-2xl rounded-b-3xl pointer-events-none z-0"></div>
        <div className="flex items-center space-x-4 cursor-pointer group select-none relative z-10" aria-label="Beyond Career logo">
          <span className="text-5xl animate-spin-slow drop-shadow-lg glow-logo" aria-hidden="true">✨</span>
          <span className="text-3xl font-extrabold bg-gradient-to-r from-yellow-300 via-pink-400 to-purple-500 bg-clip-text text-transparent group-hover:scale-110 group-hover:brightness-125 transition-transform duration-200 tracking-tight drop-shadow-2xl group-hover:animate-shine">Beyond Career</span>
        </div>
        {!isMobile && (
          <div className="nav-links flex gap-10 relative z-10">
            {NAV_LINKS.map(link => (
              <a key={link.href} href={link.href} className={`nav-link font-bold text-lg relative after:content-[''] after:block after:h-1 after:bg-gradient-to-r after:from-pink-400 after:to-purple-600 after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100 after:origin-left px-2 py-1 ${activeSection === link.href.substring(1) ? 'active-nav-link' : ''}`} aria-current={activeSection === link.href.substring(1) ? 'page' : undefined}>{link.label}</a>
            ))}
          </div>
        )}
        {isMobile && (
          <button className="hamburger-btn text-5xl focus:outline-none px-3 py-2 rounded bg-white/30 shadow-lg relative z-10" onClick={() => setMenuOpen(!menuOpen)}>
            ☰
          </button>
        )}
        {isMobile && menuOpen && (
          <div className="fixed inset-0 bg-black/40 z-40" onClick={()=>setMenuOpen(false)}></div>
        )}
        {isMobile && menuOpen && (
          <div className="mobile-menu open z-50 animate-slide-down rounded-3xl shadow-2xl bg-white/90 backdrop-blur-xl p-8 mt-4 mx-4">
            {NAV_LINKS.map(link => (
              <a key={link.href} href={link.href} className={`nav-link text-lg font-bold relative after:content-[''] after:block after:h-1 after:bg-gradient-to-r after:from-pink-400 after:to-purple-600 after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100 after:origin-left px-2 py-1 ${activeSection === link.href.substring(1) ? 'active-nav-link' : ''}`} aria-current={activeSection === link.href.substring(1) ? 'page' : undefined} onClick={()=>setMenuOpen(false)}>{link.label}</a>
            ))}
          </div>
        )}
        {/* Animated gradient border at bottom */}
        <div className="absolute left-0 right-0 bottom-0 h-1 bg-gradient-to-r from-yellow-300 via-pink-400 to-purple-500 animate-gradient-move" style={{borderRadius: '0 0 1.5rem 1.5rem'}}></div>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen bg-cover bg-center flex flex-col justify-center items-center text-white text-center p-8 pt-40 relative" style={{backgroundImage: "linear-gradient(120deg, rgba(127,29,255,0.85) 0%, rgba(0,230,211,0.7) 100%), url('https://images.unsplash.com/photo-1556742044-3c52d6e88c62')"}}>
        <div className="hero-card bg-white/80 rounded-3xl shadow-2xl px-10 py-12 max-w-2xl w-full flex flex-col items-center">
          <span className="inline-block w-16 h-2 rounded-full bg-gradient-to-r from-pink-400 to-purple-600 mb-4 animate-pulse"></span>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 drop-shadow-lg text-yellow-300">Unlock Your Dream Career</h1>
          <p className="text-xl md:text-2xl mb-4 font-semibold drop-shadow text-gray-800">Redefining Student Careers with Mentorship, Internships & Community</p>
          <a href="#about" className="cta inline-block px-6 py-5 text-2xl font-bold rounded-full shadow-lg bg-gradient-to-r from-pink-500 to-purple-600 hover:from-purple-600 hover:to-pink-500 transition-all duration-300 animate-bounce mt-6">Get Started</a>
        </div>
      </section>

      {/* Section Separator */}
      <div className="section-separator bg-gradient-to-r from-purple-600 to-pink-400 mb-10"></div>

      {/* About Section */}
      <section id="about" className="py-24 px-8 bg-accent">
        <h2 className="text-3xl font-extrabold mb-8 text-center">About Us</h2>
        <p className="max-w-4xl mx-auto text-center mb-6">Founded by students from IIT Kharagpur, Beyond Career is driven by a passion to guide students toward successful futures. Our vision is to be the leading hub for student empowerment through real-world opportunities.</p>
        <ul className="max-w-2xl mx-auto list-disc list-inside space-y-2">
          <li>Mission: Empower students with clarity, direction, and opportunity</li>
          <li>Vision: A future where every student has access to meaningful careers</li>
          <li>Core Values: Integrity, Innovation, Inclusion</li>
        </ul>
      </section>

      <div className="section-separator bg-gradient-to-r from-pink-400 to-accent mb-10"></div>

      {/* Services Section */}
      <section id="services" className="py-24 px-8">
        <h2 className="text-3xl font-extrabold mb-12 text-center">Our Services</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          <ServiceCard icon="🎯" title="Career Guidance" desc="Personalized career counseling to help you find your path." />
          <ServiceCard icon="💼" title="Internship Opportunities" desc="Connect with industry professionals and companies." />
          <ServiceCard icon="🤝" title="Mentorship Programs" desc="One-on-one mentoring by experienced professionals." />
          <ServiceCard icon="🌐" title="Community Engagement" desc="Join a supportive community of like-minded peers." />
        </div>
      </section>

      <div className="section-separator bg-gradient-to-r from-accent to-secondary mb-10"></div>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-24 px-8">
        <h2 className="text-3xl font-extrabold mb-12 text-center">Success Stories</h2>
        <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
          <Testimonial icon="⭐" name="Riya S." text="Thanks to Beyond Career, I landed my first internship at a startup!" />
          <Testimonial icon="🚀" name="Amit K." text="The mentorship helped me gain clarity and confidence about my career goals." />
        </div>
        <div className="text-center mt-8 text-sm text-gray-100 font-bold">Join 10,000+ students who've found their career path</div>
      </section>

      <div className="section-separator bg-gradient-to-r from-secondary to-purple-600 mb-10"></div>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-8">
        <h2 className="text-3xl font-extrabold mb-12 text-center">Contact Us</h2>
        <form className="max-w-xl mx-auto space-y-6" action="https://formspree.io/f/mnnvwvpv" method="POST" aria-label="Contact form" onSubmit={(e) => {
          const form = e.target;
          const name = form.elements['name'].value.trim();
          const email = form.elements['email'].value.trim();
          const message = form.elements['message'].value.trim();
          let valid = true;
          if (!name) { alert('Name is required.'); valid = false; }
          else if (!email || !/^\S+@\S+\.\S+$/.test(email)) { alert('Valid email is required.'); valid = false; }
          else if (!message) { alert('Message is required.'); valid = false; }
          if (!valid) e.preventDefault();
        }}>
          <input type="text" name="name" placeholder="Your Name" className="w-full p-3 border rounded" required aria-label="Your Name" />
          <input type="email" name="email" placeholder="Email Address" className="w-full p-3 border rounded" required aria-label="Email Address" />
          <textarea name="message" placeholder="Your Message" className="w-full p-3 border rounded h-32" required aria-label="Your Message"></textarea>
          <button type="submit" className="cta">Send Message</button>
        </form>
        <div className="text-center mt-8">
          <p>📍 IIT Kharagpur, India</p>
          <p>📧 hello@beyondcareer.in</p>
          <div className="flex justify-center contact-social mt-2">
            <a href="https://www.linkedin.com/company/beyondcareer" target="_blank" rel="noopener noreferrer" className="hover:text-accent">LinkedIn</a>
            <a href="https://www.instagram.com/beyondcareer" target="_blank" rel="noopener noreferrer" className="hover:text-accent">Instagram</a>
            <a href="https://twitter.com/beyondcareer" target="_blank" rel="noopener noreferrer" className="hover:text-accent">Twitter</a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-purple-600 to-pink-400 text-white py-6 text-center mt-12">
        <div className="flex justify-center footer-social mb-4">
          <a href="https://www.linkedin.com/company/beyondcareer" target="_blank" rel="noopener noreferrer" className="hover:text-accent">LinkedIn</a>
          <a href="https://www.instagram.com/beyondcareer" target="_blank" rel="noopener noreferrer" className="hover:text-accent">Instagram</a>
          <a href="https://twitter.com/beyondcareer" target="_blank" rel="noopener noreferrer" className="hover:text-accent">Twitter</a>
        </div>
        <p className="font-bold">&copy; 2025 Beyond Career. All rights reserved.</p>
      </footer>
    </div>
  );
}

function ServiceCard({ icon, title, desc }) {
  return (
    <div className="service-card flex flex-col items-center text-center">
      <div className="text-5xl mb-3 animate-pulse">{icon}</div>
      <h3 className="text-xl font-bold mb-2 text-black">{title}</h3>
      <p className="text-black font-medium">{desc}</p>
    </div>
  );
}

function Testimonial({ icon, name, text }) {
  return (
    <div className="testimonial-card flex flex-col items-center">
      <div className="text-4xl mb-2">{icon}</div>
      <p className="italic mb-2 text-lg text-gray-800">"{text}"</p>
      <p className="text-right mt-2 font-bold text-secondary">- {name}</p>
    </div>
  );
} 