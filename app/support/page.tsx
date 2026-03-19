import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, MessageCircle, ShoppingBag, CreditCard, RefreshCw, Gem, Sparkles, HelpCircle, ShieldCheck } from "lucide-react";

export const metadata = {
    title: "Support Center | Customer Assistance | Sayoshopping",
    description: "Visit the Sayo Shopping Support Center for help with orders, payments, delivery, and jewellery care tips.",
};

export default function SupportCenter() {
    return (
        <div style={{ backgroundColor: '#fafafa', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Navbar />

            {/* Elegant Page Header */}
            <div style={{
                position: 'relative',
                padding: '140px 2rem',
                color: 'white',
                overflow: 'hidden'
            }}>
                <Image
                    src="/assets/support/support-hero.jpg"
                    alt="Support Center background"
                    fill
                    style={{ objectFit: 'cover', objectPosition: 'center' }}
                    sizes="100vw"
                    priority
                />
                <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.6)' }}></div>
                <div className="container" style={{ position: 'relative', zIndex: 10, maxWidth: '800px', margin: '0 auto' }}>
                    <p style={{ textTransform: "uppercase", letterSpacing: "0.15em", fontSize: "0.875rem", color: "#ddd", marginBottom: "1rem", textAlign: 'center' }}>SUPPORT CENTER</p>
                    <h1 style={{ color: 'white', fontSize: 'clamp(2.5rem, 5vw, 4rem)', marginBottom: '3rem', textAlign: 'center' }}>We’re Here to Help You</h1>
                    <p style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', letterSpacing: '0.05em', opacity: 0.9, fontStyle: 'italic', textAlign: 'center' }}>Dedicated assistance for our valued customers.</p>
                </div>
            </div>

            <main className="container-wide animate-fade-in" style={{ flex: 1, padding: '4rem 2rem 8rem', maxWidth: '1400px', margin: '0 auto', width: '100%' }}>

                {/* Back Link */}
                <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '4rem', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#666', transition: 'color 0.3s ease' }} className="hover:text-black">
                    <ArrowLeft size={16} /> Back to Home
                </Link>

                <div style={{ backgroundColor: 'white', padding: 'clamp(3rem, 5vw, 6rem)', border: '1px solid #eaeaea', boxShadow: '0 4px 40px rgba(0,0,0,0.02)' }}>

                    <p style={{ fontSize: '1.25rem', lineHeight: '2', marginBottom: '4rem', color: '#555', maxWidth: '900px' }}>
                        At Sayo Shopping, your satisfaction is our priority. Our Support Center is designed to help you with orders, payments, delivery, and product-related questions quickly and easily.
                    </p>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}>

                        {/* Core Support Layout Grid */}
                        <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '3rem', marginBottom: '2rem' }}>

                            {/* Contact Block */}
                            <div style={{ padding: '3rem 2rem', border: '1px solid #eee', backgroundColor: '#fafafa', display: 'flex', flexDirection: 'column', height: '100%' }}>
                                <MessageCircle size={32} strokeWidth={1.5} style={{ marginBottom: '1.5rem', color: '#111' }} />
                                <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', fontWeight: 600 }}>Contact Us</h3>
                                <p style={{ color: '#555', lineHeight: 1.8, marginBottom: '1.5rem', fontSize: '1.125rem' }}>Need help? Reach out to us through any of the options below:</p>
                                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2rem 0', color: '#444', lineHeight: 2, flex: 1, fontSize: '1.125rem' }}>
                                    <li style={{ borderBottom: '1px solid #eaeaea', paddingBottom: '0.5rem', marginBottom: '0.5rem' }}>📧 <strong style={{ color: '#111' }}>Email:</strong> support@sayoshopping.lk</li>
                                    <li style={{ borderBottom: '1px solid #eaeaea', paddingBottom: '0.5rem', marginBottom: '0.5rem' }}>📱 <strong style={{ color: '#111' }}>WhatsApp:</strong> Available via the button on our website</li>
                                    <li style={{ borderBottom: '1px solid #eaeaea', paddingBottom: '0.5rem', marginBottom: '0.5rem' }}>☎️ <strong style={{ color: '#111' }}>Phone:</strong> +94 71 580 4185</li>
                                    <li style={{ borderBottom: '1px solid #eaeaea', paddingBottom: '0.5rem', marginBottom: '0.5rem' }}>🕒 <strong style={{ color: '#111' }}>Support Hours:</strong> 24/7 Support</li>
                                </ul>
                                <p style={{ color: '#666', lineHeight: 1.8, marginBottom: '1.5rem', fontStyle: 'italic', fontFamily: 'var(--font-serif)' }}>Our team will respond as quickly as possible.</p>
                                <a href="https://wa.me/94715804185" target="_blank" rel="noreferrer" className="btn btn-primary" style={{ textAlign: 'center' }}>Message on WhatsApp</a>
                            </div>

                            {/* Order Assistance */}
                            <div style={{ padding: '3rem 2rem', border: '1px solid #eee', backgroundColor: '#fafafa', display: 'flex', flexDirection: 'column', height: '100%' }}>
                                <ShoppingBag size={32} strokeWidth={1.5} style={{ marginBottom: '1.5rem', color: '#111' }} />
                                <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', fontWeight: 600 }}>Order Assistance</h3>
                                <p style={{ color: '#555', lineHeight: 1.8, marginBottom: '1.5rem', fontSize: '1.125rem' }}>Need help with your order? We can assist with:</p>
                                <ul style={{ paddingLeft: '1.5rem', margin: '0 0 2rem 0', color: '#444', lineHeight: 2, flex: 1, fontSize: '1.125rem' }}>
                                    <li style={{ position: 'relative' }}><span style={{ position: 'absolute', left: '-1.5rem', color: '#aaa' }}>—</span> How to place an order</li>
                                    <li style={{ position: 'relative' }}><span style={{ position: 'absolute', left: '-1.5rem', color: '#aaa' }}>—</span> Order confirmation issues</li>
                                    <li style={{ position: 'relative' }}><span style={{ position: 'absolute', left: '-1.5rem', color: '#aaa' }}>—</span> Checking order status</li>
                                    <li style={{ position: 'relative' }}><span style={{ position: 'absolute', left: '-1.5rem', color: '#aaa' }}>—</span> Modifying orders (before dispatch)</li>
                                </ul>
                                <p style={{ color: '#666', lineHeight: 1.8, marginBottom: '1.5rem', fontStyle: 'italic', fontFamily: 'var(--font-serif)' }}>For faster assistance, please include your order number when contacting us.</p>
                                <Link href="/shipping" className="btn btn-outline" style={{ textAlign: 'center', backgroundColor: 'transparent', border: '1px solid #000' }}>View Shipping Info</Link>
                            </div>

                            {/* Payment Support */}
                            <div style={{ padding: '3rem 2rem', border: '1px solid #eee', backgroundColor: '#fafafa', display: 'flex', flexDirection: 'column', height: '100%' }}>
                                <CreditCard size={32} strokeWidth={1.5} style={{ marginBottom: '1.5rem', color: '#111' }} />
                                <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', fontWeight: 600 }}>Payment Support</h3>
                                <p style={{ color: '#555', lineHeight: 1.8, marginBottom: '1.5rem', fontSize: '1.125rem' }}>We currently accept:</p>
                                <ul style={{ paddingLeft: '1.5rem', margin: '0 0 2rem 0', color: '#444', lineHeight: 2, flex: 1, fontSize: '1.125rem' }}>
                                    <li style={{ position: 'relative' }}><span style={{ position: 'absolute', left: '-1.5rem', color: '#aaa' }}>—</span> Cash on Delivery (COD)</li>
                                    <li style={{ position: 'relative' }}><span style={{ position: 'absolute', left: '-1.5rem', color: '#aaa' }}>—</span> Bank transfers</li>
                                    <li style={{ position: 'relative' }}><span style={{ position: 'absolute', left: '-1.5rem', color: '#aaa' }}>—</span> Online payment options available at checkout</li>
                                </ul>
                                <p style={{ color: '#666', lineHeight: 1.8, marginBottom: '1.5rem', fontStyle: 'italic', fontFamily: 'var(--font-serif)' }}>If you experience a failed payment or have questions regarding payment methods, our support team is happy to assist.</p>
                                <Link href="/terms" className="btn btn-outline" style={{ textAlign: 'center', backgroundColor: 'transparent', border: '1px solid #000' }}>View Terms</Link>
                            </div>
                        </div>

                        <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))', gap: '3rem', marginBottom: '2rem' }}>

                            {/* Exchanges Block */}
                            <div style={{ padding: '3rem 2rem', borderLeft: '2px solid #ddd', display: 'flex', alignItems: 'flex-start', gap: '2rem' }}>
                                <RefreshCw size={36} strokeWidth={1.5} style={{ marginTop: '0.25rem', color: '#111', flexShrink: 0 }} />
                                <div>
                                    <h3 style={{ fontSize: '1.75rem', marginBottom: '1rem', fontWeight: 600, letterSpacing: '-0.02em' }}>Exchanges</h3>
                                    <div style={{ width: '40px', height: '1px', backgroundColor: '#000', marginBottom: '1.5rem' }}></div>
                                    <p style={{ color: '#444', lineHeight: 2, marginBottom: '1.5rem', fontSize: '1.125rem' }}>Your satisfaction matters to us.</p>
                                    <ul style={{ paddingLeft: '1.5rem', margin: '0 0 2rem 0', color: '#555', lineHeight: 2, fontSize: '1.125rem' }}>
                                        <li style={{ position: 'relative' }}><span style={{ position: 'absolute', left: '-1.5rem', color: '#aaa' }}>—</span> Exchanges are accepted only for damaged or incorrect items</li>
                                        <li style={{ position: 'relative' }}><span style={{ position: 'absolute', left: '-1.5rem', color: '#aaa' }}>—</span> You must contact us within 24 hours of delivery</li>
                                        <li style={{ position: 'relative' }}><span style={{ position: 'absolute', left: '-1.5rem', color: '#aaa' }}>—</span> Clear photos of the issue are required</li>
                                        <li style={{ position: 'relative' }}><span style={{ position: 'absolute', left: '-1.5rem', color: '#aaa' }}>—</span> Items must be unused and in original packaging</li>
                                    </ul>
                                    <p style={{ color: '#666', lineHeight: 1.8, fontStyle: 'italic', fontFamily: 'var(--font-serif)' }}>Please refer to our Returns Policy for full details.</p>
                                </div>
                            </div>

                            {/* Product & Quality Support */}
                            <div style={{ padding: '3rem 2rem', borderLeft: '2px solid #ddd', display: 'flex', alignItems: 'flex-start', gap: '2rem' }}>
                                <Gem size={36} strokeWidth={1.5} style={{ marginTop: '0.25rem', color: '#111', flexShrink: 0 }} />
                                <div>
                                    <h3 style={{ fontSize: '1.75rem', marginBottom: '1rem', fontWeight: 600, letterSpacing: '-0.02em' }}>Product & Quality Support</h3>
                                    <div style={{ width: '40px', height: '1px', backgroundColor: '#000', marginBottom: '1.5rem' }}></div>
                                    <p style={{ color: '#444', lineHeight: 2, marginBottom: '1.5rem', fontSize: '1.125rem' }}>Our jewellery is crafted using imported 18K gold-plated stainless steel, designed for durability and everyday elegance.</p>
                                    <p style={{ color: '#444', lineHeight: 2, marginBottom: '1.5rem', fontSize: '1.125rem' }}>If you need help with:</p>
                                    <ul style={{ paddingLeft: '1.5rem', margin: '0 0 2rem 0', color: '#555', lineHeight: 2, fontSize: '1.125rem' }}>
                                        <li style={{ position: 'relative' }}><span style={{ position: 'absolute', left: '-1.5rem', color: '#aaa' }}>—</span> Product details</li>
                                        <li style={{ position: 'relative' }}><span style={{ position: 'absolute', left: '-1.5rem', color: '#aaa' }}>—</span> Jewellery care tips</li>
                                        <li style={{ position: 'relative' }}><span style={{ position: 'absolute', left: '-1.5rem', color: '#aaa' }}>—</span> Skin-sensitivity concerns</li>
                                    </ul>
                                    <p style={{ color: '#666', lineHeight: 1.8, fontStyle: 'italic', fontFamily: 'var(--font-serif)' }}>Our team is here to guide you.</p>
                                </div>
                            </div>

                        </div>

                        <div style={{ height: '1px', width: '100%', backgroundColor: '#eee', margin: '2rem 0' }}></div>

                        {/* Jewellery Care Section */}
                        <div className="grid jewellery-care-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
                            <div style={{ paddingRight: '2rem' }}>
                                <h2 style={{ fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', marginBottom: '1rem', letterSpacing: '-0.02em' }}>Jewellery Care Tips</h2>
                                <div style={{ width: '60px', height: '2px', backgroundColor: '#000', marginBottom: '3rem' }}></div>

                                <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                                    <li style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
                                        <Sparkles size={24} strokeWidth={1.5} style={{ color: '#111', flexShrink: 0, marginTop: '0.25rem' }} />
                                        <div>
                                            <h4 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', fontWeight: 600 }}>Avoid Chemicals</h4>
                                            <p style={{ color: '#555', lineHeight: 1.8, fontSize: '1.125rem' }}>Avoid contact with water, perfumes, and chemicals.</p>
                                        </div>
                                    </li>
                                    <li style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
                                        <Sparkles size={24} strokeWidth={1.5} style={{ color: '#111', flexShrink: 0, marginTop: '0.25rem' }} />
                                        <div>
                                            <h4 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', fontWeight: 600 }}>Active Lifestyle</h4>
                                            <p style={{ color: '#555', lineHeight: 1.8, fontSize: '1.125rem' }}>Remove jewellery before bathing or exercising.</p>
                                        </div>
                                    </li>
                                    <li style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
                                        <Sparkles size={24} strokeWidth={1.5} style={{ color: '#111', flexShrink: 0, marginTop: '0.25rem' }} />
                                        <div>
                                            <h4 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', fontWeight: 600 }}>Proper Storage</h4>
                                            <p style={{ color: '#555', lineHeight: 1.8, fontSize: '1.125rem' }}>Store in a dry place.</p>
                                        </div>
                                    </li>
                                    <li style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
                                        <Sparkles size={24} strokeWidth={1.5} style={{ color: '#111', flexShrink: 0, marginTop: '0.25rem' }} />
                                        <div>
                                            <h4 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', fontWeight: 600 }}>Gentle Cleaning</h4>
                                            <p style={{ color: '#555', lineHeight: 1.8, fontSize: '1.125rem' }}>Wipe gently with a soft cloth after use.</p>
                                        </div>
                                    </li>
                                </ul>
                                <p style={{ color: '#666', lineHeight: 1.8, fontSize: '1.125rem', marginTop: '3rem', fontStyle: 'italic', fontFamily: 'var(--font-serif)', padding: '1.5rem', backgroundColor: '#fafafa', borderLeft: '2px solid #ddd' }}>
                                    "Proper care helps maintain the gold-plated finish for longer."
                                </p>
                            </div>
                            <div className="hover-zoom" style={{ backgroundColor: "#f5f5f5", aspectRatio: "4/5", position: "relative", overflow: "hidden" }}>
                                <Image
                                    src="/assets/support/jewellery-care.jpg"
                                    alt="Jewellery care tips"
                                    fill
                                    style={{ objectFit: 'cover', objectPosition: 'center' }}
                                    sizes="50vw"
                                />
                            </div>
                        </div>

                        <div style={{ height: '1px', width: '100%', backgroundColor: '#eee', margin: '2rem 0' }}></div>

                        {/* FAQ and Promise */}
                        <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '4rem' }}>

                            <div style={{ padding: '3rem', border: '1px solid #eee', backgroundColor: '#fafafa' }}>
                                <HelpCircle size={40} strokeWidth={1.5} style={{ marginBottom: '1.5rem', color: '#111' }} />
                                <h3 style={{ fontSize: '1.75rem', marginBottom: '1.5rem', fontWeight: 600, letterSpacing: '-0.02em' }}>Frequently Asked Questions</h3>
                                <p style={{ color: '#555', lineHeight: 2, fontSize: '1.125rem', marginBottom: '2rem' }}>Many common questions are answered in our FAQs section.</p>
                                <Link href="/support" className="btn btn-outline" style={{ display: 'inline-block', backgroundColor: 'transparent', border: '1px solid #000' }}>View FAQs (Placeholder)</Link>
                            </div>

                            <div style={{ padding: '3rem', border: '1px solid #eee', backgroundColor: '#111', color: 'white' }}>
                                <ShieldCheck size={40} strokeWidth={1.5} style={{ marginBottom: '1.5rem', color: 'white' }} />
                                <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem', marginBottom: '1.5rem' }}>Our Promise</h2>
                                <p style={{ color: '#ccc', lineHeight: 2, fontSize: '1.125rem', marginBottom: '2rem' }}>
                                    At Sayo Shopping, we believe in transparency, quality, and reliable customer service. We are committed to providing honest product information and dependable support at every step of your shopping experience.
                                </p>
                                <a href="https://wa.me/94715804185" target="_blank" rel="noreferrer" className="btn" style={{ display: 'inline-block', backgroundColor: 'white', color: 'black' }}>Need Help Now?</a>
                            </div>

                        </div>

                    </div>
                </div>
            </main>
            <style dangerouslySetInnerHTML={{
                __html: `
                @media (max-width: 1024px) {
                    .container-wide { padding-left: 1.5rem !important; padding-right: 1.5rem !important; }
                    .jewellery-care-grid { grid-template-columns: 1fr !important; gap: 3rem !important; }
                }
                @media (max-width: 768px) {
                    div[style*="padding: 140px 2rem"] { padding: 80px 1rem !important; }
                    main { padding-top: 2rem !important; padding-bottom: 4rem !important; }
                    div[style*="padding: clamp(3rem, 5vw, 6rem)"] { padding: 2rem 1.5rem !important; }
                    .grid { grid-template-columns: 1fr !important; gap: 2rem !important; }
                    .jewellery-care-grid h2 { font-size: 2.25rem !important; }
                    h3 { font-size: 1.5rem !important; }
                    p, li { font-size: 1rem !important; }
                    div[style*="padding: 3rem 2rem"] { padding: 2rem 1.5rem !important; }
                    div[style*="padding: 3rem"] { padding: 2rem 1.5rem !important; }
                    div[style*="gap: 2rem"] { gap: 1rem !important; flex-direction: column !important; }
                }
                @media (max-width: 350px) {
                    div[style*="padding: clamp(3rem, 5vw, 6rem)"] { padding: 1.5rem 1rem !important; }
                    h3 { font-size: 1.25rem !important; }
                    .jewellery-care-grid h2 { font-size: 1.75rem !important; }
                    p, li { font-size: 0.9rem !important; }
                    div[style*="padding: 3rem 2rem"] { padding: 1.5rem 1rem !important; }
                }
            `}} />
            <Footer />
        </div>
    );
}
