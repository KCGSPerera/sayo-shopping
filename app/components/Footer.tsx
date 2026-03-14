import Link from "next/link";
import { Facebook, Instagram, Music2, MessageCircle } from "lucide-react"; // Music2 as TikTok approximation

export default function Footer() {
    return (
        <footer style={{ backgroundColor: 'var(--accent-dark)', color: 'white', paddingTop: '8rem', paddingBottom: '3rem' }}>
            <div className="container-wide" style={{ marginBottom: '6rem' }}>
                <h2 style={{ fontSize: 'clamp(3rem, 8vw, 6rem)', fontFamily: 'var(--font-serif)', color: 'white', marginBottom: '4rem', letterSpacing: '-0.02em', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '2rem' }}>
                    SAYOSHOPPING
                </h2>

                <div className="grid grid-cols-4" style={{ gap: '4rem' }}>
                    {/* Brand Meta */}
                    <div style={{ paddingRight: '2rem' }}>
                        <p style={{ color: '#888', fontSize: '1rem', lineHeight: 2 }}>
                            Elevating your style with elegant, luxurious, and timeless jewellery pieces. Perfect for every occasion.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 style={{ color: 'white', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '2rem' }}>Explore</h4>
                        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1.25rem', color: '#888', fontSize: '1rem' }}>
                            <li><Link href="/jewellery" style={{ transition: 'color 0.3s' }} className="footer-link">All Jewellery</Link></li>
                            <li><Link href="/about" style={{ transition: 'color 0.3s' }} className="footer-link">Our Story</Link></li>
                            <li><Link href="/contact" style={{ transition: 'color 0.3s' }} className="footer-link">Contact</Link></li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h4 style={{ color: 'white', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '2rem' }}>Support</h4>
                        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1.25rem', color: '#888', fontSize: '1rem' }}>
                            <li><Link href="/shipping" style={{ transition: 'color 0.3s' }} className="footer-link">Shipping & Delivery</Link></li>
                            <li><Link href="/terms" style={{ transition: 'color 0.3s' }} className="footer-link">Terms & Conditions</Link></li>
                            <li><Link href="/privacy" style={{ transition: 'color 0.3s' }} className="footer-link">Privacy Policy</Link></li>
                            <li><Link href="/support" style={{ transition: 'color 0.3s' }} className="footer-link">Support Center</Link></li>
                        </ul>
                    </div>

                    {/* Social */}
                    <div>
                        <h4 style={{ color: 'white', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '2rem' }}>Connect</h4>
                        <div style={{ display: 'flex', gap: '1.5rem', color: '#888' }}>
                            <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook" className="footer-link"><Facebook size={24} strokeWidth={1.5} /></a>
                            <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram" className="footer-link"><Instagram size={24} strokeWidth={1.5} /></a>
                            <a href="https://tiktok.com" target="_blank" rel="noreferrer" aria-label="TikTok" className="footer-link"><Music2 size={24} strokeWidth={1.5} /></a>
                            <a href="https://wa.me/94715804185" target="_blank" rel="noreferrer" aria-label="WhatsApp" className="footer-link"><MessageCircle size={24} strokeWidth={1.5} /></a>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container-wide" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#666', fontSize: '0.875rem', letterSpacing: '0.05em' }}>
                <p>&copy; {new Date().getFullYear()} Sayoshopping. All rights reserved.</p>
                <div style={{ display: 'flex', gap: '2rem' }}>
                    <span>Colombo, Sri Lanka</span>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                .footer-link:hover { color: white !important; }
            `}} />
        </footer>
    );
}
