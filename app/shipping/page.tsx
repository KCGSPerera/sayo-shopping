import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Package, Truck, Banknote, Clock, MapPin, AlertCircle, HelpCircle } from "lucide-react";

export const metadata = {
    title: "Shipping & Delivery | Sayoshopping",
};

export default function Shipping() {
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
                    src="/assets/shipping/shipping-background.jpg"
                    alt="Shipping and delivery background"
                    fill
                    style={{ objectFit: 'cover', objectPosition: 'center' }}
                    sizes="100vw"
                    priority
                />
                <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.6)' }}></div>
                <div className="container-wide" style={{ position: 'relative', zIndex: 10, maxWidth: '1400px', margin: '0 auto' }}>
                    <h1 style={{ color: 'white', fontSize: 'clamp(3.75rem, 6vw, 4.5rem)', marginBottom: '1rem', letterSpacing: '0.02em', lineHeight: 1.1 }}>Shipping & Delivery</h1>
                    <p style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', letterSpacing: '0.05em', opacity: 0.9, fontStyle: 'italic' }}>Swift, secure, and stylishly delivered.</p>
                </div>
            </div>

            <main className="container-wide animate-fade-in" style={{ flex: 1, padding: '4rem 2rem 8rem', maxWidth: '1400px', margin: '0 auto', width: '100%' }}>

                {/* Back Link */}
                <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '4rem', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#666', transition: 'color 0.3s ease' }} className="hover:text-black">
                    <ArrowLeft size={16} /> Back to Home
                </Link>

                <div style={{ backgroundColor: 'white', padding: 'clamp(3rem, 5vw, 6rem)', border: '1px solid #eaeaea', boxShadow: '0 4px 40px rgba(0,0,0,0.02)' }}>

                    <p style={{ fontSize: '1.25rem', lineHeight: '2', marginBottom: '4rem', color: '#555', maxWidth: '900px' }}>
                        At Sayo Shopping, we aim to deliver your jewellery safely, quickly, and conveniently across Sri Lanka.
                    </p>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}>

                        <section style={{ paddingLeft: '2rem', borderLeft: '2px solid #ddd', display: 'flex', flexDirection: 'column' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                                <MapPin size={28} strokeWidth={1.5} color="#111" />
                                <h3 style={{ fontSize: '1.75rem', fontWeight: 600, letterSpacing: '-0.02em', margin: 0 }}>Delivery Coverage</h3>
                            </div>
                            <div style={{ width: '40px', height: '1px', backgroundColor: '#000', marginBottom: '2rem' }}></div>
                            <p style={{ color: '#444', lineHeight: 2, fontSize: '1.125rem' }}>We provide island-wide delivery across Sri Lanka through trusted courier partners.</p>
                        </section>

                        <div style={{ height: '1px', width: '100%', backgroundColor: '#eee' }}></div>

                        {/* Free Delivery Highlight formatted as a luxury section */}
                        <section style={{ paddingLeft: '2rem', borderLeft: '2px solid #ddd' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                                <Package size={28} strokeWidth={1.5} color="#111" />
                                <h3 style={{ fontSize: '1.75rem', fontWeight: 600, letterSpacing: '-0.02em', margin: 0 }}>Free Delivery (Limited-Time Offer)</h3>
                            </div>
                            <div style={{ width: '40px', height: '1px', backgroundColor: '#000', marginBottom: '2rem' }}></div>

                            <p style={{ fontSize: '1.125rem', color: '#444', lineHeight: 2, marginBottom: '1.5rem' }}>We are currently offering FREE delivery across Sri Lanka for all orders.</p>

                            <p style={{ fontWeight: 600, marginBottom: '1rem', fontSize: '1.125rem', color: '#111' }}>Please note:</p>
                            <ul style={{ paddingLeft: '1.5rem', lineHeight: '2', display: 'flex', flexDirection: 'column', gap: '1rem', color: '#555', fontSize: '1.125rem' }}>
                                <li style={{ position: 'relative', paddingLeft: '1.5rem' }}><span style={{ position: 'absolute', left: 0, color: '#aaa' }}>—</span> Free delivery is a promotional offer</li>
                                <li style={{ position: 'relative', paddingLeft: '1.5rem' }}><span style={{ position: 'absolute', left: 0, color: '#aaa' }}>—</span> This offer may be modified or withdrawn in the future without prior notice</li>
                                <li style={{ position: 'relative', paddingLeft: '1.5rem' }}><span style={{ position: 'absolute', left: 0, color: '#aaa' }}>—</span> Any applicable delivery charges (if introduced later) will be clearly shown at checkout</li>
                            </ul>
                        </section>

                        <div style={{ height: '1px', width: '100%', backgroundColor: '#eee' }}></div>

                        <section style={{ paddingLeft: '2rem', borderLeft: '2px solid #ddd' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                                <Clock size={28} strokeWidth={1.5} color="#111" />
                                <h3 style={{ fontSize: '1.75rem', fontWeight: 600, letterSpacing: '-0.02em', margin: 0 }}>Delivery Time</h3>
                            </div>
                            <div style={{ width: '40px', height: '1px', backgroundColor: '#000', marginBottom: '2rem' }}></div>

                            <p style={{ color: '#444', lineHeight: 2, fontSize: '1.125rem', marginBottom: '1.5rem' }}>Estimated delivery times:</p>
                            <ul style={{ paddingLeft: '1.5rem', lineHeight: '2', display: 'flex', flexDirection: 'column', gap: '1rem', color: '#555', fontSize: '1.125rem', marginBottom: '1.5rem' }}>
                                <li style={{ position: 'relative', paddingLeft: '1.5rem' }}><span style={{ position: 'absolute', left: 0, color: '#aaa' }}>—</span> 2–4 working days – Main cities</li>
                                <li style={{ position: 'relative', paddingLeft: '1.5rem' }}><span style={{ position: 'absolute', left: 0, color: '#aaa' }}>—</span> 3–5 working days – Other areas</li>
                            </ul>
                            <p style={{ color: '#444', lineHeight: 2, fontSize: '1.125rem' }}>Delivery times may vary during promotions, holidays, or due to unforeseen circumstances.</p>
                        </section>

                        <div style={{ height: '1px', width: '100%', backgroundColor: '#eee' }}></div>

                        <section style={{ paddingLeft: '2rem', borderLeft: '2px solid #ddd' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                                <Truck size={28} strokeWidth={1.5} color="#111" />
                                <h3 style={{ fontSize: '1.75rem', fontWeight: 600, letterSpacing: '-0.02em', margin: 0 }}>Order Dispatch</h3>
                            </div>
                            <div style={{ width: '40px', height: '1px', backgroundColor: '#000', marginBottom: '2rem' }}></div>

                            <ul style={{ paddingLeft: '1.5rem', lineHeight: '2', display: 'flex', flexDirection: 'column', gap: '1rem', color: '#555', fontSize: '1.125rem' }}>
                                <li style={{ position: 'relative', paddingLeft: '1.5rem' }}><span style={{ position: 'absolute', left: 0, color: '#aaa' }}>—</span> Orders are usually dispatched within 1–2 working days after order confirmation.</li>
                                <li style={{ position: 'relative', paddingLeft: '1.5rem' }}><span style={{ position: 'absolute', left: 0, color: '#aaa' }}>—</span> Customers will be notified once the order is dispatched.</li>
                            </ul>
                        </section>

                        <div style={{ height: '1px', width: '100%', backgroundColor: '#eee' }}></div>

                        <section style={{ paddingLeft: '2rem', borderLeft: '2px solid #ddd' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                                <Banknote size={28} strokeWidth={1.5} color="#111" />
                                <h3 style={{ fontSize: '1.75rem', fontWeight: 600, letterSpacing: '-0.02em', margin: 0 }}>Cash on Delivery (COD)</h3>
                            </div>
                            <div style={{ width: '40px', height: '1px', backgroundColor: '#000', marginBottom: '2rem' }}></div>

                            <ul style={{ paddingLeft: '1.5rem', lineHeight: '2', display: 'flex', flexDirection: 'column', gap: '1rem', color: '#555', fontSize: '1.125rem' }}>
                                <li style={{ position: 'relative', paddingLeft: '1.5rem' }}><span style={{ position: 'absolute', left: 0, color: '#aaa' }}>—</span> Cash on Delivery (COD) is available for eligible orders.</li>
                                <li style={{ position: 'relative', paddingLeft: '1.5rem' }}><span style={{ position: 'absolute', left: 0, color: '#aaa' }}>—</span> COD availability may vary based on location or order value.</li>
                            </ul>
                        </section>

                        <div style={{ height: '1px', width: '100%', backgroundColor: '#eee' }}></div>

                        <section style={{ paddingLeft: '2rem', borderLeft: '2px solid #ddd' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                                <AlertCircle size={28} strokeWidth={1.5} color="#111" />
                                <h3 style={{ fontSize: '1.75rem', fontWeight: 600, letterSpacing: '-0.02em', margin: 0 }}>Delivery Issues & Delays</h3>
                            </div>
                            <div style={{ width: '40px', height: '1px', backgroundColor: '#000', marginBottom: '2rem' }}></div>

                            <h4 style={{ fontSize: '1.25rem', marginTop: '1.5rem', marginBottom: '1rem', fontWeight: 500, color: '#222' }}>Delivery Delays</h4>
                            <p style={{ color: '#444', lineHeight: 2, fontSize: '1.125rem', marginBottom: '1rem' }}>Delivery delays may occur due to:</p>
                            <ul style={{ paddingLeft: '1.5rem', lineHeight: '2', display: 'flex', flexDirection: 'column', gap: '0.5rem', listStyleType: 'disc', color: '#555', marginBottom: '1.5rem' }}>
                                <li>Weather conditions</li>
                                <li>Courier service disruptions</li>
                                <li>Public holidays</li>
                            </ul>
                            <p style={{ color: '#444', lineHeight: 2, fontSize: '1.125rem', marginBottom: '2.5rem' }}>We will inform you if there are any unexpected delays.</p>

                            <h4 style={{ fontSize: '1.25rem', marginBottom: '1rem', fontWeight: 500, color: '#222' }}>Incorrect or Incomplete Address</h4>
                            <ul style={{ paddingLeft: '1.5rem', lineHeight: '2', display: 'flex', flexDirection: 'column', gap: '1rem', color: '#555', fontSize: '1.125rem', marginBottom: '2.5rem' }}>
                                <li style={{ position: 'relative', paddingLeft: '1.5rem' }}><span style={{ position: 'absolute', left: 0, color: '#aaa' }}>—</span> Please ensure all delivery details are accurate when placing your order.</li>
                                <li style={{ position: 'relative', paddingLeft: '1.5rem' }}><span style={{ position: 'absolute', left: 0, color: '#aaa' }}>—</span> Delays or non-delivery caused by incorrect information are not the responsibility of Sayo Shopping.</li>
                                <li style={{ position: 'relative', paddingLeft: '1.5rem' }}><span style={{ position: 'absolute', left: 0, color: '#aaa' }}>—</span> Re-delivery charges may apply if an order needs to be resent.</li>
                            </ul>

                            <h4 style={{ fontSize: '1.25rem', marginBottom: '1rem', fontWeight: 500, color: '#222' }}>Undelivered or Returned Parcels</h4>
                            <p style={{ color: '#444', lineHeight: 2, fontSize: '1.125rem', marginBottom: '1rem' }}>If a parcel is returned due to:</p>
                            <ul style={{ paddingLeft: '1.5rem', lineHeight: '2', display: 'flex', flexDirection: 'column', gap: '0.5rem', listStyleType: 'disc', color: '#555', marginBottom: '1.5rem' }}>
                                <li>Customer unavailability</li>
                                <li>Incorrect address</li>
                                <li>Rejected delivery</li>
                            </ul>
                            <p style={{ color: '#444', lineHeight: 2, fontSize: '1.125rem' }}>Additional delivery charges may apply for re-dispatch.</p>
                        </section>

                        <div style={{ height: '1px', width: '100%', backgroundColor: '#eee' }}></div>

                        <section style={{ paddingLeft: '2rem', borderLeft: '2px solid #ddd' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                                <HelpCircle size={28} strokeWidth={1.5} color="#111" />
                                <h3 style={{ fontSize: '1.75rem', fontWeight: 600, letterSpacing: '-0.02em', margin: 0 }}>Need Help with Delivery?</h3>
                            </div>
                            <div style={{ width: '40px', height: '1px', backgroundColor: '#000', marginBottom: '2rem' }}></div>

                            <p style={{ color: '#444', lineHeight: 2, fontSize: '1.125rem', marginBottom: '1.5rem' }}>If you have any questions regarding shipping or delivery, please contact us:</p>
                            <ul style={{ paddingLeft: '0', lineHeight: '2.5', display: 'flex', flexDirection: 'column', gap: '0.5rem', listStyleType: 'none', color: '#555', fontSize: '1.125rem' }}>
                                <li><strong style={{ color: '#111' }}>Email:</strong> <a href="mailto:support@sayoshopping.lk" style={{ textDecoration: 'none', borderBottom: '1px solid #ccc', paddingBottom: '2px' }} className="hover:border-black transition-colors">support@sayoshopping.lk</a></li>
                                <li><strong style={{ color: '#111' }}>WhatsApp:</strong> Available on our website</li>
                                <li><strong style={{ color: '#111' }}>Phone:</strong> +94 71 580 4185</li>
                            </ul>
                        </section>

                        <div style={{ marginTop: '2rem', padding: '4rem', backgroundColor: '#fcfcfc', borderTop: '1px solid #eaeaea', textAlign: 'center' }}>
                            <h4 style={{ fontSize: '1.25rem', marginBottom: '1rem', fontWeight: 600 }}>Final Note</h4>
                            <p style={{ lineHeight: '2', color: '#666', fontSize: '1.125rem', fontFamily: 'var(--font-serif)', fontStyle: 'italic', maxWidth: '600px', margin: '0 auto' }}>
                                By placing an order on Sayo Shopping, you agree to the terms outlined in this Shipping & Delivery Policy.
                            </p>
                        </div>

                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
