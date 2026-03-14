import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";

export const metadata = {
    title: "Terms & Conditions | Sayoshopping",
};

export default function TermsAndConditions() {
    return (
        <div style={{ backgroundColor: '#fafafa', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Navbar />

            {/* Elegant Page Header */}
            <div style={{
                position: 'relative',
                padding: '140px 2rem',
                color: '#111',
                overflow: 'hidden'
            }}>
                <Image
                    src="/assets/legal/terms-background.jpg"
                    alt="Terms and Conditions background"
                    fill
                    style={{ objectFit: 'cover', objectPosition: 'center' }}
                    sizes="100vw"
                    priority
                />
                <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(255,255,255,0.7)' }}></div>
                <div className="container" style={{ position: 'relative', zIndex: 10, maxWidth: '800px', margin: '0 auto' }}>
                    <h1 style={{ color: '#111', fontSize: 'clamp(2.5rem, 5vw, 4rem)', marginBottom: '3rem', textAlign: 'center' }}>Terms & Conditions</h1>
                    <p style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', letterSpacing: '0.05em', opacity: 0.9, fontStyle: 'italic', color: '#555' }}>Clarity and commitment to our customers.</p>
                </div>
            </div>

            <main className="container-wide animate-fade-in" style={{ flex: 1, padding: '4rem 2rem 8rem', maxWidth: '1400px', margin: '0 auto', width: '100%' }}>

                {/* Back Link */}
                <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '4rem', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#666', transition: 'color 0.3s ease' }} className="hover:text-black">
                    <ArrowLeft size={16} /> Back to Home
                </Link>

                <div style={{ backgroundColor: 'white', padding: 'clamp(3rem, 5vw, 6rem)', border: '1px solid #eaeaea', boxShadow: '0 4px 40px rgba(0,0,0,0.02)' }}>

                    <p style={{ fontSize: '1.25rem', lineHeight: '2', marginBottom: '4rem', color: '#555', maxWidth: '900px' }}>
                        Welcome to Sayo Shopping. By accessing or using our website, you agree to be bound by the following Terms & Conditions. Please read them carefully before placing an order.
                    </p>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}>

                        <section style={{ paddingLeft: '2rem', borderLeft: '2px solid #ddd' }}>
                            <h3 style={{ fontSize: '1.75rem', marginBottom: '1.5rem', fontWeight: 600, letterSpacing: '-0.02em', display: 'flex', alignItems: 'baseline', gap: '0.75rem' }}>
                                <span style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem', color: '#ccc', fontWeight: 400 }}>01.</span> General
                            </h3>
                            <div style={{ width: '40px', height: '1px', backgroundColor: '#000', marginBottom: '2rem' }}></div>
                            <p style={{ lineHeight: '2', fontSize: '1.125rem', color: '#444' }}>These Terms & Conditions apply to all visitors, users, and customers of Sayo Shopping. By using this website, you confirm that you are at least 18 years of age or using the site under the supervision of a parent or guardian.</p>
                        </section>

                        <div style={{ height: '1px', width: '100%', backgroundColor: '#eee' }}></div>

                        <section style={{ paddingLeft: '2rem', borderLeft: '2px solid #ddd' }}>
                            <h3 style={{ fontSize: '1.75rem', marginBottom: '1.5rem', fontWeight: 600, letterSpacing: '-0.02em', display: 'flex', alignItems: 'baseline', gap: '0.75rem' }}>
                                <span style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem', color: '#ccc', fontWeight: 400 }}>02.</span> Products & Descriptions
                            </h3>
                            <div style={{ width: '40px', height: '1px', backgroundColor: '#000', marginBottom: '2rem' }}></div>
                            <ul style={{ paddingLeft: '1.5rem', lineHeight: '2', display: 'flex', flexDirection: 'column', gap: '1rem', color: '#555', fontSize: '1.125rem' }}>
                                <li style={{ position: 'relative', paddingLeft: '1.5rem' }}><span style={{ position: 'absolute', left: 0, color: '#aaa' }}>—</span> All products sold on Sayo Shopping are imported 18K gold-plated stainless steel jewellery.</li>
                                <li style={{ position: 'relative', paddingLeft: '1.5rem' }}><span style={{ position: 'absolute', left: 0, color: '#aaa' }}>—</span> Our products are not solid gold.</li>
                                <li style={{ position: 'relative', paddingLeft: '1.5rem' }}><span style={{ position: 'absolute', left: 0, color: '#aaa' }}>—</span> We make every effort to display product images, descriptions, and prices accurately. However, slight variations in color or appearance may occur due to lighting or screen differences.</li>
                            </ul>
                        </section>

                        <div style={{ height: '1px', width: '100%', backgroundColor: '#eee' }}></div>

                        <section style={{ paddingLeft: '2rem', borderLeft: '2px solid #ddd' }}>
                            <h3 style={{ fontSize: '1.75rem', marginBottom: '1.5rem', fontWeight: 600, letterSpacing: '-0.02em', display: 'flex', alignItems: 'baseline', gap: '0.75rem' }}>
                                <span style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem', color: '#ccc', fontWeight: 400 }}>03.</span> Pricing & Payments
                            </h3>
                            <div style={{ width: '40px', height: '1px', backgroundColor: '#000', marginBottom: '2rem' }}></div>
                            <ul style={{ paddingLeft: '1.5rem', lineHeight: '2', display: 'flex', flexDirection: 'column', gap: '1rem', color: '#555', fontSize: '1.125rem' }}>
                                <li style={{ position: 'relative', paddingLeft: '1.5rem' }}><span style={{ position: 'absolute', left: 0, color: '#aaa' }}>—</span> All prices are listed in Sri Lankan Rupees (LKR).</li>
                                <li style={{ position: 'relative', paddingLeft: '1.5rem' }}><span style={{ position: 'absolute', left: 0, color: '#aaa' }}>—</span> Prices are subject to change without prior notice.</li>
                                <li style={{ position: 'relative', paddingLeft: '1.5rem' }}><span style={{ position: 'absolute', left: 0, color: '#aaa' }}>—</span> Payments can be made via:
                                    <ul style={{ paddingLeft: '2rem', marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', listStyleType: 'circle' }}>
                                        <li>Cash on Delivery (COD)</li>
                                        <li>Bank transfer</li>
                                        <li>Online payment methods available at checkout</li>
                                    </ul>
                                </li>
                                <li style={{ position: 'relative', paddingLeft: '1.5rem' }}><span style={{ position: 'absolute', left: 0, color: '#aaa' }}>—</span> Orders will only be processed once payment confirmation is received (where applicable).</li>
                            </ul>
                        </section>

                        <div style={{ height: '1px', width: '100%', backgroundColor: '#eee' }}></div>

                        <section style={{ paddingLeft: '2rem', borderLeft: '2px solid #ddd' }}>
                            <h3 style={{ fontSize: '1.75rem', marginBottom: '1.5rem', fontWeight: 600, letterSpacing: '-0.02em', display: 'flex', alignItems: 'baseline', gap: '0.75rem' }}>
                                <span style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem', color: '#ccc', fontWeight: 400 }}>04.</span> Orders & Confirmation
                            </h3>
                            <div style={{ width: '40px', height: '1px', backgroundColor: '#000', marginBottom: '2rem' }}></div>
                            <ul style={{ paddingLeft: '1.5rem', lineHeight: '2', display: 'flex', flexDirection: 'column', gap: '1rem', color: '#555', fontSize: '1.125rem' }}>
                                <li style={{ position: 'relative', paddingLeft: '1.5rem' }}><span style={{ position: 'absolute', left: 0, color: '#aaa' }}>—</span> Once an order is placed, you will receive an order confirmation via email or phone.</li>
                                <li style={{ position: 'relative', paddingLeft: '1.5rem' }}><span style={{ position: 'absolute', left: 0, color: '#aaa' }}>—</span> We reserve the right to cancel or refuse any order due to product unavailability, pricing errors, or suspected fraudulent activity.</li>
                            </ul>
                        </section>

                        <div style={{ height: '1px', width: '100%', backgroundColor: '#eee' }}></div>

                        <section style={{ paddingLeft: '2rem', borderLeft: '2px solid #ddd' }}>
                            <h3 style={{ fontSize: '1.75rem', marginBottom: '1.5rem', fontWeight: 600, letterSpacing: '-0.02em', display: 'flex', alignItems: 'baseline', gap: '0.75rem' }}>
                                <span style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem', color: '#ccc', fontWeight: 400 }}>05.</span> Delivery
                            </h3>
                            <div style={{ width: '40px', height: '1px', backgroundColor: '#000', marginBottom: '2rem' }}></div>
                            <ul style={{ paddingLeft: '1.5rem', lineHeight: '2', display: 'flex', flexDirection: 'column', gap: '1rem', color: '#555', fontSize: '1.125rem' }}>
                                <li style={{ position: 'relative', paddingLeft: '1.5rem' }}><span style={{ position: 'absolute', left: 0, color: '#aaa' }}>—</span> We offer island-wide delivery within Sri Lanka.</li>
                                <li style={{ position: 'relative', paddingLeft: '1.5rem' }}><span style={{ position: 'absolute', left: 0, color: '#aaa' }}>—</span> Estimated delivery time:
                                    <ul style={{ paddingLeft: '2rem', marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', listStyleType: 'circle' }}>
                                        <li>2–4 working days for main cities</li>
                                        <li>3–5 working days for other areas</li>
                                    </ul>
                                </li>
                                <li style={{ position: 'relative', paddingLeft: '1.5rem' }}><span style={{ position: 'absolute', left: 0, color: '#aaa' }}>—</span> Delivery delays caused by couriers, weather, or unforeseen circumstances are beyond our control.</li>
                            </ul>
                        </section>

                        <div style={{ height: '1px', width: '100%', backgroundColor: '#eee' }}></div>

                        <section style={{ paddingLeft: '2rem', borderLeft: '2px solid #ddd' }}>
                            <h3 style={{ fontSize: '1.75rem', marginBottom: '1.5rem', fontWeight: 600, letterSpacing: '-0.02em', display: 'flex', alignItems: 'baseline', gap: '0.75rem' }}>
                                <span style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem', color: '#ccc', fontWeight: 400 }}>06.</span> Exchanges
                            </h3>
                            <div style={{ width: '40px', height: '1px', backgroundColor: '#000', marginBottom: '2rem' }}></div>
                            <ul style={{ paddingLeft: '1.5rem', lineHeight: '2', display: 'flex', flexDirection: 'column', gap: '1rem', color: '#555', fontSize: '1.125rem' }}>
                                <li style={{ position: 'relative', paddingLeft: '1.5rem' }}><span style={{ position: 'absolute', left: 0, color: '#aaa' }}>—</span> Exchanges are accepted only for damaged or incorrect items.</li>
                                <li style={{ position: 'relative', paddingLeft: '1.5rem' }}><span style={{ position: 'absolute', left: 0, color: '#aaa' }}>—</span> Customers must notify us within 24 hours of delivery with clear photos of the issue.</li>
                                <li style={{ position: 'relative', paddingLeft: '1.5rem' }}><span style={{ position: 'absolute', left: 0, color: '#aaa' }}>—</span> Items must be unused and in original packaging.</li>
                            </ul>
                        </section>

                        <div style={{ height: '1px', width: '100%', backgroundColor: '#eee' }}></div>

                        <section style={{ paddingLeft: '2rem', borderLeft: '2px solid #ddd' }}>
                            <h3 style={{ fontSize: '1.75rem', marginBottom: '1.5rem', fontWeight: 600, letterSpacing: '-0.02em', display: 'flex', alignItems: 'baseline', gap: '0.75rem' }}>
                                <span style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem', color: '#ccc', fontWeight: 400 }}>07.</span> Jewellery Care & Usage
                            </h3>
                            <div style={{ width: '40px', height: '1px', backgroundColor: '#000', marginBottom: '2rem' }}></div>
                            <ul style={{ paddingLeft: '1.5rem', lineHeight: '2', display: 'flex', flexDirection: 'column', gap: '1rem', color: '#555', fontSize: '1.125rem' }}>
                                <li style={{ position: 'relative', paddingLeft: '1.5rem' }}><span style={{ position: 'absolute', left: 0, color: '#aaa' }}>—</span> Gold-plated jewellery may wear over time depending on usage and care.</li>
                                <li style={{ position: 'relative', paddingLeft: '1.5rem' }}><span style={{ position: 'absolute', left: 0, color: '#aaa' }}>—</span> We are not responsible for damage caused by water, chemicals, perfumes, sweat, or improper handling.</li>
                                <li style={{ position: 'relative', paddingLeft: '1.5rem' }}><span style={{ position: 'absolute', left: 0, color: '#aaa' }}>—</span> Care instructions are provided to help extend product lifespan.</li>
                            </ul>
                        </section>

                        <div style={{ height: '1px', width: '100%', backgroundColor: '#eee' }}></div>

                        <section style={{ paddingLeft: '2rem', borderLeft: '2px solid #ddd' }}>
                            <h3 style={{ fontSize: '1.75rem', marginBottom: '1.5rem', fontWeight: 600, letterSpacing: '-0.02em', display: 'flex', alignItems: 'baseline', gap: '0.75rem' }}>
                                <span style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem', color: '#ccc', fontWeight: 400 }}>08.</span> Cancellations
                            </h3>
                            <div style={{ width: '40px', height: '1px', backgroundColor: '#000', marginBottom: '2rem' }}></div>
                            <ul style={{ paddingLeft: '1.5rem', lineHeight: '2', display: 'flex', flexDirection: 'column', gap: '1rem', color: '#555', fontSize: '1.125rem' }}>
                                <li style={{ position: 'relative', paddingLeft: '1.5rem' }}><span style={{ position: 'absolute', left: 0, color: '#aaa' }}>—</span> Orders can only be cancelled before dispatch.</li>
                                <li style={{ position: 'relative', paddingLeft: '1.5rem' }}><span style={{ position: 'absolute', left: 0, color: '#aaa' }}>—</span> Once an order has been shipped, it cannot be cancelled.</li>
                            </ul>
                        </section>

                        <div style={{ height: '1px', width: '100%', backgroundColor: '#eee' }}></div>

                        <section style={{ paddingLeft: '2rem', borderLeft: '2px solid #ddd' }}>
                            <h3 style={{ fontSize: '1.75rem', marginBottom: '1.5rem', fontWeight: 600, letterSpacing: '-0.02em', display: 'flex', alignItems: 'baseline', gap: '0.75rem' }}>
                                <span style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem', color: '#ccc', fontWeight: 400 }}>09.</span> Limitation of Liability
                            </h3>
                            <div style={{ width: '40px', height: '1px', backgroundColor: '#000', marginBottom: '2rem' }}></div>
                            <p style={{ lineHeight: '2', marginBottom: '1.5rem', fontSize: '1.125rem', color: '#444' }}>Sayo Shopping shall not be liable for:</p>
                            <ul style={{ paddingLeft: '1.5rem', lineHeight: '2', display: 'flex', flexDirection: 'column', gap: '1rem', color: '#555', fontSize: '1.125rem' }}>
                                <li style={{ position: 'relative', paddingLeft: '1.5rem' }}><span style={{ position: 'absolute', left: 0, color: '#aaa' }}>—</span> Allergic reactions (though stainless steel is generally hypoallergenic)</li>
                                <li style={{ position: 'relative', paddingLeft: '1.5rem' }}><span style={{ position: 'absolute', left: 0, color: '#aaa' }}>—</span> Wear and tear due to normal usage</li>
                                <li style={{ position: 'relative', paddingLeft: '1.5rem' }}><span style={{ position: 'absolute', left: 0, color: '#aaa' }}>—</span> Indirect or consequential losses arising from the use of our products or website</li>
                            </ul>
                        </section>

                        <div style={{ height: '1px', width: '100%', backgroundColor: '#eee' }}></div>

                        <section style={{ paddingLeft: '2rem', borderLeft: '2px solid #ddd' }}>
                            <h3 style={{ fontSize: '1.75rem', marginBottom: '1.5rem', fontWeight: 600, letterSpacing: '-0.02em', display: 'flex', alignItems: 'baseline', gap: '0.75rem' }}>
                                <span style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem', color: '#ccc', fontWeight: 400 }}>10.</span> Intellectual Property
                            </h3>
                            <div style={{ width: '40px', height: '1px', backgroundColor: '#000', marginBottom: '2rem' }}></div>
                            <p style={{ lineHeight: '2', fontSize: '1.125rem', color: '#444' }}>All content on this website, including logos, images, text, and designs, is the property of Sayo Shopping and may not be copied or used without prior written permission.</p>
                        </section>

                        <div style={{ height: '1px', width: '100%', backgroundColor: '#eee' }}></div>

                        <section style={{ paddingLeft: '2rem', borderLeft: '2px solid #ddd' }}>
                            <h3 style={{ fontSize: '1.75rem', marginBottom: '1.5rem', fontWeight: 600, letterSpacing: '-0.02em', display: 'flex', alignItems: 'baseline', gap: '0.75rem' }}>
                                <span style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem', color: '#ccc', fontWeight: 400 }}>11.</span> Privacy
                            </h3>
                            <div style={{ width: '40px', height: '1px', backgroundColor: '#000', marginBottom: '2rem' }}></div>
                            <p style={{ lineHeight: '2', fontSize: '1.125rem', color: '#444' }}>Your use of this website is also governed by our Privacy Policy, which explains how we collect and use personal information.</p>
                        </section>

                        <div style={{ height: '1px', width: '100%', backgroundColor: '#eee' }}></div>

                        <section style={{ paddingLeft: '2rem', borderLeft: '2px solid #ddd' }}>
                            <h3 style={{ fontSize: '1.75rem', marginBottom: '1.5rem', fontWeight: 600, letterSpacing: '-0.02em', display: 'flex', alignItems: 'baseline', gap: '0.75rem' }}>
                                <span style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem', color: '#ccc', fontWeight: 400 }}>12.</span> Changes to Terms
                            </h3>
                            <div style={{ width: '40px', height: '1px', backgroundColor: '#000', marginBottom: '2rem' }}></div>
                            <p style={{ lineHeight: '2', fontSize: '1.125rem', color: '#444' }}>We reserve the right to update or modify these Terms & Conditions at any time. Changes will be effective immediately upon posting on this page.</p>
                        </section>

                        <div style={{ height: '1px', width: '100%', backgroundColor: '#eee' }}></div>

                        <section style={{ paddingLeft: '2rem', borderLeft: '2px solid #ddd' }}>
                            <h3 style={{ fontSize: '1.75rem', marginBottom: '1.5rem', fontWeight: 600, letterSpacing: '-0.02em', display: 'flex', alignItems: 'baseline', gap: '0.75rem' }}>
                                <span style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem', color: '#ccc', fontWeight: 400 }}>13.</span> Governing Law
                            </h3>
                            <div style={{ width: '40px', height: '1px', backgroundColor: '#000', marginBottom: '2rem' }}></div>
                            <p style={{ lineHeight: '2', fontSize: '1.125rem', color: '#444' }}>These Terms & Conditions are governed by the laws of Sri Lanka.</p>
                        </section>

                        <div style={{ height: '1px', width: '100%', backgroundColor: '#eee' }}></div>

                        <section style={{ paddingLeft: '2rem', borderLeft: '2px solid #ddd' }}>
                            <h3 style={{ fontSize: '1.75rem', marginBottom: '1.5rem', fontWeight: 600, letterSpacing: '-0.02em', display: 'flex', alignItems: 'baseline', gap: '0.75rem' }}>
                                <span style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem', color: '#ccc', fontWeight: 400 }}>14.</span> Contact Information
                            </h3>
                            <div style={{ width: '40px', height: '1px', backgroundColor: '#000', marginBottom: '2rem' }}></div>
                            <p style={{ lineHeight: '2', marginBottom: '1.5rem', fontSize: '1.125rem', color: '#444' }}>If you have any questions regarding these Terms & Conditions, please contact us:</p>
                            <ul style={{ paddingLeft: '0', lineHeight: '2.5', display: 'flex', flexDirection: 'column', gap: '0.5rem', listStyleType: 'none', fontSize: '1.125rem', color: '#555' }}>
                                <li><strong style={{ color: '#000' }}>Email:</strong> <a href="mailto:support@sayoshopping.lk" style={{ textDecoration: 'none', borderBottom: '1px solid #ccc', paddingBottom: '2px' }} className="hover:border-black transition-colors">support@sayoshopping.lk</a></li>
                                <li><strong style={{ color: '#000' }}>Website:</strong> <a href="https://www.sayoshopping.lk" style={{ textDecoration: 'none', borderBottom: '1px solid #ccc', paddingBottom: '2px' }} className="hover:border-black transition-colors">www.sayoshopping.lk</a></li>
                            </ul>
                        </section>

                        {/* Final CTA / Note Section */}
                        <div style={{ marginTop: '4rem', padding: '4rem', backgroundColor: '#fcfcfc', borderTop: '1px solid #eaeaea', textAlign: 'center' }}>
                            <p style={{ lineHeight: '2', color: '#666', fontSize: '1.125rem', fontFamily: 'var(--font-serif)', fontStyle: 'italic', maxWidth: '600px', margin: '0 auto' }}>
                                By using this website and placing an order, you agree to these Terms & Conditions.
                            </p>
                        </div>

                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
