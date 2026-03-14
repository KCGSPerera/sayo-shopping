import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";

export const metadata = {
    title: "Privacy Policy | Sayoshopping",
};

export default function PrivacyPolicy() {
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
                    src="/assets/legal/privacy-background.jpg"
                    alt="Privacy Policy background"
                    fill
                    style={{ objectFit: 'cover', objectPosition: 'center' }}
                    sizes="100vw"
                    priority
                />
                <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)' }}></div>
                <div className="container-wide" style={{ position: 'relative', zIndex: 10, maxWidth: '1400px', margin: '0 auto' }}>
                    <h1 style={{ color: 'white', fontSize: 'clamp(3.75rem, 6vw, 4.5rem)', marginBottom: '1rem', letterSpacing: '0.02em', lineHeight: 1.1 }}>Privacy Policy</h1>
                    <p style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', letterSpacing: '0.05em', opacity: 0.9, fontStyle: 'italic' }}>Transparency and trust matter to us.</p>
                </div>
            </div>

            <main className="container-wide animate-fade-in" style={{ flex: 1, padding: '4rem 2rem 8rem', maxWidth: '1400px', margin: '0 auto', width: '100%' }}>

                {/* Back Link */}
                <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '4rem', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#666', transition: 'color 0.3s ease' }} className="hover:text-black">
                    <ArrowLeft size={16} /> Back to Home
                </Link>

                <div style={{ backgroundColor: 'white', padding: 'clamp(3rem, 5vw, 6rem)', border: '1px solid #eaeaea', boxShadow: '0 4px 40px rgba(0,0,0,0.02)' }}>

                    <p style={{ fontSize: '1.25rem', lineHeight: '2', marginBottom: '4rem', color: '#555', maxWidth: '900px' }}>
                        At Sayo Shopping, we value your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard your data when you visit or make a purchase from our website.
                    </p>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}>

                        <section style={{ paddingLeft: '2rem', borderLeft: '2px solid #ddd' }}>
                            <h3 style={{ fontSize: '1.75rem', marginBottom: '1.5rem', fontWeight: 600, letterSpacing: '-0.02em' }}>1. Information We Collect</h3>
                            <div style={{ width: '40px', height: '1px', backgroundColor: '#000', marginBottom: '2rem' }}></div>
                            <p style={{ lineHeight: '2', marginBottom: '1.5rem', fontSize: '1.125rem', color: '#444' }}>When you use our website, we may collect the following information:</p>
                            <ul style={{ paddingLeft: '1.5rem', lineHeight: '2', display: 'flex', flexDirection: 'column', gap: '1rem', color: '#555', fontSize: '1.125rem' }}>
                                <li style={{ position: 'relative', paddingLeft: '1.5rem' }}><span style={{ position: 'absolute', left: 0, color: '#aaa' }}>—</span> Full name</li>
                                <li style={{ position: 'relative', paddingLeft: '1.5rem' }}><span style={{ position: 'absolute', left: 0, color: '#aaa' }}>—</span> Contact number</li>
                                <li style={{ position: 'relative', paddingLeft: '1.5rem' }}><span style={{ position: 'absolute', left: 0, color: '#aaa' }}>—</span> Email address</li>
                                <li style={{ position: 'relative', paddingLeft: '1.5rem' }}><span style={{ position: 'absolute', left: 0, color: '#aaa' }}>—</span> Delivery address</li>
                                <li style={{ position: 'relative', paddingLeft: '1.5rem' }}><span style={{ position: 'absolute', left: 0, color: '#aaa' }}>—</span> Order and purchase details</li>
                                <li style={{ position: 'relative', paddingLeft: '1.5rem' }}><span style={{ position: 'absolute', left: 0, color: '#aaa' }}>—</span> Payment-related information (processed securely via third-party payment providers)</li>
                            </ul>
                            <p style={{ lineHeight: '2', marginTop: '2rem', fontSize: '1.125rem', color: '#444' }}>We do not store your card details on our servers.</p>
                        </section>

                        <div style={{ height: '1px', width: '100%', backgroundColor: '#eee' }}></div>

                        <section style={{ paddingLeft: '2rem', borderLeft: '2px solid #ddd' }}>
                            <h3 style={{ fontSize: '1.75rem', marginBottom: '1.5rem', fontWeight: 600, letterSpacing: '-0.02em' }}>2. How We Use Your Information</h3>
                            <div style={{ width: '40px', height: '1px', backgroundColor: '#000', marginBottom: '2rem' }}></div>
                            <p style={{ lineHeight: '2', marginBottom: '1.5rem', fontSize: '1.125rem', color: '#444' }}>We use your information to:</p>
                            <ul style={{ paddingLeft: '1.5rem', lineHeight: '2', display: 'flex', flexDirection: 'column', gap: '1rem', color: '#555', fontSize: '1.125rem' }}>
                                <li style={{ position: 'relative', paddingLeft: '1.5rem' }}><span style={{ position: 'absolute', left: 0, color: '#aaa' }}>—</span> Process and deliver orders</li>
                                <li style={{ position: 'relative', paddingLeft: '1.5rem' }}><span style={{ position: 'absolute', left: 0, color: '#aaa' }}>—</span> Communicate order updates</li>
                                <li style={{ position: 'relative', paddingLeft: '1.5rem' }}><span style={{ position: 'absolute', left: 0, color: '#aaa' }}>—</span> Provide customer support</li>
                                <li style={{ position: 'relative', paddingLeft: '1.5rem' }}><span style={{ position: 'absolute', left: 0, color: '#aaa' }}>—</span> Improve our website and services</li>
                                <li style={{ position: 'relative', paddingLeft: '1.5rem' }}><span style={{ position: 'absolute', left: 0, color: '#aaa' }}>—</span> Send promotional messages (only if you choose to receive them)</li>
                            </ul>
                        </section>

                        <div style={{ height: '1px', width: '100%', backgroundColor: '#eee' }}></div>

                        <section style={{ paddingLeft: '2rem', borderLeft: '2px solid #ddd' }}>
                            <h3 style={{ fontSize: '1.75rem', marginBottom: '1.5rem', fontWeight: 600, letterSpacing: '-0.02em' }}>3. Payment Security</h3>
                            <div style={{ width: '40px', height: '1px', backgroundColor: '#000', marginBottom: '2rem' }}></div>
                            <p style={{ lineHeight: '2', fontSize: '1.125rem', color: '#444' }}>All online payments are handled through secure and trusted payment gateways. Sayo Shopping does not have access to or store sensitive payment details such as card numbers.</p>
                        </section>

                        <div style={{ height: '1px', width: '100%', backgroundColor: '#eee' }}></div>

                        <section style={{ paddingLeft: '2rem', borderLeft: '2px solid #ddd' }}>
                            <h3 style={{ fontSize: '1.75rem', marginBottom: '1.5rem', fontWeight: 600, letterSpacing: '-0.02em' }}>4. Sharing of Information</h3>
                            <div style={{ width: '40px', height: '1px', backgroundColor: '#000', marginBottom: '2rem' }}></div>
                            <p style={{ lineHeight: '2', marginBottom: '1.5rem', fontSize: '1.125rem', color: '#444' }}>We do not sell, trade, or rent your personal information to third parties. Your information may only be shared with:</p>
                            <ul style={{ paddingLeft: '1.5rem', lineHeight: '2', display: 'flex', flexDirection: 'column', gap: '1rem', color: '#555', fontSize: '1.125rem' }}>
                                <li style={{ position: 'relative', paddingLeft: '1.5rem' }}><span style={{ position: 'absolute', left: 0, color: '#aaa' }}>—</span> Courier partners (for delivery purposes)</li>
                                <li style={{ position: 'relative', paddingLeft: '1.5rem' }}><span style={{ position: 'absolute', left: 0, color: '#aaa' }}>—</span> Payment service providers (for order processing)</li>
                                <li style={{ position: 'relative', paddingLeft: '1.5rem' }}><span style={{ position: 'absolute', left: 0, color: '#aaa' }}>—</span> Legal authorities if required by law</li>
                            </ul>
                        </section>

                        <div style={{ height: '1px', width: '100%', backgroundColor: '#eee' }}></div>

                        <section style={{ paddingLeft: '2rem', borderLeft: '2px solid #ddd' }}>
                            <h3 style={{ fontSize: '1.75rem', marginBottom: '1.5rem', fontWeight: 600, letterSpacing: '-0.02em' }}>5. Cookies</h3>
                            <div style={{ width: '40px', height: '1px', backgroundColor: '#000', marginBottom: '2rem' }}></div>
                            <p style={{ lineHeight: '2', marginBottom: '1.5rem', fontSize: '1.125rem', color: '#444' }}>Our website may use cookies to:</p>
                            <ul style={{ paddingLeft: '1.5rem', lineHeight: '2', display: 'flex', flexDirection: 'column', gap: '1rem', color: '#555', fontSize: '1.125rem' }}>
                                <li style={{ position: 'relative', paddingLeft: '1.5rem' }}><span style={{ position: 'absolute', left: 0, color: '#aaa' }}>—</span> Improve user experience</li>
                                <li style={{ position: 'relative', paddingLeft: '1.5rem' }}><span style={{ position: 'absolute', left: 0, color: '#aaa' }}>—</span> Analyze website traffic</li>
                                <li style={{ position: 'relative', paddingLeft: '1.5rem' }}><span style={{ position: 'absolute', left: 0, color: '#aaa' }}>—</span> Remember user preferences</li>
                            </ul>
                            <p style={{ lineHeight: '2', marginTop: '2rem', fontSize: '1.125rem', color: '#444' }}>You may disable cookies in your browser settings if you prefer.</p>
                        </section>

                        <div style={{ height: '1px', width: '100%', backgroundColor: '#eee' }}></div>

                        <section style={{ paddingLeft: '2rem', borderLeft: '2px solid #ddd' }}>
                            <h3 style={{ fontSize: '1.75rem', marginBottom: '1.5rem', fontWeight: 600, letterSpacing: '-0.02em' }}>6. Data Protection</h3>
                            <div style={{ width: '40px', height: '1px', backgroundColor: '#000', marginBottom: '2rem' }}></div>
                            <p style={{ lineHeight: '2', fontSize: '1.125rem', color: '#444' }}>We take reasonable measures to protect your personal information against unauthorized access, loss, or misuse. Access to customer data is limited to authorized personnel only.</p>
                        </section>

                        <div style={{ height: '1px', width: '100%', backgroundColor: '#eee' }}></div>

                        <section style={{ paddingLeft: '2rem', borderLeft: '2px solid #ddd' }}>
                            <h3 style={{ fontSize: '1.75rem', marginBottom: '1.5rem', fontWeight: 600, letterSpacing: '-0.02em' }}>7. Your Rights</h3>
                            <div style={{ width: '40px', height: '1px', backgroundColor: '#000', marginBottom: '2rem' }}></div>
                            <p style={{ lineHeight: '2', marginBottom: '1.5rem', fontSize: '1.125rem', color: '#444' }}>You have the right to:</p>
                            <ul style={{ paddingLeft: '1.5rem', lineHeight: '2', display: 'flex', flexDirection: 'column', gap: '1rem', color: '#555', fontSize: '1.125rem' }}>
                                <li style={{ position: 'relative', paddingLeft: '1.5rem' }}><span style={{ position: 'absolute', left: 0, color: '#aaa' }}>—</span> Request access to your personal data</li>
                                <li style={{ position: 'relative', paddingLeft: '1.5rem' }}><span style={{ position: 'absolute', left: 0, color: '#aaa' }}>—</span> Request correction or deletion of your data</li>
                                <li style={{ position: 'relative', paddingLeft: '1.5rem' }}><span style={{ position: 'absolute', left: 0, color: '#aaa' }}>—</span> Opt out of promotional communications at any time</li>
                            </ul>
                        </section>

                        <div style={{ height: '1px', width: '100%', backgroundColor: '#eee' }}></div>

                        <section style={{ paddingLeft: '2rem', borderLeft: '2px solid #ddd' }}>
                            <h3 style={{ fontSize: '1.75rem', marginBottom: '1.5rem', fontWeight: 600, letterSpacing: '-0.02em' }}>8. External Links</h3>
                            <div style={{ width: '40px', height: '1px', backgroundColor: '#000', marginBottom: '2rem' }}></div>
                            <p style={{ lineHeight: '2', fontSize: '1.125rem', color: '#444' }}>Our website may contain links to third-party websites. Sayo Shopping is not responsible for the privacy practices or content of those external sites.</p>
                        </section>

                        <div style={{ height: '1px', width: '100%', backgroundColor: '#eee' }}></div>

                        <section style={{ paddingLeft: '2rem', borderLeft: '2px solid #ddd' }}>
                            <h3 style={{ fontSize: '1.75rem', marginBottom: '1.5rem', fontWeight: 600, letterSpacing: '-0.02em' }}>9. Changes to This Policy</h3>
                            <div style={{ width: '40px', height: '1px', backgroundColor: '#000', marginBottom: '2rem' }}></div>
                            <p style={{ lineHeight: '2', fontSize: '1.125rem', color: '#444' }}>We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated revision date.</p>
                        </section>

                        <div style={{ height: '1px', width: '100%', backgroundColor: '#eee' }}></div>

                        <section style={{ paddingLeft: '2rem', borderLeft: '2px solid #ddd' }}>
                            <h3 style={{ fontSize: '1.75rem', marginBottom: '1.5rem', fontWeight: 600, letterSpacing: '-0.02em' }}>10. Contact Us</h3>
                            <div style={{ width: '40px', height: '1px', backgroundColor: '#000', marginBottom: '2rem' }}></div>
                            <p style={{ lineHeight: '2', marginBottom: '1.5rem', fontSize: '1.125rem', color: '#444' }}>If you have any questions regarding this Privacy Policy, please contact us:</p>
                            <ul style={{ paddingLeft: '0', lineHeight: '2.5', display: 'flex', flexDirection: 'column', gap: '0.5rem', listStyleType: 'none', fontSize: '1.125rem', color: '#555' }}>
                                <li><strong style={{ color: '#000' }}>Email:</strong> <a href="mailto:support@sayoshopping.lk" style={{ textDecoration: 'none', borderBottom: '1px solid #ccc', paddingBottom: '2px' }} className="hover:border-black transition-colors">support@sayoshopping.lk</a></li>
                                <li><strong style={{ color: '#000' }}>Website:</strong> <a href="https://www.sayoshopping.lk" style={{ textDecoration: 'none', borderBottom: '1px solid #ccc', paddingBottom: '2px' }} className="hover:border-black transition-colors">www.sayoshopping.lk</a></li>
                            </ul>
                        </section>

                        {/* Final CTA / Note Section */}
                        <div style={{ marginTop: '4rem', padding: '4rem', backgroundColor: '#fcfcfc', borderTop: '1px solid #eaeaea', textAlign: 'center' }}>
                            <p style={{ lineHeight: '2', color: '#666', fontSize: '1.125rem', fontFamily: 'var(--font-serif)', fontStyle: 'italic', maxWidth: '600px', margin: '0 auto' }}>
                                By using our website, you agree to the terms outlined in this Privacy Policy.
                            </p>
                        </div>

                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
