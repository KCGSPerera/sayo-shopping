"use client";

import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import { Menu, X, ShoppingBag } from "lucide-react";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav style={{
            position: 'sticky', top: 0, zIndex: 100,
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
            borderBottom: '1px solid var(--accent-grey)'
        }}>
            <div className="container-wide" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '100px' }}>

                {/* Logo */}
                <Link href="/" className="nav-logo" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', transition: 'var(--transition-smooth)' }}>
                    <Image
                        src="/assets/logo/sayo-shopping-logo.png"
                        alt="Sayo Shopping Logo"
                        width={240}
                        height={120}
                        priority
                        className="logo-img"
                        style={{ objectFit: 'contain', width: 'auto', maxHeight: '70px' }}
                    />
                    <span className="brand-name" style={{ 
                        fontFamily: 'var(--font-serif)', 
                        fontSize: '1.5rem', 
                        fontWeight: 400, 
                        letterSpacing: '0.1em', 
                        textTransform: 'uppercase',
                        color: 'var(--foreground)',
                        lineHeight: 1
                    }}>
                        SAYO SHOPPING
                    </span>
                </Link>

                {/* Desktop Menu */}
                <div className="desktop-menu" style={{ display: 'flex', gap: '4rem', alignItems: 'center' }}>
                    <Link href="/" className="nav-link" style={{ fontSize: '0.875rem', fontWeight: 400, textTransform: 'uppercase', letterSpacing: '0.15em', transition: 'var(--transition-smooth)' }}>Home</Link>
                    <Link href="/jewellery" className="nav-link" style={{ fontSize: '0.875rem', fontWeight: 400, textTransform: 'uppercase', letterSpacing: '0.15em', transition: 'var(--transition-smooth)' }}>Jewellery</Link>
                    <Link href="/about" className="nav-link" style={{ fontSize: '0.875rem', fontWeight: 400, textTransform: 'uppercase', letterSpacing: '0.15em', transition: 'var(--transition-smooth)' }}>About</Link>
                    <Link href="/contact" className="nav-link" style={{ fontSize: '0.875rem', fontWeight: 400, textTransform: 'uppercase', letterSpacing: '0.15em', transition: 'var(--transition-smooth)' }}>Contact</Link>
                </div>

                {/* Mobile Toggle */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <button className="mobile-toggle" onClick={() => setIsOpen(!isOpen)} style={{ display: 'none' }} aria-label="Toggle menu">
                        {isOpen ? <X size={28} strokeWidth={1} /> : <Menu size={28} strokeWidth={1} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            {isOpen && (
                <div style={{
                    position: 'fixed',
                    top: '100px',
                    left: 0,
                    width: '100%',
                    height: 'calc(100vh - 100px)',
                    backgroundColor: 'white',
                    zIndex: 99,
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '2rem',
                    gap: '2rem',
                    animation: 'fadeIn 0.3s ease-out'
                }}>
                    <Link href="/" onClick={() => setIsOpen(false)} style={{ fontSize: '1.5rem', fontFamily: 'var(--font-serif)', borderBottom: '1px solid var(--accent-grey)', paddingBottom: '1rem' }}>Home</Link>
                    <Link href="/jewellery" onClick={() => setIsOpen(false)} style={{ fontSize: '1.5rem', fontFamily: 'var(--font-serif)', borderBottom: '1px solid var(--accent-grey)', paddingBottom: '1rem' }}>Jewellery</Link>
                    <Link href="/about" onClick={() => setIsOpen(false)} style={{ fontSize: '1.5rem', fontFamily: 'var(--font-serif)', borderBottom: '1px solid var(--accent-grey)', paddingBottom: '1rem' }}>About</Link>
                    <Link href="/contact" onClick={() => setIsOpen(false)} style={{ fontSize: '1.5rem', fontFamily: 'var(--font-serif)', borderBottom: '1px solid var(--accent-grey)', paddingBottom: '1rem' }}>Contact Us</Link>
                </div>
            )}

            {/* Global Nav Styles */}
            <style dangerouslySetInnerHTML={{
                __html: `
        .nav-link:hover { opacity: 0.5; }
        @media (max-width: 768px) {
          .desktop-menu { display: none !important; }
          .mobile-toggle { display: block !important; }
          .brand-name { fontSize: 1.125rem !important; }
        }
        @media (max-width: 350px) {
          .logo-img { max-height: 50px !important; }
          .brand-name { fontSize: 0.875rem !important; }
        }
      `}} />
        </nav>
    );
}
