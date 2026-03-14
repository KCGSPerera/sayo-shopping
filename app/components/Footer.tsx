import Link from "next/link";
import { Facebook, Instagram, Music2, MessageCircle } from "lucide-react"; // Music2 as TikTok approximation

export default function Footer() {
    return (
        <footer style={{ backgroundColor: 'var(--accent-dark)', color: 'white', paddingTop: '8rem', paddingBottom: '3rem' }}>
            <div className="container-wide" style={{ marginBottom: '6rem' }}>
                <h2 style={{ fontSize: 'clamp(3rem, 8vw, 6rem)', fontFamily: 'var(--font-serif)', color: 'white', marginBottom: '4rem', letterSpacing: '-0.02em', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '2rem' }}>
                    SAYOSHOPPING
                </h2>

                <div className="grid grid-cols-4 footer-grid" style={{ gap: '4rem' }}>
                    {/* Brand Meta */}
                    <div className="footer-section" style={{ paddingRight: '2rem' }}>
                        <p style={{ color: '#888', fontSize: '1rem', lineHeight: 2 }}>
                            Elevating your style with elegant, luxurious, and timeless jewellery pieces. Perfect for every occasion.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="footer-section">
                        <h4 style={{ color: 'white', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '2rem' }}>Explore</h4>
                        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1.25rem', color: '#888', fontSize: '1rem' }}>
                            <li><Link href="/jewellery" className="footer-link">All Jewellery</Link></li>
                            <li><Link href="/about" className="footer-link">Our Story</Link></li>
                            <li><Link href="/contact" className="footer-link">Contact</Link></li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div className="footer-section">
                        <h4 style={{ color: 'white', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '2rem' }}>Support</h4>
                        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1.25rem', color: '#888', fontSize: '1rem' }}>
                            <li><Link href="/shipping" className="footer-link">Shipping & Delivery</Link></li>
                            <li><Link href="/terms" className="footer-link">Terms & Conditions</Link></li>
                            <li><Link href="/privacy" className="footer-link">Privacy Policy</Link></li>
                            <li><Link href="/support" className="footer-link">Support Center</Link></li>
                        </ul>
                    </div>

                    {/* Social */}
                    <div className="footer-section">
                        <h4 style={{ color: 'white', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '2rem' }}>Connect</h4>
                        <div style={{ display: 'flex', gap: '1.5rem', color: '#888' }} className="footer-socials">
                            <a href="https://www.facebook.com/share/1C9AJmW9cS/?mibextid=wwXIfr" target="_blank" rel="noreferrer" aria-label="Facebook" className="footer-link"><Facebook size={24} strokeWidth={1.5} /></a>
                            <a href="https://www.instagram.com/sayo_lk?igsh=N2prY28zcjR0M3Rq" target="_blank" rel="noreferrer" aria-label="Instagram" className="footer-link"><Instagram size={24} strokeWidth={1.5} /></a>
                            <a href="https://www.tiktok.com/@sayo.lk?_r=1&_t=ZS-93aFxkUwvyO" target="_blank" rel="noreferrer" aria-label="TikTok" className="footer-link"><Music2 size={24} strokeWidth={1.5} /></a>
                            <a href="https://whatsapp.com/channel/0029VbBfjv74IBhNT1E2jR3M" target="_blank" rel="noreferrer" aria-label="WhatsApp Channel" className="footer-link"><MessageCircle size={24} strokeWidth={1.5} /></a>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container-wide footer-bottom" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#666', fontSize: '0.875rem', letterSpacing: '0.05em' }}>
                <p>&copy; {new Date().getFullYear()} Sayoshopping. All rights reserved.</p>
                <div style={{ display: 'flex', gap: '2rem' }}>
                    <span>Colombo, Sri Lanka</span>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                .footer-link:hover { color: white !important; }
                .footer-link { transition: color 0.3s; }
                @media (max-width: 768px) {
                  .footer-grid { grid-template-columns: 1fr !important; gap: 3rem !important; }
                  .footer-section { padding-right: 0 !important; }
                  .footer-bottom { flex-direction: column; gap: 1rem; text-align: center; }
                  .footer-socials { justify-content: flex-start; }
                }
            `}} />
        </footer>
    );
}
